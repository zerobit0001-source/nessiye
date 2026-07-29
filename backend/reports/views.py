from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from sales.models import Sale, SaleItem
from django.db.models import Sum, Count, Avg, F, ExpressionWrapper, IntegerField
from debts.models import Debt, CustomerShop
from debts.models import Payment


def get_period_filter(period):
    now = timezone.now()
    if period == 'week':
        return now - timedelta(days=7)
    elif period == 'month':
        return now - timedelta(days=30)
    elif period == 'three_months':
        return now - timedelta(days=90)
    elif period == 'year':
        return now - timedelta(days=365)
    return now - timedelta(days=30)

class SalesReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        period = request.query_params.get('period', 'month')
        from_date = get_period_filter(period)

        sales = Sale.objects.filter(shop=request.user, created_at__gte=from_date)

        cash_sales = sales.filter(is_debt=False).annotate(
            sale_total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
        )
        debt_sales = sales.filter(is_debt=True).annotate(
            sale_total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
        )

        total_cash = cash_sales.aggregate(total=Sum('sale_total'))['total'] or 0
        total_debt = debt_sales.aggregate(total=Sum('sale_total'))['total'] or 0
        total_invoices = sales.count()
        total_items_sold = SaleItem.objects.filter(sale__shop=request.user, sale__created_at__gte=from_date).aggregate(total=Sum('quantity'))['total'] or 0

        # top customers
        top_customers = Sale.objects.filter(
            shop=request.user, created_at__gte=from_date, customer__isnull=False
        ).values('customer__full_name', 'customer__phone_number').annotate(
            total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
        ).order_by('-total')[:5]

        # top products
        top_products = SaleItem.objects.filter(
            sale__shop=request.user, sale__created_at__gte=from_date
        ).values('product_name').annotate(
            total_qty=Sum('quantity'),
            total_amount=Sum(ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()))
        ).order_by('-total_amount')[:5]

        return Response({
            'ok': True,
            'period': period,
            'summary': {
                'total_cash': total_cash,
                'total_debt': total_debt,
                'total': total_cash + total_debt,
                'total_invoices': total_invoices,
                'total_items_sold': total_items_sold
            },
            'top_customers': list(top_customers),
            'top_products': list(top_products)
        })


class DebtsReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        period = request.query_params.get('period', 'month')
        from_date = get_period_filter(period)

        debts = Debt.objects.filter(shop=request.user, created_at__gte=from_date).prefetch_related('payments')

        total_debt = sum(d.amount for d in debts)
        settled = [d for d in debts if d.is_paid]
        overdue = [d for d in debts if not d.is_paid and d.created_at < timezone.now() - timedelta(days=30)]

        # top debtors
        top_debtors = CustomerShop.objects.filter(
            shop=request.user
        ).select_related('customer').annotate(
            total_debt=Sum('debts__amount'),
            total_paid=Sum('debts__payments__amount')
        ).order_by('-total_debt')[:5]

        # overdue debts
        overdue_list = [
            {
                'debt_id': d.debt_id,
                'customer_name': d.customer.customer.full_name,
                'amount': d.amount,
                'remaining': d.remaining,
                'created_at': d.created_at
            }
            for d in overdue[:5]
        ]

        return Response({
            'ok': True,
            'period': period,
            'summary': {
                'total_debt': total_debt,
                'total_debtors': len(debts),
                'settled_count': len(settled),
                'overdue_count': len(overdue)
            },
            'top_debtors': [
                {
                    'customer_name': cs.customer.full_name,
                    'phone_number': cs.customer.phone_number,
                    'total_debt': cs.total_debt or 0,
                    'remaining': (cs.total_debt or 0) - (cs.total_paid or 0)
                }
                for cs in top_debtors
            ],
            'overdue_debts': overdue_list
        })


class PaymentsReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        period = request.query_params.get('period', 'month')
        from_date = get_period_filter(period)

        payments = Payment.objects.filter(debt__shop=request.user, created_at__gte=from_date)

        total_paid = payments.aggregate(total=Sum('amount'))['total'] or 0
        total_count = payments.count()
        today_total = payments.filter(created_at__date=timezone.now().date()).aggregate(total=Sum('amount'))['total'] or 0

        # largest payments
        largest = payments.select_related('debt__customer__customer').order_by('-amount')[:5]

        # recent payments
        recent = payments.select_related('debt__customer__customer').order_by('-created_at')[:5]

        return Response({
            'ok': True,
            'period': period,
            'summary': {
                'total_paid': total_paid,
                'total_count': total_count,
                'today_total': today_total
            },
            'largest_payments': [
                {
                    'payment_id': p.payment_id,
                    'customer_name': p.debt.customer.customer.full_name,
                    'amount': p.amount,
                    'created_at': p.created_at
                }
                for p in largest
            ],
            'recent_payments': [
                {
                    'payment_id': p.payment_id,
                    'customer_name': p.debt.customer.customer.full_name,
                    'amount': p.amount,
                    'created_at': p.created_at
                }
                for p in recent
            ]
        })



