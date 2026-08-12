from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Avg, F, ExpressionWrapper, IntegerField, Q
from django.db.models.functions import TruncDate, TruncMonth
from sales.models import Sale, SaleItem
from debts.models import Debt, Payment
from customer_management.models import CustomerShop
from products.models import Product
from django.core.cache import cache
from config.cache import (
    report_summary_key, report_charts_key,
    report_customers_key, report_products_key,
    REPORT_TIMEOUT
)


def get_date_range(request):
    from_date = request.query_params.get('from_date')
    to_date = request.query_params.get('to_date')
    if not from_date:
        from_date = (timezone.now() - timedelta(days=30)).date()
    if not to_date:
        to_date = timezone.now().date()
    return from_date, to_date

class ReportSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        from_date, to_date = get_date_range(request)
        thirty_days_ago = timezone.now() - timedelta(days=30)

        key = report_summary_key(request.user.id, from_date, to_date)
        cached = cache.get(key)
        if cached:
            return Response(cached)

        sales = Sale.objects.filter(
            shop=request.user,
            created_at__date__gte=from_date,
            created_at__date__lte=to_date
        )

        sale_summary = sales.annotate(
            sale_total=Sum(
                ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField())
            )
        ).aggregate(
            total_cash=Sum('sale_total', filter=Q(is_debt=False)),
            total_debt=Sum('sale_total', filter=Q(is_debt=True)),
            total_invoices=Count('id', distinct=True)
        )

        total_cash = sale_summary['total_cash'] or 0
        total_debt_sales = sale_summary['total_debt'] or 0
        total_invoices = sale_summary['total_invoices'] or 0
        total = total_cash + total_debt_sales
        avg_per_invoice = int(total / total_invoices) if total_invoices > 0 else 0

        all_debts = Debt.objects.filter(shop=request.user)
        total_paid = Payment.objects.filter(
            debt__shop=request.user
        ).aggregate(total=Sum('amount'))['total'] or 0

        total_debt_amount = all_debts.aggregate(total=Sum('amount'))['total'] or 0
        remaining = total_debt_amount - total_paid
        collection_rate = int((total_paid / total_debt_amount * 100)) if total_debt_amount > 0 else 0

        open_debts = all_debts.annotate(
            paid=Sum('payments__amount')
        ).filter(
            Q(paid__isnull=True) | Q(paid__lt=F('amount'))
        ).count()

        urgent_debts = all_debts.filter(
            created_at__lt=thirty_days_ago
        ).annotate(
            paid=Sum('payments__amount')
        ).filter(
            Q(paid__isnull=True) | Q(paid__lt=F('amount'))
        ).count()

        
        total_customers = CustomerShop.objects.filter(shop=request.user).count()
        new_customers = CustomerShop.objects.filter(
            shop=request.user,
            created_at__date__gte=from_date,
            created_at__date__lte=to_date
        ).count()

        result = {
            'ok': True,
            'summary': {
                'total_sales': total,
                'total_debt_registered': total_debt_sales,
                'total_collected': total_paid,
                'remaining_debt': remaining,
                'collection_rate': collection_rate,
                'total_customers': total_customers,
                'new_customers': new_customers,
                'total_invoices': total_invoices,
                'open_debts': open_debts,
                'urgent_debts': urgent_debts,
                'avg_per_invoice': avg_per_invoice
            }
        }

        cache.set(key, result, timeout=REPORT_TIMEOUT)
        return Response(result)

        # return Response({
        #     'ok': True,
        #     'summary': {
        #         'total_sales': total,
        #         'total_debt_registered': total_debt_sales,
        #         'total_collected': total_paid,
        #         'remaining_debt': remaining,
        #         'collection_rate': collection_rate,
        #         'total_customers': total_customers,
        #         'new_customers': new_customers,
        #         'total_invoices': total_invoices,
        #         'open_debts': open_debts,
        #         'urgent_debts': urgent_debts,
        #         'avg_per_invoice': avg_per_invoice
        #     }
        # })


class ReportChartsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        from_date, to_date = get_date_range(request)
        six_months_ago = timezone.now() - timedelta(days=180)

        key = report_charts_key(request.user.id, from_date, to_date)
        cached = cache.get(key)
        if cached:
            return Response(cached)

        sales_items_trend = SaleItem.objects.filter(
            sale__shop=request.user,
            sale__created_at__date__gte=from_date,
            sale__created_at__date__lte=to_date
        ).annotate(
            date=TruncDate('sale__created_at')
        ).values('date', 'sale__is_debt').annotate(
            total=Sum(
                ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField())
            )
        ).order_by('date')

        trend_by_date = {}
        for t in sales_items_trend:
            date = str(t['date'])
            if date not in trend_by_date:
                trend_by_date[date] = {'date': date, 'cash': 0, 'debt': 0, 'total': 0}
            amount = t['total'] or 0
            if t['sale__is_debt']:
                trend_by_date[date]['debt'] += amount
            else:
                trend_by_date[date]['cash'] += amount
            trend_by_date[date]['total'] += amount

        sales_trend_data = sorted(trend_by_date.values(), key=lambda x: x['date'])

        payments_trend = Payment.objects.filter(
            debt__shop=request.user,
            created_at__date__gte=from_date,
            created_at__date__lte=to_date
        ).annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            total=Sum('amount'),
            count=Count('id')
        ).order_by('date')

        debts_trend = Debt.objects.filter(
            shop=request.user,
            created_at__date__gte=from_date,
            created_at__date__lte=to_date
        ).annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            total=Sum('amount'),
            count=Count('id')
        ).order_by('date')

        sales_by_date = {t['date']: t['total'] for t in sales_trend_data}
        payments_by_date = {str(t['date']): t['total'] or 0 for t in payments_trend}
        all_dates = sorted(set(list(sales_by_date.keys()) + list(payments_by_date.keys())))
        composed_trend = [
            {
                'date': d,
                'sales': sales_by_date.get(d, 0),
                'payments': payments_by_date.get(d, 0)
            }
            for d in all_dates
        ]

        pie_data = {'cash': 0, 'debt': 0}
        for t in sales_trend_data:
            pie_data['cash'] += t['cash']
            pie_data['debt'] += t['debt']

        monthly_items = SaleItem.objects.filter(
            sale__shop=request.user,
            sale__created_at__gte=six_months_ago
        ).annotate(
            month=TruncMonth('sale__created_at')
        ).values('month').annotate(
            total=Sum(
                ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField())
            )
        ).order_by('month')

        result = {
            'ok': True,
            'charts': {
                'sales_trend': sales_trend_data,
                'payments_trend': [
                    {
                        'date': str(t['date']),
                        'total': t['total'] or 0,
                        'count': t['count'] or 0
                    }
                    for t in payments_trend
                ],
                'debts_trend': [
                    {
                        'date': str(t['date']),
                        'total': t['total'] or 0,
                        'count': t['count'] or 0
                    }
                    for t in debts_trend
                ],
                'composed_trend': composed_trend,
                'payment_distribution': pie_data,
                'monthly_revenue': [
                    {
                        'month': str(t['month'])[:7],
                        'total': t['total'] or 0
                    }
                    for t in monthly_items
                ]
            }
        }

        cache.set(key, result, timeout=REPORT_TIMEOUT)
        return Response(result)

        # return Response({
        #     'ok': True,
        #     'charts': {
        #         'sales_trend': sales_trend_data,
        #         'payments_trend': [
        #             {
        #                 'date': str(t['date']),
        #                 'total': t['total'] or 0,
        #                 'count': t['count'] or 0
        #             }
        #             for t in payments_trend
        #         ],
        #         'debts_trend': [
        #             {
        #                 'date': str(t['date']),
        #                 'total': t['total'] or 0,
        #                 'count': t['count'] or 0
        #             }
        #             for t in debts_trend
        #         ],
        #         'composed_trend': composed_trend,
        #         'payment_distribution': pie_data,
        #         'monthly_revenue': [
        #             {
        #                 'month': str(t['month'])[:7],
        #                 'total': t['total'] or 0
        #             }
        #             for t in monthly_items
        #         ]
        #     }
        # })


class ReportCustomersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        from_date, to_date = get_date_range(request)
        thirty_days_ago = timezone.now() - timedelta(days=30)

        key = report_customers_key(request.user.id, from_date, to_date)
        cached = cache.get(key)
        if cached:
            return Response(cached)

        top_customers = Sale.objects.filter(
            shop=request.user,
            created_at__date__gte=from_date,
            created_at__date__lte=to_date,
            customer__isnull=False
        ).values(
            'customer__full_name',
            'customer__phone_number'
        ).annotate(
            total=Sum(
                ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField())
            ),
            total_paid=Sum(
                ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()),
                filter=Q(is_debt=False)
            ),
            remaining=Sum(
                ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()),
                filter=Q(is_debt=True)
            )
        ).order_by('-total')[:10]

        top_debtors = CustomerShop.objects.filter(
            shop=request.user
        ).select_related('customer').annotate(
            total_debt=Sum('debts__amount'),
            total_paid=Sum('debts__payments__amount')
        ).filter(
            total_debt__isnull=False
        ).order_by('-total_debt')[:10]

        overdue_debtors = Debt.objects.filter(
            shop=request.user,
            created_at__lt=thirty_days_ago
        ).select_related('customer__customer').annotate(
            paid=Sum('payments__amount')
        ).filter(
            Q(paid__isnull=True) | Q(paid__lt=F('amount'))
        ).order_by('created_at')[:10]

        result = {
            'ok': True,
            'top_customers': [
                {
                    'customer_name': c['customer__full_name'],
                    'phone_number': c['customer__phone_number'],
                    'total': c['total'] or 0,
                    'total_paid': c['total_paid'] or 0,
                    'remaining': c['remaining'] or 0
                }
                for c in top_customers
            ],
            'top_debtors': [
                {
                    'customer_name': cs.customer.full_name,
                    'phone_number': cs.customer.phone_number,
                    'total_debt': cs.total_debt or 0,
                    'total_paid': cs.total_paid or 0,
                    'remaining': (cs.total_debt or 0) - (cs.total_paid or 0)
                }
                for cs in top_debtors
            ],
            'overdue_debtors': [
                {
                    'debt_id': d.debt_id,
                    'customer_name': d.customer.customer.full_name,
                    'phone_number': d.customer.customer.phone_number,
                    'amount': d.amount,
                    'remaining': d.amount - (d.paid or 0),
                    'created_at': d.created_at
                }
                for d in overdue_debtors
            ]
        }

        cache.set(key, result, timeout=REPORT_TIMEOUT)
        return Response(result)

        # return Response({
        #     'ok': True,
        #     'top_customers': [
        #         {
        #             'customer_name': c['customer__full_name'],
        #             'phone_number': c['customer__phone_number'],
        #             'total': c['total'] or 0,
        #             'total_paid': c['total_paid'] or 0,
        #             'remaining': c['remaining'] or 0
        #         }
        #         for c in top_customers
        #     ],
        #     'top_debtors': [
        #         {
        #             'customer_name': cs.customer.full_name,
        #             'phone_number': cs.customer.phone_number,
        #             'total_debt': cs.total_debt or 0,
        #             'total_paid': cs.total_paid or 0,
        #             'remaining': (cs.total_debt or 0) - (cs.total_paid or 0)
        #         }
        #         for cs in top_debtors
        #     ],
        #     'overdue_debtors': [
        #         {
        #             'debt_id': d.debt_id,
        #             'customer_name': d.customer.customer.full_name,
        #             'phone_number': d.customer.customer.phone_number,
        #             'amount': d.amount,
        #             'remaining': d.amount - (d.paid or 0),
        #             'created_at': d.created_at
        #         }
        #         for d in overdue_debtors
        #     ]
        # })

class ReportProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        from_date, to_date = get_date_range(request)

        key = report_products_key(request.user.id, from_date, to_date)
        cached = cache.get(key)
        if cached:
            return Response(cached)

        top_selling = SaleItem.objects.filter(
            sale__shop=request.user,
            sale__created_at__date__gte=from_date,
            sale__created_at__date__lte=to_date
        ).values('product__name').annotate(
            total_qty=Sum('quantity'),
            total_amount=Sum(
                ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField())
            )
        ).order_by('-total_qty')[:10]

        sold_names = SaleItem.objects.filter(
            sale__shop=request.user,
            sale__created_at__date__gte=from_date,
            sale__created_at__date__lte=to_date
        ).values_list('product__name', flat=True).distinct()

        no_sales = Product.objects.filter(
            shop=request.user
        ).exclude(name__in=sold_names).values(
            'id', 'name', 'stock', 'sell_price'
        ).order_by('stock')[:10]

        result = {
            'ok': True,
            'top_selling': list(top_selling),
            'no_sales_products': list(no_sales)
        }

        cache.set(key, result, timeout=REPORT_TIMEOUT)
        return Response(result)

        # return Response({
        #     'ok': True,
        #     'top_selling': list(top_selling),
        #     'no_sales_products': list(no_sales)
        # })