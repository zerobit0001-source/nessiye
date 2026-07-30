# from django.utils import timezone
# from datetime import timedelta
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status
# from sales.models import Sale, SaleItem
# from django.db.models import Sum, Count, Avg, F, ExpressionWrapper, IntegerField
# from debts.models import Debt, CustomerShop
# from debts.models import Payment
# from products.models import Product
# from django.db.models.functions import TruncDate, TruncWeek, TruncMonth
# 
# 
# def get_period_filter(period):
#     now = timezone.now()
#     if period == 'week':
#         return now - timedelta(days=7)
#     elif period == 'month':
#         return now - timedelta(days=30)
#     elif period == 'three_months':
#         return now - timedelta(days=90)
#     elif period == 'year':
#         return now - timedelta(days=365)
#     return now - timedelta(days=30)
# 
# class SalesReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
# 
#         if period == 'week':
#             trunc = TruncDate
#         elif period in ['month', 'three_months']:
#             trunc = TruncDate
#         elif period == 'year':
#             trunc = TruncMonth
# 
#         sales = Sale.objects.filter(shop=request.user, created_at__gte=from_date)
# 
#         cash_sales = sales.filter(is_debt=False).annotate(
#             sale_total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
#         )
#         debt_sales = sales.filter(is_debt=True).annotate(
#             sale_total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
#         )
# 
#         total_cash = cash_sales.aggregate(total=Sum('sale_total'))['total'] or 0
#         total_debt = debt_sales.aggregate(total=Sum('sale_total'))['total'] or 0
#         total_invoices = sales.count()
#         total_items_sold = SaleItem.objects.filter(sale__shop=request.user, sale__created_at__gte=from_date).aggregate(total=Sum('quantity'))['total'] or 0
# 
#         # top customers
#         top_customers = Sale.objects.filter(
#             shop=request.user, created_at__gte=from_date, customer__isnull=False
#         ).values('customer__full_name', 'customer__phone_number').annotate(
#             total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
#         ).order_by('-total')[:5]
# 
# 
#         trend = Sale.objects.filter(
#             shop=request.user, created_at__gte=from_date
#         ).annotate(
#             date=trunc('created_at')
#         ).values('date').annotate(
#             cash=Sum(
#                 ExpressionWrapper(
#                     F('items__price') * F('items__quantity'),
#                     output_field=IntegerField()
#                 ),
#                 filter=~F('is_debt')
#             ),
#             debt=Sum(
#                 ExpressionWrapper(
#                     F('items__price') * F('items__quantity'),
#                     output_field=IntegerField()
#                 ),
#                 filter=F('is_debt')
#             ),
#             total=Sum(
#                 ExpressionWrapper(
#                     F('items__price') * F('items__quantity'),
#                     output_field=IntegerField()
#                 )
#             )
#         ).order_by('date')
# 
#         trend_data = [
#             {
#                 'date': str(t['date']),
#                 'cash': t['cash'] or 0,
#                 'debt': t['debt'] or 0,
#                 'total': t['total'] or 0
#             }
#             for t in trend
#         ]
# 
# 
#         # top products
#         top_products = SaleItem.objects.filter(
#             sale__shop=request.user, sale__created_at__gte=from_date
#         ).values('product_name').annotate(
#             total_qty=Sum('quantity'),
#             total_amount=Sum(ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()))
#         ).order_by('-total_amount')[:5]
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_cash': total_cash,
#                 'total_debt': total_debt,
#                 'total': total_cash + total_debt,
#                 'total_invoices': total_invoices,
#                 'total_items_sold': total_items_sold
#             },
#             'trend': trend_data,
#             'top_customers': list(top_customers),
#             'top_products': list(top_products)
#         })
# 
# 
# class DebtsReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
# 
#         debts = Debt.objects.filter(shop=request.user, created_at__gte=from_date).prefetch_related('payments')
# 
#         total_debt = sum(d.amount for d in debts)
#         settled = [d for d in debts if d.is_paid]
#         overdue = [d for d in debts if not d.is_paid and d.created_at < timezone.now() - timedelta(days=30)]
# 
#         # top debtors
#         top_debtors = CustomerShop.objects.filter(
#             shop=request.user
#         ).select_related('customer').annotate(
#             total_debt=Sum('debts__amount'),
#             total_paid=Sum('debts__payments__amount')
#         ).order_by('-total_debt')[:5]
# 
#         # overdue debts
#         overdue_list = [
#             {
#                 'debt_id': d.debt_id,
#                 'customer_name': d.customer.customer.full_name,
#                 'amount': d.amount,
#                 'remaining': d.remaining,
#                 'created_at': d.created_at
#             }
#             for d in overdue[:5]
#         ]
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_debt': total_debt,
#                 'total_debtors': len(debts),
#                 'settled_count': len(settled),
#                 'overdue_count': len(overdue)
#             },
#             'top_debtors': [
#                 {
#                     'customer_name': cs.customer.full_name,
#                     'phone_number': cs.customer.phone_number,
#                     'total_debt': cs.total_debt or 0,
#                     'remaining': (cs.total_debt or 0) - (cs.total_paid or 0)
#                 }
#                 for cs in top_debtors
#             ],
#             'overdue_debts': overdue_list
#         })
# 
# 
# class PaymentsReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
# 
#         payments = Payment.objects.filter(debt__shop=request.user, created_at__gte=from_date)
# 
#         total_paid = payments.aggregate(total=Sum('amount'))['total'] or 0
#         total_count = payments.count()
#         today_total = payments.filter(created_at__date=timezone.now().date()).aggregate(total=Sum('amount'))['total'] or 0
# 
#         # largest payments
#         largest = payments.select_related('debt__customer__customer').order_by('-amount')[:5]
# 
#         # recent payments
#         recent = payments.select_related('debt__customer__customer').order_by('-created_at')[:5]
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_paid': total_paid,
#                 'total_count': total_count,
#                 'today_total': today_total
#             },
#             'largest_payments': [
#                 {
#                     'payment_id': p.payment_id,
#                     'customer_name': p.debt.customer.customer.full_name,
#                     'amount': p.amount,
#                     'created_at': p.created_at
#                 }
#                 for p in largest
#             ],
#             'recent_payments': [
#                 {
#                     'payment_id': p.payment_id,
#                     'customer_name': p.debt.customer.customer.full_name,
#                     'amount': p.amount,
#                     'created_at': p.created_at
#                 }
#                 for p in recent
#             ]
#         })
# 
# 
# class CustomersReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
# 
#         customer_shops = CustomerShop.objects.filter(shop=request.user).select_related('customer')
#         active_count = customer_shops.filter(customer__purchases__created_at__gte=from_date).distinct().count()
# 
#         avg_purchase = Sale.objects.filter(
#             shop=request.user, created_at__gte=from_date
#         ).annotate(
#             total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
#         ).aggregate(avg=Avg('total'))['avg'] or 0
# 
#         avg_purchase_count = Sale.objects.filter(
#             shop=request.user, created_at__gte=from_date
#         ).values('customer').annotate(count=Count('id')).aggregate(avg=Avg('count'))['avg'] or 0
# 
#         # top customers by amount
#         top_by_amount = CustomerShop.objects.filter(
#             shop=request.user
#         ).select_related('customer').annotate(
#             total=Sum(ExpressionWrapper(
#                 F('customer__purchases__items__price') * F('customer__purchases__items__quantity'),
#                 output_field=IntegerField()
#             ))
#         ).order_by('-total')[:5]
# 
#         # top customers by count
#         top_by_count = CustomerShop.objects.filter(
#             shop=request.user
#         ).select_related('customer').annotate(
#             count=Count('customer__purchases')
#         ).order_by('-count')[:5]
# 
#         # new customers this period
#         new_customers = customer_shops.filter(created_at__gte=from_date).count()
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_customers': customer_shops.count(),
#                 'active_count': active_count,
#                 'avg_purchase_amount': int(avg_purchase),
#                 'avg_purchase_count': int(avg_purchase_count),
#                 'new_this_period': new_customers
#             },
#             'top_by_amount': [
#                 {
#                     'customer_name': cs.customer.full_name,
#                     'phone_number': cs.customer.phone_number,
#                     'total': cs.total or 0
#                 }
#                 for cs in top_by_amount
#             ],
#             'top_by_count': [
#                 {
#                     'customer_name': cs.customer.full_name,
#                     'phone_number': cs.customer.phone_number,
#                     'count': cs.count or 0
#                 }
#                 for cs in top_by_count
#             ]
#         })
# 
# 
# class ProductsReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
# 
#         products = Product.objects.filter(shop=request.user)
#         total_count = products.count()
#         total_stock = products.aggregate(total=Sum('stock'))['total'] or 0
#         out_of_stock = products.filter(stock=0).count()
#         low_stock = products.filter(stock__gt=0, stock__lte=10).count()
# 
#         # top selling products
#         top_selling = SaleItem.objects.filter(
#             sale__shop=request.user, sale__created_at__gte=from_date
#         ).values('product_name').annotate(
#             total_qty=Sum('quantity'),
#             total_amount=Sum(ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()))
#         ).order_by('-total_amount')[:5]
# 
#         # no sales products
#         sold_product_names = SaleItem.objects.filter(
#             sale__shop=request.user, sale__created_at__gte=from_date
#         ).values_list('product_name', flat=True).distinct()
# 
#         no_sales = products.exclude(name__in=sold_product_names)[:5]
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_count': total_count,
#                 'total_stock': total_stock,
#                 'out_of_stock': out_of_stock,
#                 'low_stock': low_stock
#             },
#             'top_selling': list(top_selling),
#             'no_sales_products': [
#                 {
#                     'id': p.id,
#                     'name': p.name,
#                     'stock': p.stock,
#                     'sell_price': p.sell_price
#                 }
#                 for p in no_sales
#             ]
#         })
# 

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from django.utils import timezone
# from datetime import timedelta
# from django.db.models import Sum, Count, Avg, F, ExpressionWrapper, IntegerField, Q
# from django.db.models.functions import TruncDate, TruncMonth
# from sales.models import Sale, SaleItem
# from debts.models import Debt, Payment
# from products.models import Product
# from customer_management.models import CustomerShop
# 
# 
# def get_period_filter(period):
#     now = timezone.now()
#     if period == 'week':
#         return now - timedelta(days=7)
#     elif period == 'month':
#         return now - timedelta(days=30)
#     elif period == 'three_months':
#         return now - timedelta(days=90)
#     elif period == 'year':
#         return now - timedelta(days=365)
#     return now - timedelta(days=30)
# 
# 
# def get_trunc(period):
#     if period == 'year':
#         return TruncMonth
#     return TruncDate
# 
# 
# class SalesReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
#         trunc = get_trunc(period)
# 
#         base = Sale.objects.filter(shop=request.user, created_at__gte=from_date)
# 
#         # summary با annotate
#         summary = base.annotate(
#             sale_total=Sum(
#                 ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField())
#             )
#         ).aggregate(
#             total_cash=Sum('sale_total', filter=Q(is_debt=False)),
#             total_debt=Sum('sale_total', filter=Q(is_debt=True)),
#             total_invoices=Count('id', distinct=True)
#         )
# 
#         total_items_sold = SaleItem.objects.filter(
#             sale__shop=request.user,
#             sale__created_at__gte=from_date
#         ).aggregate(total=Sum('quantity'))['total'] or 0
# 
#         # trend
#         trend = base.annotate(
#             date=trunc('created_at'),
#             sale_total=Sum(
#                 ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField())
#             )
#         ).values('date').annotate(
#             cash=Sum('sale_total', filter=Q(is_debt=False)),
#             debt=Sum('sale_total', filter=Q(is_debt=True)),
#             total=Sum('sale_total')
#         ).order_by('date')
# 
#         # top customers
#         top_customers = base.filter(
#             customer__isnull=False
#         ).values(
#             'customer__full_name', 'customer__phone_number'
#         ).annotate(
#             total=Sum(
#                 ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField())
#             )
#         ).order_by('-total')[:5]
# 
#         # top products
#         top_products = SaleItem.objects.filter(
#             sale__shop=request.user,
#             sale__created_at__gte=from_date
#         ).values('product_name').annotate(
#             total_qty=Sum('quantity'),
#             total_amount=Sum(
#                 ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField())
#             )
#         ).order_by('-total_amount')[:5]
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_cash': summary['total_cash'] or 0,
#                 'total_debt': summary['total_debt'] or 0,
#                 'total': (summary['total_cash'] or 0) + (summary['total_debt'] or 0),
#                 'total_invoices': summary['total_invoices'] or 0,
#                 'total_items_sold': total_items_sold
#             },
#             'trend': [
#                 {
#                     'date': str(t['date']),
#                     'cash': t['cash'] or 0,
#                     'debt': t['debt'] or 0,
#                     'total': t['total'] or 0
#                 }
#                 for t in trend
#             ],
#             'top_customers': list(top_customers),
#             'top_products': list(top_products)
#         })
# 
# 
# class DebtsReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
#         trunc = get_trunc(period)
#         thirty_days_ago = timezone.now() - timedelta(days=30)
# 
#         # summary
#         total_count = Debt.objects.filter(
#             shop=request.user,
#             created_at__gte=from_date
#         ).count()
# 
#         total_debt = Debt.objects.filter(
#             shop=request.user,
#             created_at__gte=from_date
#         ).aggregate(total=Sum('amount'))['total'] or 0
# 
#         settled_count = Debt.objects.filter(
#             shop=request.user
#         ).annotate(
#             paid=Sum('payments__amount')
#         ).filter(
#             paid__gte=F('amount')
#         ).count()
# 
#         overdue_count = Debt.objects.filter(
#             shop=request.user,
#             created_at__lt=thirty_days_ago
#         ).annotate(
#             paid=Sum('payments__amount')
#         ).filter(
#             Q(paid__isnull=True) | Q(paid__lt=F('amount'))
#         ).count()
# 
#         # trend
#         trend = Debt.objects.filter(
#             shop=request.user,
#             created_at__gte=from_date
#         ).annotate(
#             date=trunc('created_at')
#         ).values('date').annotate(
#             total=Sum('amount'),
#             count=Count('id')
#         ).order_by('date')
# 
#         # top debtors
#         top_debtors = CustomerShop.objects.filter(
#             shop=request.user
#         ).select_related('customer').annotate(
#             total_debt=Sum('debts__amount'),
#             total_paid=Sum('debts__payments__amount')
#         ).order_by('-total_debt')[:5]
# 
#         # overdue debts
#         overdue_debts = Debt.objects.filter(
#             shop=request.user,
#             created_at__lt=thirty_days_ago
#         ).select_related('customer__customer').annotate(
#             paid=Sum('payments__amount')
#         ).filter(
#             Q(paid__isnull=True) | Q(paid__lt=F('amount'))
#         ).order_by('created_at')[:5]
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_debt': total_debt,
#                 'total_count': total_count,
#                 'settled_count': settled_count,
#                 'overdue_count': overdue_count
#             },
#             'trend': [
#                 {
#                     'date': str(t['date']),
#                     'total': t['total'] or 0,
#                     'count': t['count'] or 0
#                 }
#                 for t in trend
#             ],
#             'top_debtors': [
#                 {
#                     'customer_name': cs.customer.full_name,
#                     'phone_number': cs.customer.phone_number,
#                     'total_debt': cs.total_debt or 0,
#                     'remaining': (cs.total_debt or 0) - (cs.total_paid or 0)
#                 }
#                 for cs in top_debtors
#             ],
#             'overdue_debts': [
#                 {
#                     'debt_id': d.debt_id,
#                     'customer_name': d.customer.customer.full_name,
#                     'amount': d.amount,
#                     'remaining': d.amount - (d.paid or 0),
#                     'created_at': d.created_at
#                 }
#                 for d in overdue_debts
#             ]
#         })
# 
# 
# class PaymentsReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
#         trunc = get_trunc(period)
# 
#         payments = Payment.objects.filter(
#             debt__shop=request.user,
#             created_at__gte=from_date
#         )
# 
#         summary = payments.aggregate(
#             total_paid=Sum('amount'),
#             total_count=Count('id')
#         )
# 
#         today_total = Payment.objects.filter(
#             debt__shop=request.user,
#             created_at__date=timezone.now().date()
#         ).aggregate(total=Sum('amount'))['total'] or 0
# 
#         # trend
#         trend = payments.annotate(
#             date=trunc('created_at')
#         ).values('date').annotate(
#             total=Sum('amount'),
#             count=Count('id')
#         ).order_by('date')
# 
#         # largest payments
#         largest = payments.select_related(
#             'debt__customer__customer'
#         ).order_by('-amount')[:5]
# 
#         # recent payments
#         recent = payments.select_related(
#             'debt__customer__customer'
#         ).order_by('-created_at')[:5]
# 
#         # debt summary با annotate
#         debt_summary = Debt.objects.filter(
#             shop=request.user
#         ).annotate(
#             paid=Sum('payments__amount')
#         ).aggregate(
#             total=Count('id'),
#             settled=Count('id', filter=Q(paid__gte=F('amount'))),
#             partial=Count('id', filter=Q(paid__gt=0, paid__lt=F('amount')))
#         )
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_paid': summary['total_paid'] or 0,
#                 'total_count': summary['total_count'] or 0,
#                 'today_total': today_total,
#                 'total_debts': debt_summary['total'] or 0,
#                 'settled': debt_summary['settled'] or 0,
#                 'partial': debt_summary['partial'] or 0
#             },
#             'trend': [
#                 {
#                     'date': str(t['date']),
#                     'total': t['total'] or 0,
#                     'count': t['count'] or 0
#                 }
#                 for t in trend
#             ],
#             'largest_payments': [
#                 {
#                     'payment_id': p.payment_id,
#                     'customer_name': p.debt.customer.customer.full_name,
#                     'amount': p.amount,
#                     'created_at': p.created_at
#                 }
#                 for p in largest
#             ],
#             'recent_payments': [
#                 {
#                     'payment_id': p.payment_id,
#                     'customer_name': p.debt.customer.customer.full_name,
#                     'amount': p.amount,
#                     'created_at': p.created_at
#                 }
#                 for p in recent
#             ]
#         })
# 
# 
# class CustomersReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
#         trunc = get_trunc(period)
# 
#         customer_shops = CustomerShop.objects.filter(shop=request.user)
#         total_customers = customer_shops.count()
#         new_this_period = customer_shops.filter(created_at__gte=from_date).count()
# 
#         active_count = customer_shops.filter(
#             customer__purchases__created_at__gte=from_date
#         ).distinct().count()
# 
#         # avg purchase amount
#         avg_purchase = Sale.objects.filter(
#             shop=request.user,
#             created_at__gte=from_date
#         ).annotate(
#             total=Sum(
#                 ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField())
#             )
#         ).aggregate(avg=Avg('total'))['avg'] or 0
# 
#         # avg purchase count per customer
#         avg_count = Sale.objects.filter(
#             shop=request.user,
#             created_at__gte=from_date,
#             customer__isnull=False
#         ).values('customer').annotate(
#             count=Count('id')
#         ).aggregate(avg=Avg('count'))['avg'] or 0
# 
#         # new customers trend
#         trend = customer_shops.filter(
#             created_at__gte=from_date
#         ).annotate(
#             date=trunc('created_at')
#         ).values('date').annotate(
#             count=Count('id')
#         ).order_by('date')
# 
#         # top by amount
#         top_by_amount = Sale.objects.filter(
#             shop=request.user,
#             created_at__gte=from_date,
#             customer__isnull=False
#         ).values(
#             'customer__full_name',
#             'customer__phone_number'
#         ).annotate(
#             total=Sum(
#                 ExpressionWrapper(
#                     F('items__price') * F('items__quantity'),
#                     output_field=IntegerField()
#                 )
#             )
#         ).order_by('-total')[:5]
# 
#         # top by count
#         top_by_count = Sale.objects.filter(
#             shop=request.user,
#             created_at__gte=from_date,
#             customer__isnull=False
#         ).values(
#             'customer__full_name',
#             'customer__phone_number'
#         ).annotate(
#             count=Count('id')
#         ).order_by('-count')[:5]
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_customers': total_customers,
#                 'active_count': active_count,
#                 'new_this_period': new_this_period,
#                 'avg_purchase_amount': int(avg_purchase),
#                 'avg_purchase_count': int(avg_count)
#             },
#             'trend': [
#                 {
#                     'date': str(t['date']),
#                     'count': t['count'] or 0
#                 }
#                 for t in trend
#             ],
#             'top_by_amount': [
#                 {
#                     'customer_name': c['customer__full_name'],
#                     'phone_number': c['customer__phone_number'],
#                     'total': c['total'] or 0
#                 }
#                 for c in top_by_amount
#             ],
#             'top_by_count': [
#                 {
#                     'customer_name': c['customer__full_name'],
#                     'phone_number': c['customer__phone_number'],
#                     'count': c['count'] or 0
#                 }
#                 for c in top_by_count
#             ]
#         })
# 
# class ProductsReportView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         period = request.query_params.get('period', 'month')
#         from_date = get_period_filter(period)
# 
#         products = Product.objects.filter(shop=request.user)
# 
#         summary = products.aggregate(
#             total_count=Count('id'),
#             total_stock=Sum('stock'),
#             out_of_stock=Count('id', filter=Q(stock=0)),
#             low_stock=Count('id', filter=Q(stock__gt=0, stock__lte=10))
#         )
# 
#         # top selling
#         top_selling = SaleItem.objects.filter(
#             sale__shop=request.user,
#             sale__created_at__gte=from_date
#         ).values('product_name').annotate(
#             total_qty=Sum('quantity'),
#             total_amount=Sum(
#                 ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField())
#             )
#         ).order_by('-total_amount')[:5]
# 
#         # no sales products
#         sold_names = SaleItem.objects.filter(
#             sale__shop=request.user,
#             sale__created_at__gte=from_date
#         ).values_list('product_name', flat=True).distinct()
# 
#         no_sales = products.exclude(name__in=sold_names).values(
#             'id', 'name', 'stock', 'sell_price'
#         )[:5]
# 
#         # stock by category
#         stock_by_category = products.values(
#             'category__name'
#         ).annotate(
#             total_stock=Sum('stock'),
#             count=Count('id')
#         ).order_by('-total_stock')
# 
#         return Response({
#             'ok': True,
#             'period': period,
#             'summary': {
#                 'total_count': summary['total_count'] or 0,
#                 'total_stock': summary['total_stock'] or 0,
#                 'out_of_stock': summary['out_of_stock'] or 0,
#                 'low_stock': summary['low_stock'] or 0
#             },
#             'top_selling': list(top_selling),
#             'no_sales_products': list(no_sales),
#             'stock_by_category': list(stock_by_category)
#         })

from datetime import timedelta
from django.utils import timezone


def get_date_range(request):
    from_date = request.query_params.get('from_date')
    to_date = request.query_params.get('to_date')
    if not from_date:
        from_date = (timezone.now() - timedelta(days=30)).date()
    if not to_date:
        to_date = timezone.now().date()
    return from_date, to_date