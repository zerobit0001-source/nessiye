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
from django.db.models import Sum, F, ExpressionWrapper, IntegerField
from sales.models import Sale
from config.pagination import StandardPagination
from activity.services import log_activity
from activity.models import Activity
from django.db.models.functions import TruncDate
from sales.models import SaleItem
from django.core.cache import cache
from config.cache import dashboard_key, DASHBOARD_TIMEOUT, invalidate_dashboard
from config.cache import categories_key, CATEGORIES_TIMEOUT

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

        if modal_type == 'customers':
            customer_shops = CustomerShop.objects.filter(shop=request.user).select_related('customer')
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
    


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        key = dashboard_key(request.user.id)
        cached = cache.get(key)
        if cached:
            return Response(cached)

        total_sales = Sale.objects.filter(
            shop=request.user,
            is_debt=False
        ).annotate(
            sale_total=Sum(
                ExpressionWrapper(
                    F('items__price') * F('items__quantity'),
                    output_field=IntegerField()
                )
            )
        ).aggregate(total=Sum('sale_total'))['total'] or 0

        debt_data = Debt.objects.filter(shop=request.user).aggregate(
            total_debts=Sum('amount')
        )
        total_debts = debt_data['total_debts'] or 0

        total_paid = Payment.objects.filter(
            debt__shop=request.user
        ).aggregate(total=Sum('amount'))['total'] or 0

        number_of_customers = CustomerShop.objects.filter(shop=request.user).count()

        top_debtors = CustomerShop.objects.filter(shop=request.user).select_related('customer').annotate(
            total_debt=Sum('debts__amount'),
            total_paid=Sum('debts__payments__amount')
        ).order_by('-total_debt')[:5]

        top_debtors_data = [
            {
                'customer_name': cs.customer.full_name,
                'phone_number': cs.customer.phone_number,
                'total_debt': cs.total_debt or 0,
                'total_paid': cs.total_paid or 0,
                'remaining': (cs.total_debt or 0) - (cs.total_paid or 0)
            }
            for cs in top_debtors
        ]

        low_stock = Product.objects.filter(
            shop = request.user,
            stock__gt = 0 
        ).order_by("stock")[:5]

        low_stock_data = [
            {
                'id': p.id,
                'name': p.name,
                'stock': p.stock,
                'barcode': p.barcode
            }
            for p in low_stock
        ]

        today = timezone.now().date()
        seven_days_ago = timezone.now() - timedelta(days=7)

        today_sales = Sale.objects.filter(
            shop=request.user,
            created_at__date=today,
            is_debt=False).annotate(
            sale_total=Sum(
                ExpressionWrapper(
                    F('items__price') * F('items__quantity'),
                    output_field=IntegerField()
                )
            )
        ).aggregate(total=Sum('sale_total'))['total'] or 0

        today_debts = Debt.objects.filter(
            shop=request.user,
            created_at__date=today
        ).aggregate(total=Sum('amount'))['total'] or 0

        today_paid = Payment.objects.filter(
            debt__shop=request.user,
            created_at__date=today
        ).aggregate(total=Sum('amount'))['total'] or 0

        activity = Activity.objects.filter(shop=request.user).order_by('-created_at')[:5]

        # charts
        sales_chart = SaleItem.objects.filter(
            sale__shop=request.user,
            sale__created_at__date__gte=seven_days_ago,
            sale__is_debt=False
        ).annotate(
            date=TruncDate('sale__created_at')
        ).values('date').annotate(
            total=Sum(ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()))
        ).order_by('date')

        payments_chart = Payment.objects.filter(
            debt__shop=request.user,
            created_at__date__gte=seven_days_ago
        ).annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            total=Sum('amount')
        ).order_by('date')

        debt_chart = Debt.objects.filter(
            shop=request.user
        ).aggregate(
            total_debt=Sum('amount'),
            total_paid=Sum('payments__amount')
        )
        total_debt_amount = debt_chart['total_debt'] or 0
        total_paid_amount = debt_chart['total_paid'] or 0


        activity_data = [
            {
                'action': a.action,
                'entity': a.entity,
                'title': a.title,
                'object_id': a.object_id,
                'metadata': a.metadata,
                'created_at': a.created_at
            }
            for a in activity
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
                'low_stock_products' : low_stock_data,
                'today_sales': today_sales,
                'today_debts': today_debts,
                'today_paid': today_paid,
                'recent_activities': activity_data,
                'charts': {
                    'sales_trend': [
                        {
                            'date': str(t['date']),
                            'total': t['total'] or 0
                        }
                        for t in sales_chart
                    ],
                    'payments_trend': [
                        {
                            'date': str(t['date']),
                            'total': t['total'] or 0
                        }
                        for t in payments_chart
                    ],
                    'debt_distribution': {
                        'total_debt': total_debt_amount,
                        'total_paid': total_paid_amount,
                        'remaining': total_debt_amount - total_paid_amount
                    }
                }
            }
        }

        cache.set(key, result, timeout=DASHBOARD_TIMEOUT)

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