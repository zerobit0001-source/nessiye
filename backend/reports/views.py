from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Avg, F, ExpressionWrapper, IntegerField, Q, OuterRef, Subquery
from django.db.models.functions import TruncDate, TruncMonth
from sales.models import Sale, SaleItem
from debts.models import Debt, Payment
from customer_management.models import CustomerShop
from products.models import Product
from datetime import datetime, time, timedelta
from django.db.models.functions import Coalesce, TruncDate, TruncMonth
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
            return Response(
                {
                    'ok': False,
                    'error': 'دسترسی ندارید'
                },
                status=status.HTTP_403_FORBIDDEN
            )

        from_date, to_date = get_date_range(request)

        if from_date > to_date:
            return Response(
                {
                    'ok': False,
                    'error': 'بازه تاریخ نامعتبر است'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cache_key = report_charts_key(
            request.user.id,
            from_date,
            to_date
        )

        cached = cache.get(cache_key)

        if cached is not None:
            return Response(cached)

        date_range = []

        current_date = from_date

        while current_date <= to_date:
            date_range.append(current_date.isoformat())
            current_date += timedelta(days=1)

        start_datetime = timezone.make_aware(
            datetime.combine(from_date, time.min)
        )

        end_datetime = timezone.make_aware(
            datetime.combine(
                to_date + timedelta(days=1),
                time.min
            )
        )


        sales_items_trend = (
            SaleItem.objects
            .filter(
                sale__shop=request.user,
                sale__created_at__gte=start_datetime,
                sale__created_at__lt=end_datetime,
            )
            .annotate(
                date=TruncDate('sale__created_at')
            )
            .values(
                'date',
                'sale__is_debt'
            )
            .annotate(
                total=Coalesce(
                    Sum(
                        ExpressionWrapper(
                            F('price') * F('quantity'),
                            output_field=IntegerField()
                        )
                    ),
                    0
                )
            )
            .order_by('date')
        )

        trend_by_date = {}

        for item in sales_items_trend:
            date = str(item['date'])

            if date not in trend_by_date:
                trend_by_date[date] = {
                    'date': date,
                    'cash': 0,
                    'debt': 0,
                    'total': 0,
                }

            amount = item['total'] or 0

            if item['sale__is_debt']:
                trend_by_date[date]['debt'] += amount
            else:
                trend_by_date[date]['cash'] += amount

            trend_by_date[date]['total'] += amount

        # Fill missing days with zero
        sales_trend_data = [
            trend_by_date.get(
                date,
                {
                    'date': date,
                    'cash': 0,
                    'debt': 0,
                    'total': 0,
                }
            )
            for date in date_range
        ]


        payments_trend = (
            Payment.objects
            .filter(
                debt__shop=request.user,
                created_at__gte=start_datetime,
                created_at__lt=end_datetime,
            )
            .annotate(
                date=TruncDate('created_at')
            )
            .values('date')
            .annotate(
                total=Coalesce(
                    Sum('amount'),
                    0
                ),
                count=Count('id')
            )
            .order_by('date')
        )

        payments_by_date = {
            str(item['date']): {
                'total': item['total'] or 0,
                'count': item['count'] or 0,
            }
            for item in payments_trend
        }

        payments_trend_data = [
            {
                'date': date,
                'total': payments_by_date.get(
                    date,
                    {}
                ).get('total', 0),
                'count': payments_by_date.get(
                    date,
                    {}
                ).get('count', 0),
            }
            for date in date_range
        ]

        debts_trend = (
            Debt.objects
            .filter(
                shop=request.user,
                created_at__gte=start_datetime,
                created_at__lt=end_datetime,
            )
            .annotate(
                date=TruncDate('created_at')
            )
            .values('date')
            .annotate(
                total=Coalesce(
                    Sum('amount'),
                    0
                ),
                count=Count('id')
            )
            .order_by('date')
        )

        debts_by_date = {
            str(item['date']): {
                'total': item['total'] or 0,
                'count': item['count'] or 0,
            }
            for item in debts_trend
        }

        debts_trend_data = [
            {
                'date': date,
                'total': debts_by_date.get(
                    date,
                    {}
                ).get('total', 0),
                'count': debts_by_date.get(
                    date,
                    {}
                ).get('count', 0),
            }
            for date in date_range
        ]

        sales_by_date = {
            item['date']: item['total']
            for item in sales_trend_data
        }

        payments_total_by_date = {
            item['date']: item['total']
            for item in payments_trend_data
        }

        composed_trend = [
            {
                'date': date,
                'sales': sales_by_date.get(date, 0),
                'payments': payments_total_by_date.get(date, 0),
            }
            for date in date_range
        ]

        payment_distribution = {
            'cash': 0,
            'debt': 0,
        }

        for item in sales_trend_data:
            payment_distribution['cash'] += item['cash']
            payment_distribution['debt'] += item['debt']

        six_months_ago = (
            timezone.now() - timedelta(days=180)
        )

        monthly_items = (
            SaleItem.objects
            .filter(
                sale__shop=request.user,
                sale__created_at__gte=six_months_ago,
            )
            .annotate(
                month=TruncMonth('sale__created_at')
            )
            .values('month')
            .annotate(
                total=Coalesce(
                    Sum(
                        ExpressionWrapper(
                            F('price') * F('quantity'),
                            output_field=IntegerField()
                        )
                    ),
                    0
                )
            )
            .order_by('month')
        )

        monthly_by_date = {
            str(item['month'])[:7]: item['total'] or 0
            for item in monthly_items
        }

        now = timezone.now()

        first_month = (
            now.replace(
                day=1,
                hour=0,
                minute=0,
                second=0,
                microsecond=0
            )
            - timedelta(days=180)
        ).replace(day=1)

        months = []

        current_month = first_month

        for _ in range(6):
            month_key = current_month.strftime('%Y-%m')

            months.append(
                {
                    'month': month_key,
                    'total': monthly_by_date.get(
                        month_key,
                        0
                    )
                }
            )

            if current_month.month == 12:
                current_month = current_month.replace(
                    year=current_month.year + 1,
                    month=1
                )
            else:
                current_month = current_month.replace(
                    month=current_month.month + 1
                )


        result = {
            'ok': True,
            'charts': {
                'sales_trend': sales_trend_data,
                'payments_trend': payments_trend_data,
                'debts_trend': debts_trend_data,
                'composed_trend': composed_trend,
                'payment_distribution': payment_distribution,
                'monthly_revenue': months,
            }
        }

        cache.set(
            cache_key,
            result,
            timeout=REPORT_TIMEOUT
        )

        return Response(result)


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

        debt_total_subquery = (
            Debt.objects.filter(
                customer = OuterRef('pk'),
                shop = request.user
            ).values('customer').annotate(
                total=Sum('amount')
            ).values('total')
        )
        
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