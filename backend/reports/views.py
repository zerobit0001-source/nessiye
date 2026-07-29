from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from sales.models import Sale, SaleItem
from django.db.models import Sum, Count, Avg, F, ExpressionWrapper, IntegerField


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