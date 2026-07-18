from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from debts.models import Debt
from .models import Sale, SaleItem
from .serializers import SaleSerializer, SaleItemSerializer
from products.models import Product
from accounts.models import User
from customer_management.models import CustomerShop
from django.db.models import Sum, F, ExpressionWrapper, IntegerField
from config.pagination import StandardPagination
from activity.services import log_activity


class SaleListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    # def get(self, request):
    #     if not request.user.is_shop:
    #         return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
    #     sales = Sale.objects.filter(shop=request.user, is_debt=False).prefetch_related('items__product')
    #     serializer = SaleSerializer(sales, many=True)
    #     return Response({'ok': True, 'sales': serializer.data})

    # def get(self, request):
    #     if not request.user.is_shop:
    #         return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
    # 
    #     sales = Sale.objects.filter(
    #         shop=request.user,
    #         is_debt=False
    #     ).select_related('customer').prefetch_related('items').annotate(
    #         total_amount=Sum(
    #             ExpressionWrapper(
    #                 F('items__price') * F('items__quantity'),
    #                 output_field=IntegerField()
    #             )
    #         )
    #     )
    # 
    #     serializer = SaleSerializer(sales, many=True)
    #     return Response({'ok': True, 'sales': serializer.data})

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
    
        sales = Sale.objects.filter(
            shop=request.user,
            is_debt=False
        ).select_related('customer').annotate(
            total=Sum(
                ExpressionWrapper(
                    F('items__price') * F('items__quantity'),
                    output_field=IntegerField()
                )
            )
        )
    
        result = [
            {
                'id': s.id,
                'customer_name': s.customer.full_name if s.customer else None,
                'total': s.total or 0,
                'created_at': s.created_at
            }
            for s in sales
        ]

        pagination = StandardPagination()
        paginated_result = pagination.paginate_queryset(result, request)
        return pagination.get_paginated_response(paginated_result)
    
        # return Response({'ok': True, 'sales': result})

    @transaction.atomic
    def post(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        items_data = request.data.get('items', [])
        customer_id = request.data.get('customer_id', None)
        is_debt = request.data.get('is_debt', False)

        if not items_data:
            return Response({'ok': False, 'error': 'حداقل یک محصول الزامی است'}, status=status.HTTP_400_BAD_REQUEST)

        if is_debt and not customer_id:
            return Response({'ok': False, 'error': 'برای فروش نسیه، مشتری الزامی است'}, status=status.HTTP_400_BAD_REQUEST)

        customer = None
        customer_shop = None
        if customer_id:
            try:
                customer = User.objects.get(id=customer_id, is_shop=False)
                customer_shop = CustomerShop.objects.get(shop=request.user, customer=customer)
            except User.DoesNotExist:
                return Response({'ok': False, 'error': 'مشتری یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
            except CustomerShop.DoesNotExist:
                return Response({'ok': False, 'error': 'این مشتری در لیست شما نیست'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SaleItemSerializer(data=items_data, many=True)
        serializer.is_valid(raise_exception=True)

        sale = Sale.objects.create(shop=request.user, customer=customer, is_debt=is_debt)

        for item in serializer.validated_data:
            try:
                product = Product.objects.select_for_update().get(id=item['product_id'], shop=request.user)
            except Product.DoesNotExist:
                return Response({'ok': False, 'error': f"محصول {item['product_id']} یافت نشد"}, status=status.HTTP_404_NOT_FOUND)

            if product.stock < item['quantity']:
                return Response({'ok': False, 'error': f"موجودی {product.name} کافی نیست"}, status=status.HTTP_400_BAD_REQUEST)

            SaleItem.objects.create(
                sale=sale,
                product=product,
                quantity=item['quantity'],
                price=product.sell_price
            )

            product.stock -= item['quantity']
            product.save()
 
 
        result = SaleSerializer(sale)
        
        if is_debt:
            total = sum(item.price * item.quantity for item in sale.items.all())
            Debt.objects.create(
                shop=request.user,
                customer=customer_shop,
                sale=sale,
                amount=total
            )

            log_activity(
                shop=request.user,
                action='create',
                entity='debt',
                title=f'بدهی ثبت شد {customer_shop.customer.full_name}',
                object_id=Debt.objects.filter(shop=request.user, customer=customer_shop).last().id
            )
        
        else:   
            # result = SaleSerializer(sale)

            log_activity(
                shop=request.user,
                action='create',
                entity='sale',
                title=f'فروش ثبت شد {result.instance.customer.customer.full_name if result.instance.customer else "بدون مشتری"}',
                object_id=result.instance.id
            )

        return Response({'ok': True, 'message': 'فروش با موفقیت ثبت شد', 'sale': result.data}, status=status.HTTP_201_CREATED)


class SaleDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        try:
            sale = Sale.objects.prefetch_related('items__product').get(pk=pk, shop=request.user)
        except Sale.DoesNotExist:
            return Response({'ok': False, 'error': 'فروش یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SaleSerializer(sale)
        return Response({'ok': True, 'sale': serializer.data})