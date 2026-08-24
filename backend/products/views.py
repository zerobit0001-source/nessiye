from datetime import timedelta
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from debts.models import Debt, Payment
from customer_management.models import CustomerShop
from django.db.models import Q
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from django.db.models import Sum, F, ExpressionWrapper, IntegerField, BigIntegerField, OuterRef, Subquery
from django.db.models.functions import TruncDate, Coalesce
from sales.models import Sale
from config.pagination import StandardPagination
from activity.services import log_activity
from activity.models import Activity
from django.db.models.functions import TruncDate
from sales.models import SaleItem
from django.core.cache import cache
from config.cache import dashboard_key, DASHBOARD_TIMEOUT, invalidate_dashboard
from config.cache import categories_key, CATEGORIES_TIMEOUT
from config.cache import invalidate_dashboard, invalidate_reports, invalidate_products
from notifications.services import create_notification

class IsShop:
    @staticmethod
    def check(user):
        return user.is_authenticated and user.is_shop
    

class ProductListCreateView(APIView):
    """This class for get and post products from shops"""
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    # parser_classes = [MultiPartParser, FormParser]

    # def get(self, request):
    #     barcode = request.query_params.get('barcode')
    #     search = request.query_params.get('search')
    #     category = request.query_params.get('category')
    # 
    #     if request.user.is_authenticated and request.user.is_shop:
    #         products = Product.objects.filter(shop=request.user)
    #     # else:
    #     #     products = Product.objects.all()
# 
    #     if search:
    #         products = products.filter(Q(name__icontains=search) | Q(barcode__icontains=search))
# 
    #     if category:
    #         products = products.filter(category__name__icontains=category)
    # 
    #     if barcode:
    #         product = products.filter(barcode=barcode).first()
    #         if not product:
    #             return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
    #         serializer = ProductSerializer(product)
    #         return Response({"ok": True, "product": serializer.data})
    # 
    #     serializer = ProductSerializer(products, many=True)
    #     return Response({"ok": True, "products": serializer.data})

    def get(self, request):
        barcode = request.query_params.get('barcode')
        search = request.query_params.get('search')
        category = request.query_params.get('category')
        ordering = request.query_params.get('ordering', '-created_at')
        status = request.query_params.get('status')

        if request.user.is_authenticated and request.user.is_shop:
            products = Product.objects.filter(shop=request.user)
        else:
            products = Product.objects.all()

        if barcode:
            product = products.filter(barcode=barcode).first()
            if not product:
                return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
            return Response({"ok": True, "product": {
                'id': product.id,
                'name': product.name,
                'barcode': product.barcode,
                'sell_price': product.sell_price,
                'created_at': product.created_at,
                'stock': product.stock
            }})

        if search:
            products = products.filter(Q(name__icontains=search) | Q(barcode__icontains=search))

        if category:
            products = products.filter(category__name__icontains=category)


        # status filter
        if status == 'stocked':
            products = products.filter(stock__gt=10)
        elif status == 'low_stock':
            products = products.filter(stock__gt=0, stock__lte=10)
        elif status == 'out_of_stock':
            products = products.filter(stock=0)

        # ordering
        ordering_map = {
            'amount': 'sell_price',
            '-amount': '-sell_price',
            'name': 'name',
            '-name': '-name',
            'created_at': 'created_at',
            '-created_at': '-created_at'
        }
        if ordering in ordering_map:
            products = products.order_by(ordering_map[ordering])

        # summary
        all_products = Product.objects.filter(shop=request.user) if request.user.is_authenticated and request.user.is_shop else Product.objects.all()
        total_count = all_products.count()
        total_stock = all_products.aggregate(total=Sum('stock'))['total'] or 0
        stocked_count = all_products.filter(stock__gt=10).count()
        low_stock_count = all_products.filter(stock__gt=0, stock__lte=10).count()
        out_of_stock_count = all_products.filter(stock=0).count()

        result = [
            {
                'id': p.id,
                'name': p.name,
                'barcode': p.barcode,
                'sell_price': p.sell_price,
                'created_at': p.created_at,
                'stock': p.stock
            }
            for p in products
        ]

        paginator = StandardPagination()
        page = paginator.paginate_queryset(result, request)
        response = paginator.get_paginated_response(page)
        response.data['summary'] = {
            'total_count': total_count,
            'total_stock': total_stock,
            'stocked': stocked_count,
            'low_stock': low_stock_count,
            'out_of_stock': out_of_stock_count
        }
        return response

        # pagination = StandardPagination()
        # paginated_result = pagination.paginate_queryset(result, request)
        # return pagination.get_paginated_response(paginated_result)

        # return Response({"ok": True, "products": result})

    def post(self, request):
        if not IsShop.check(request.user):
            return Response({'ok': False, 'message': 'فقط فروشگاه‌ها می‌توانند محصول اضافه کنند'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(shop=request.user)

        log_activity(
            shop=request.user,
            action='create',
            entity='product',
            title=f'اضافه شد {serializer.instance.name} محصول',
            object_id=serializer.instance.id
        )

        create_notification(
            shop=request.user,
            entity='products',
            action='created',
            title='محصول جدید ایجاد شد',
            message=f'{serializer.instance.name} - قیمت فروش {serializer.instance.sell_price:,} تومان - موجودی {serializer.instance.stock}',
            entity_id=serializer.instance.id
        )

        invalidate_dashboard(request.user.id)
        invalidate_products(request.user.id)

        return Response({'ok': True, 'message': 'محصول با موفقیت اضافه شد', 'product': serializer.data}, status=status.HTTP_201_CREATED)
    

class ProductDetailView(APIView):
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    # parser_classes = [MultiPartParser, FormParser]

    def get_object(self, pk, user=None):
        try:
            product = Product.objects.get(pk=pk)
            return product
        except Product.DoesNotExist:
            return None
        
    def get(self, request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product)
        return Response({'ok': True, 'product': serializer.data}, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        if not IsShop.check(request.user):
            return Response({'ok': False, 'message': 'فقط فروشگاه‌ها می‌توانند محصول را ویرایش کنند'}, status=status.HTTP_403_FORBIDDEN)
        
        product = self.get_object(pk)
        if not product:
            return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
        
        if product.shop != request.user:
            return Response({'ok': False, 'message': 'شما اجازه ویرایش این محصول را ندارید'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProductSerializer(product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        create_notification(
            shop=request.user,
            entity='products',
            action='updated',
            title='محصول ویرایش شد',
            message=f'{product.name} - قیمت جدید {product.sell_price:,} تومان - موجودی جدید {product.stock}',
            entity_id=product.id
        )

        return Response({'ok': True, 'message': 'محصول با موفقیت ویرایش شد', 'product': serializer.data}, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        if not IsShop.check(request.user):
            return Response({'ok': False, 'message': 'فقط فروشگاه‌ها می‌توانند محصول را حذف کنند'}, status=status.HTTP_403_FORBIDDEN)
        
        product = self.get_object(pk)
        if not product:
            return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
        
        if product.shop != request.user:
            return Response({'ok': False, 'message': 'شما اجازه حذف این محصول را ندارید'}, status=status.HTTP_403_FORBIDDEN)
        
        product.delete()

        create_notification(
            shop=request.user,
            entity='products',
            action='deleted',
            title='محصول حذف شد',
            message=f'{product.name} - قیمت فروش {product.sell_price:,} تومان',
            entity_id=product.id
        )

        return Response({'ok': True, 'message': 'محصول با موفقیت حذف شد'}, status=status.HTTP_200_OK)
    

class CategoryListCreateView(APIView):
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        key = categories_key()
        cached = cache.get(key)
        if cached:
            return Response(cached)
        
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        result = {'ok': True, 'categories': serializer.data}
        cache.set(key, result, timeout=CATEGORIES_TIMEOUT)

        return Response(result, status=status.HTTP_200_OK)

        # return Response({'ok': True, 'categories': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        if not IsShop.check(request.user):
            return Response({'ok': False, 'message': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        log_activity(
            shop=request.user,
            action='create',
            entity='category',
            title=f'اضافه شد {serializer.instance.name} دسته‌بندی',
            object_id=serializer.instance.id
        )

        cache.delete(categories_key())
        
        return Response({'ok': True, 'message': 'دسته‌بندی با موفقیت اضافه شد', 'category': serializer.data}, status=status.HTTP_201_CREATED)
    

class ModalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        modal_type = request.query_params.get('type')
        serach = request.query_params.get('search')

        if modal_type == 'customers':
            customer_shops = CustomerShop.objects.filter(shop=request.user).select_related('customer')

            if serach:
                customer_shops = customer_shops.filter(
                    Q(customer__full_name__icontains=serach) |
                    Q(customer__phone_number__icontains=serach)
                )

            result = [
                {
                    'id': cs.customer.id,
                    'phone_number': cs.customer.phone_number,
                    'full_name': cs.customer.full_name
                }
                for cs in customer_shops
            ]
            return Response({'ok': True, 'customers': result})

        elif modal_type == 'products':
            products = Product.objects.filter(shop=request.user)

            if serach:
                products = products.filter(
                    Q(name__icontains=serach) |
                    Q(barcode__icontains=serach)
                )

            result = [
                {
                    'id': p.id,
                    'name': p.name,
                    'barcode': p.barcode,
                    'sell_price': p.sell_price
                }
                for p in products
            ]
            return Response({'ok': True, 'products': result})

        elif modal_type == 'credits':
            customer_id = request.query_params.get('customer_id')
            
            customer_shops = CustomerShop.objects.filter(shop=request.user)
            debts = Debt.objects.filter(shop=request.user, customer__in=customer_shops)
            
            if customer_id:
                debts = debts.filter(customer__customer_id=customer_id)

            if serach:
                debts = debts.filter(
                    Q(customer__customer__full_name__icontains=serach) |
                    Q(customer__customer__phone_number__icontains=serach) |
                    Q(debt_id__icontains=serach)
                )
            
            result = [
                {
                    'id': d.id,
                    'remaining': d.remaining,
                    'created_at': d.created_at,
                    'is_paid': d.is_paid
                }
                for d in debts
            ]
            return Response({'ok': True, 'debts': result})

        return Response({'ok': False, 'error': 'تایپ نامعتبر است'}, status=status.HTTP_400_BAD_REQUEST)
    


# class DashboardView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         key = dashboard_key(request.user.id)
#         cached = cache.get(key)
#         if cached:
#             return Response(cached)
# 
#         total_sales = Sale.objects.filter(
#             shop=request.user,
#             is_debt=False
#         ).annotate(
#             sale_total=Sum(
#                 ExpressionWrapper(
#                     F('items__price') * F('items__quantity'),
#                     output_field=IntegerField()
#                 )
#             )
#         ).aggregate(total=Sum('sale_total'))['total'] or 0
# 
#         debt_data = Debt.objects.filter(shop=request.user).aggregate(
#             total_debts=Sum('amount')
#         )
#         total_debts = debt_data['total_debts'] or 0
# 
#         total_paid = Payment.objects.filter(
#             debt__shop=request.user
#         ).aggregate(total=Sum('amount'))['total'] or 0
# 
#         number_of_customers = CustomerShop.objects.filter(shop=request.user).count()
# 
#         top_debtors = CustomerShop.objects.filter(shop=request.user).select_related('customer').annotate(
#             total_debt=Sum('debts__amount'),
#             total_paid=Sum('debts__payments__amount')
#         ).order_by('-total_debt')[:5]
# 
#         top_debtors_data = [
#             {
#                 'customer_name': cs.customer.full_name,
#                 'phone_number': cs.customer.phone_number,
#                 'total_debt': cs.total_debt or 0,
#                 'total_paid': cs.total_paid or 0,
#                 'remaining': (cs.total_debt or 0) - (cs.total_paid or 0)
#             }
#             for cs in top_debtors
#         ]
# 
#         low_stock = Product.objects.filter(
#             shop = request.user,
#             stock__gt = 0 
#         ).order_by("stock")[:5]
# 
#         low_stock_data = [
#             {
#                 'id': p.id,
#                 'name': p.name,
#                 'stock': p.stock,
#                 'barcode': p.barcode
#             }
#             for p in low_stock
#         ]
# 
#         today = timezone.now().date()
#         seven_days_ago = timezone.now() - timedelta(days=7)
# 
#         today_sales = Sale.objects.filter(
#             shop=request.user,
#             created_at__date=today,
#             is_debt=False).annotate(
#             sale_total=Sum(
#                 ExpressionWrapper(
#                     F('items__price') * F('items__quantity'),
#                     output_field=IntegerField()
#                 )
#             )
#         ).aggregate(total=Sum('sale_total'))['total'] or 0
# 
#         today_debts = Debt.objects.filter(
#             shop=request.user,
#             created_at__date=today
#         ).aggregate(total=Sum('amount'))['total'] or 0
# 
#         today_paid = Payment.objects.filter(
#             debt__shop=request.user,
#             created_at__date=today
#         ).aggregate(total=Sum('amount'))['total'] or 0
# 
#         activity = Activity.objects.filter(shop=request.user).order_by('-created_at')[:5]
# 
#         # charts
#         sales_chart = SaleItem.objects.filter(
#             sale__shop=request.user,
#             sale__created_at__date__gte=seven_days_ago,
#             sale__is_debt=False
#         ).annotate(
#             date=TruncDate('sale__created_at')
#         ).values('date').annotate(
#             total=Sum(ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()))
#         ).order_by('date')
# 
#         payments_chart = Payment.objects.filter(
#             debt__shop=request.user,
#             created_at__date__gte=seven_days_ago
#         ).annotate(
#             date=TruncDate('created_at')
#         ).values('date').annotate(
#             total=Sum('amount')
#         ).order_by('date')
# 
#         debt_chart = Debt.objects.filter(
#             shop=request.user
#         ).aggregate(
#             total_debt=Sum('amount'),
#             total_paid=Sum('payments__amount')
#         )
#         total_debt_amount = debt_chart['total_debt'] or 0
#         total_paid_amount = debt_chart['total_paid'] or 0
# 
# 
#         activity_data = [
#             {
#                 'action': a.action,
#                 'entity': a.entity,
#                 'title': a.title,
#                 'object_id': a.object_id,
#                 'metadata': a.metadata,
#                 'created_at': a.created_at
#             }
#             for a in activity
#         ]
# 
#         result = {
#             'ok': True,
#             'data': {
#                 'total_sales_price': total_sales,
#                 'total_debts_price': total_debts,
#                 'total_price': total_sales + total_debts,
#                 'total_payed_amount': total_paid,
#                 'number_of_customers': number_of_customers,
#                 'top_debtors': top_debtors_data,
#                 'low_stock_products' : low_stock_data,
#                 'today_sales': today_sales,
#                 'today_debts': today_debts,
#                 'today_paid': today_paid,
#                 'recent_activities': activity_data,
#                 'charts': {
#                     'sales_trend': [
#                         {
#                             'date': str(t['date']),
#                             'total': t['total'] or 0
#                         }
#                         for t in sales_chart
#                     ],
#                     'payments_trend': [
#                         {
#                             'date': str(t['date']),
#                             'total': t['total'] or 0
#                         }
#                         for t in payments_chart
#                     ],
#                     'debt_distribution': {
#                         'total_debt': total_debt_amount,
#                         'total_paid': total_paid_amount,
#                         'remaining': total_debt_amount - total_paid_amount
#                     }
#                 }
#             }
#         }
# 
#         cache.set(key, result, timeout=DASHBOARD_TIMEOUT)
# 
#         return Response(result)

class DashboardView(APIView):
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

        key = dashboard_key(request.user.id)

        cached = cache.get(key)

        if cached is not None:
            return Response(cached)

        shop = request.user

        today = timezone.localdate()

        start_date = today - timedelta(days=6)

        date_range = [
            start_date + timedelta(days=i)
            for i in range(7)
        ]

        total_sales = (
            SaleItem.objects
            .filter(
                sale__shop=shop,
                sale__is_debt=False,
            )
            .aggregate(
                total=Sum(
                    ExpressionWrapper(
                        F('price') * F('quantity'),
                        output_field=BigIntegerField(),
                    )
                )
            )['total']
            or 0
        )

        total_debts = (
            Debt.objects
            .filter(shop=shop)
            .aggregate(
                total=Sum('amount')
            )['total']
            or 0
        )

        total_paid = (
            Payment.objects
            .filter(
                debt__shop=shop
            )
            .aggregate(
                total=Sum('amount')
            )['total']
            or 0
        )

        number_of_customers = (
            CustomerShop.objects
            .filter(shop=shop)
            .count()
        )

        customer_debt_total = (
            Debt.objects
            .filter(
                shop=shop,
                customer=OuterRef('pk'),
            )
            .values('customer')
            .annotate(
                total=Sum('amount')
            )
            .values('total')[:1]
        )

        customer_payment_total = (
            Payment.objects
            .filter(
                debt__shop=shop,
                debt__customer=OuterRef('pk'),
            )
            .values('debt__customer')
            .annotate(
                total=Sum('amount')
            )
            .values('total')[:1]
        )

        top_debtors = (
            CustomerShop.objects
            .filter(shop=shop)
            .select_related('customer')
            .annotate(
                total_debt=Coalesce(
                    Subquery(
                        customer_debt_total,
                        output_field=BigIntegerField(),
                    ),
                    0,
                ),
                total_paid=Coalesce(
                    Subquery(
                        customer_payment_total,
                        output_field=BigIntegerField(),
                    ),
                    0,
                ),
            )
            .order_by('-total_debt')[:5]
        )

        top_debtors_data = []

        for customer in top_debtors:

            total_debt = customer.total_debt or 0
            total_paid_customer = customer.total_paid or 0

            remaining = max(
                total_debt - total_paid_customer,
                0,
            )

            top_debtors_data.append(
                {
                    'customer_name': customer.customer.full_name,
                    'phone_number': customer.customer.phone_number,
                    'total_debt': total_debt,
                    'total_paid': total_paid_customer,
                    'remaining': remaining,
                }
            )

        low_stock = (
            Product.objects
            .filter(
                shop=shop,
                stock__gt=0,
            )
            .order_by('stock')[:5]
        )

        low_stock_data = [
            {
                'id': product.id,
                'name': product.name,
                'stock': product.stock,
                'barcode': product.barcode,
            }
            for product in low_stock
        ]

        sales_chart = (
            SaleItem.objects
            .filter(
                sale__shop=shop,
                sale__is_debt=False,
                sale__created_at__date__gte=start_date,
                sale__created_at__date__lte=today,
            )
            .annotate(
                date=TruncDate('sale__created_at')
            )
            .values('date')
            .annotate(
                total=Sum(
                    ExpressionWrapper(
                        F('price') * F('quantity'),
                        output_field=BigIntegerField(),
                    )
                )
            )
            .order_by('date')
        )

        sales_map = {
            item['date']: item['total'] or 0
            for item in sales_chart
        }

        payments_chart = (
            Payment.objects
            .filter(
                debt__shop=shop,
                created_at__date__gte=start_date,
                created_at__date__lte=today,
            )
            .annotate(
                date=TruncDate('created_at')
            )
            .values('date')
            .annotate(
                total=Sum('amount')
            )
            .order_by('date')
        )

        payments_map = {
            item['date']: item['total'] or 0
            for item in payments_chart
        }

        sales_trend = [
            {
                'date': str(date),
                'total': sales_map.get(date, 0),
            }
            for date in date_range
        ]

        payments_trend = [
            {
                'date': str(date),
                'total': payments_map.get(date, 0),
            }
            for date in date_range
        ]

        today_sales = sales_map.get(today, 0)
        today_paid = payments_map.get(today, 0)

        today_debts = (
            Debt.objects
            .filter(
                shop=shop,
                created_at__date=today,
            )
            .aggregate(
                total=Sum('amount')
            )['total']
            or 0
        )

        total_debt_amount = total_debts
        total_paid_amount = total_paid

        remaining_debt_amount = max(
            total_debt_amount - total_paid_amount,
            0,
        )

        activity = (
            Activity.objects
            .filter(shop=shop)
            .order_by('-created_at')[:5]
        )

        activity_data = [
            {
                'action': activity_item.action,
                'entity': activity_item.entity,
                'title': activity_item.title,
                'object_id': activity_item.object_id,
                'metadata': activity_item.metadata,
                'created_at': activity_item.created_at,
            }
            for activity_item in activity
        ]

        result = {
            'ok': True,
            'data': {
                'total_sales_price': total_sales,
                'total_debts_price': total_debts,
                'total_price': total_sales + total_debts,
                'total_payed_amount': total_paid,
                'number_of_customers': number_of_customers,

                'top_debtors': top_debtors_data,

                'low_stock_products': low_stock_data,

                'today_sales': today_sales,
                'today_debts': today_debts,
                'today_paid': today_paid,

                'recent_activities': activity_data,

                'charts': {
                    'sales_trend': sales_trend,

                    'payments_trend': payments_trend,

                    'debt_distribution': {
                        'total_debt': total_debt_amount,
                        'total_paid': total_paid_amount,
                        'remaining': remaining_debt_amount,
                    },
                },
            },
        }

        cache.set(
            key,
            result,
            timeout=DASHBOARD_TIMEOUT,
        )

        return Response(result)

#         return Response({
#             'ok': True,
#             'data': {
#                 'total_sales_price': total_sales,
#                 'total_debts_price': total_debts,
#                 'total_price': total_sales + total_debts,
#                 'total_payed_amount': total_paid,
#                 'number_of_customers': number_of_customers,
#                 'top_debtors': top_debtors_data,
#                 'low_stock_products' : low_stock_data,
#                 'today_sales': today_sales,
#                 'today_debts': today_debts,
#                 'today_paid': today_paid,
#                 'recent_activities': activity_data,
#                 'charts': {
#                     'sales_trend': [
#                         {
#                             'date': str(t['date']),
#                             'total': t['total'] or 0
#                         }
#                         for t in sales_chart
#                     ],
#                     'payments_trend': [
#                         {
#                             'date': str(t['date']),
#                             'total': t['total'] or 0
#                         }
#                         for t in payments_chart
#                     ],
#                     'debt_distribution': {
#                         'total_debt': total_debt_amount,
#                         'total_paid': total_paid_amount,
#                         'remaining': total_debt_amount - total_paid_amount
#                     }
#                 }
#             }
#         })


class GlobalSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        query = request.query_params.get('q')
        if not query or len(query) < 2:
            return Response({'ok': False, 'error': 'حداقل ۲ کاراکتر وارد کنید'}, status=status.HTTP_400_BAD_REQUEST)

        # مشتریان
        customer_shops = CustomerShop.objects.filter(
            shop=request.user
        ).filter(
            Q(customer__full_name__icontains=query) |
            Q(customer__phone_number__icontains=query)
        ).select_related('customer')[:5]

        # بدهی‌ها
        debts = Debt.objects.filter(
            shop=request.user
        ).filter(
            Q(debt_id__icontains=query) |
            Q(customer__customer__full_name__icontains=query)
        ).select_related('customer__customer').prefetch_related('payments')[:5]

        # فروش‌ها
        sales = Sale.objects.filter(
            shop=request.user
        ).filter(
            Q(id__icontains=query) |
            Q(customer__full_name__icontains=query)
        ).select_related('customer').annotate(
            total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
        )[:5]

        # محصولات
        products = Product.objects.filter(
            shop=request.user
        ).filter(
            Q(name__icontains=query) |
            Q(barcode__icontains=query)
        )[:5]

        # پرداخت‌ها
        payments = Payment.objects.filter(
            debt__shop=request.user
        ).filter(
            Q(payment_id__icontains=query) |
            Q(debt__customer__customer__full_name__icontains=query)
        ).select_related('debt__customer__customer')[:5]

        return Response({
            'ok': True,
            'query': query,
            'results': {
                'customers': [
                    {
                        'id': cs.customer.id,
                        'full_name': cs.customer.full_name,
                        'phone_number': cs.customer.phone_number
                    }
                    for cs in customer_shops
                ],
                'debts': [
                    {
                        'id': d.id,
                        'debt_id': d.debt_id,
                        'customer_name': d.customer.customer.full_name,
                        'amount': d.amount,
                        'remaining': d.remaining
                    }
                    for d in debts
                ],
                'sales': [
                    {
                        'id': s.id,
                        'customer_name': s.customer.full_name if s.customer else 'مشتری حضوری',
                        'total': s.total or 0,
                        'is_debt': s.is_debt,
                        'created_at': s.created_at
                    }
                    for s in sales
                ],
                'products': [
                    {
                        'id': p.id,
                        'name': p.name,
                        'barcode': p.barcode,
                        'sell_price': p.sell_price,
                        'stock': p.stock
                    }
                    for p in products
                ],
                'payments': [
                    {
                        'id': p.id,
                        'payment_id': p.payment_id,
                        'customer_name': p.debt.customer.customer.full_name,
                        'amount': p.amount,
                        'created_at': p.created_at
                    }
                    for p in payments
                ]
            }
        })