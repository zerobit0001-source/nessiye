from accounts.models import User
from activity.services import log_activity
from config.pagination import StandardPagination
from customer_management.models import CustomerShop
from debts.models import Debt
from django.db import transaction
from django.db.models import ExpressionWrapper, F, IntegerField, Sum, Q
from django.utils import timezone
from products.models import Product
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import timedelta
from .models import Sale, SaleItem
from .serializers import SaleItemSerializer, SaleSerializer
from config.cache import invalidate_dashboard, invalidate_reports
from notifications.services import create_notification


# class SaleListCreateView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response(
#                 {"ok": False, "error": "دسترسی ندارید"},
#                 status=status.HTTP_403_FORBIDDEN,
#             )
# 
#         ordering = request.query_params.get("ordering", "-created_at")
#         period = request.query_params.get("period", None)
# 
#         now = timezone.now()
#         today = now.date()
#         this_month = now - timedelta(days=30)
# 
#         sales = (
#             Sale.objects.filter(shop=request.user, is_debt=False)
#             .select_related("customer")
#             .annotate(
#                 total=Sum(
#                     ExpressionWrapper(
#                         F("items__price") * F("items__quantity"),
#                         output_field=IntegerField(),
#                     )
#                 )
#             )
#         )
# 
#         # period filter
#         now = timezone.now()
#         if period == "today":
#             sales = sales.filter(created_at__date=now.date())
#         elif period == "this_week":
#             sales = sales.filter(created_at__gte=now - timedelta(days=7))
#         elif period == "this_month":
#             sales = sales.filter(created_at__gte=now - timedelta(days=30))
# 
#         # ordering
#         if ordering in ["created_at", "-created_at"]:
#             sales = sales.order_by(ordering)
#         elif ordering in ["amount", "-amount"]:
#             sales = sales.order_by(ordering.replace("amount", "total"))
# 
#         result = [
#             {
#                 "id": s.id,
#                 "customer_name": s.customer.full_name if s.customer else None,
#                 "total": s.total or 0,
#                 "created_at": s.created_at,
#             }
#             for s in sales
#         ]
# 
#         # summary
#         all_sales = Sale.objects.filter(shop=request.user)
# 
#         today_sales = all_sales.filter(created_at__date=today)
#         today_count = today_sales.filter(is_debt=False).count()
#         today_total = today_sales.filter(is_debt=False).annotate(
#             sale_total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
#         ).aggregate(total=Sum('sale_total'))['total'] or 0
# 
#         this_month_cash = all_sales.filter(
#             is_debt=False, created_at__gte=this_month
#         ).annotate(
#             sale_total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
#         ).aggregate(total=Sum('sale_total'))['total'] or 0
# 
#         this_month_debt = all_sales.filter(
#             is_debt=True, created_at__gte=this_month
#         ).annotate(
#             sale_total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
#         ).aggregate(total=Sum('sale_total'))['total'] or 0
# 
#         total_amount = all_sales.annotate(
#             sale_total=Sum(ExpressionWrapper(F('items__price') * F('items__quantity'), output_field=IntegerField()))
#         ).aggregate(total=Sum('sale_total'))['total'] or 0
# 
#         paginator = StandardPagination()
#         page = paginator.paginate_queryset(result, request)
#         response = paginator.get_paginated_response(page)
#         response.data['summary'] = {
#             'total_count': all_sales.count(),
#             'total_amount': total_amount,
#             'today_count': today_count,
#             'today_total': today_total,
#             'this_month_cash': this_month_cash,
#             'this_month_debt': this_month_debt,
#         }
#         return response
# 
#         # pagination = StandardPagination()
#         # paginated_result = pagination.paginate_queryset(result, request)
#         # return pagination.get_paginated_response(paginated_result)
# 
#         # return Response({'ok': True, 'sales': result})
# 
#     @transaction.atomic
#     def post(self, request):
#         if not request.user.is_shop:
#             return Response(
#                 {"ok": False, "error": "دسترسی ندارید"},
#                 status=status.HTTP_403_FORBIDDEN,
#             )
# 
#         items_data = request.data.get("items", [])
#         customer_id = request.data.get("customer_id", None)
#         is_debt = request.data.get("is_debt", False)
# 
#         if not items_data:
#             return Response(
#                 {"ok": False, "error": "حداقل یک محصول الزامی است"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
# 
#         if is_debt and not customer_id:
#             return Response(
#                 {"ok": False, "error": "برای فروش نسیه، مشتری الزامی است"},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
# 
#         customer = None
#         customer_shop = None
#         if customer_id:
#             try:
#                 customer = User.objects.get(id=customer_id, is_shop=False)
#                 customer_shop = CustomerShop.objects.get(
#                     shop=request.user, customer=customer
#                 )
#             except User.DoesNotExist:
#                 return Response(
#                     {"ok": False, "error": "مشتری یافت نشد"},
#                     status=status.HTTP_404_NOT_FOUND,
#                 )
#             except CustomerShop.DoesNotExist:
#                 return Response(
#                     {"ok": False, "error": "این مشتری در لیست شما نیست"},
#                     status=status.HTTP_404_NOT_FOUND,
#                 )
# 
#         serializer = SaleItemSerializer(data=items_data, many=True)
#         serializer.is_valid(raise_exception=True)
# 
#         sale = Sale.objects.create(
#             shop=request.user, customer=customer, is_debt=is_debt
#         )
# 
#         for item in serializer.validated_data:
#             try:
#                 product = Product.objects.select_for_update().get(
#                     id=item["product_id"], shop=request.user
#                 )
#             except Product.DoesNotExist:
#                 return Response(
#                     {"ok": False, "error": f"محصول {item['product_id']} یافت نشد"},
#                     status=status.HTTP_404_NOT_FOUND,
#                 )
# 
#             if product.stock < item["quantity"]:
#                 return Response(
#                     {"ok": False, "error": f"موجودی {product.name} کافی نیست"},
#                     status=status.HTTP_400_BAD_REQUEST,
#                 )
# 
#             SaleItem.objects.create(
#                 sale=sale,
#                 product=product,
#                 quantity=item["quantity"],
#                 price=product.sell_price,
#             )
# 
#             product.stock -= item["quantity"]
#             product.save()
# 
#         result = SaleSerializer(sale)
# 
#         if is_debt:
#             total = sum(item.price * item.quantity for item in sale.items.all())
#             Debt.objects.create(
#                 shop=request.user, customer=customer_shop, sale=sale, amount=total
#             )
# 
#             log_activity(
#                 shop=request.user,
#                 action="create",
#                 entity="debt",
#                 title=f"بدهی ثبت شد {customer_shop.customer.full_name}",
#                 object_id=Debt.objects.filter(shop=request.user, customer=customer_shop)
#                 .last()
#                 .id,
#             )
# 
#         else:
#             # result = SaleSerializer(sale)
# 
#             log_activity(
#                 shop=request.user,
#                 action="create",
#                 entity="sale",
#                 title=f"فروش ثبت شد {result.instance.customer.full_name if result.instance.customer else 'بدون مشتری'}",
#                 object_id=result.instance.id,
#             )
# 
#         return Response(
#             {"ok": True, "message": "فروش با موفقیت ثبت شد", "sale": result.data},
#             status=status.HTTP_201_CREATED,
#         )

class SaleListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response(
                {"ok": False, "error": "دسترسی ندارید"},
                status=status.HTTP_403_FORBIDDEN,
            )

        ordering = request.query_params.get("ordering", "-created_at")
        period = request.query_params.get("period", None)

        search = request.query_params.get("search", None)

        now = timezone.now()
        today = now.date()
        this_month = now - timedelta(days=30)

        sales = (
            Sale.objects.filter(shop=request.user, is_debt=False)
            .select_related("customer")
            .annotate(
                total=Sum(
                    ExpressionWrapper(
                        F("items__price") * F("items__quantity"),
                        output_field=IntegerField(),
                    )
                )
            )
        )

        if search:
            sales = sales.filter(
                Q(customer__full_name__icontains=search) |
                Q(customer__phone_number__icontains=search)
            )

        # period filter
        now = timezone.now()
        if period == "today":
            sales = sales.filter(created_at__date=now.date())
        elif period == "this_week":
            sales = sales.filter(created_at__gte=now - timedelta(days=7))
        elif period == "this_month":
            sales = sales.filter(created_at__gte=now - timedelta(days=30))

        # ordering
        if ordering in ["created_at", "-created_at"]:
            sales = sales.order_by(ordering)
        elif ordering in ["amount", "-amount"]:
            sales = sales.order_by(ordering.replace("amount", "total"))

        result = [
            {
                "id": s.id,
                "customer_name": s.customer.full_name if s.customer else None,
                "total": s.total or 0,
                "created_at": s.created_at,
            }
            for s in sales
        ]

        # summary
        all_sales = Sale.objects.filter(shop=request.user)

        sale_items_summary = SaleItem.objects.filter(
            sale__shop=request.user
        ).aggregate(
            total_amount=Sum(ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField())),
            today_cash=Sum(
                ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()),
                filter=Q(sale__created_at__date=today, sale__is_debt=False)
            ),
            this_month_cash=Sum(
                ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()),
                filter=Q(sale__created_at__gte=this_month, sale__is_debt=False)
            ),
            this_month_debt=Sum(
                ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()),
                filter=Q(sale__created_at__gte=this_month, sale__is_debt=True)
            )
        )

        today_count = Sale.objects.filter(
            shop=request.user,
            created_at__date=today,
            is_debt=False
        ).count()

        paginator = StandardPagination()
        page = paginator.paginate_queryset(result, request)
        response = paginator.get_paginated_response(page)
        response.data['summary'] = {
            'total_count': all_sales.count(),
            'total_amount': sale_items_summary['total_amount'] or 0,
            'today_count': today_count,
            'today_total': sale_items_summary['today_cash'] or 0,
            'this_month_cash': sale_items_summary['this_month_cash'] or 0,
            'this_month_debt': sale_items_summary['this_month_debt'] or 0,
        }
        return response

        # pagination = StandardPagination()
        # paginated_result = pagination.paginate_queryset(result, request)
        # return pagination.get_paginated_response(paginated_result)

        # return Response({'ok': True, 'sales': result})

    @transaction.atomic
    def post(self, request):
        if not request.user.is_shop:
            return Response(
                {"ok": False, "error": "دسترسی ندارید"},
                status=status.HTTP_403_FORBIDDEN,
            )

        items_data = request.data.get("items", [])
        customer_id = request.data.get("customer_id", None)
        is_debt = request.data.get("is_debt", False)

        if not items_data:
            return Response(
                {"ok": False, "error": "حداقل یک محصول الزامی است"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if is_debt and not customer_id:
            return Response(
                {"ok": False, "error": "برای فروش نسیه، مشتری الزامی است"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        customer = None
        customer_shop = None
        if customer_id:
            try:
                customer = User.objects.get(id=customer_id, is_shop=False)
                customer_shop = CustomerShop.objects.get(
                    shop=request.user, customer=customer
                )
            except User.DoesNotExist:
                return Response(
                    {"ok": False, "error": "مشتری یافت نشد"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            except CustomerShop.DoesNotExist:
                return Response(
                    {"ok": False, "error": "این مشتری در لیست شما نیست"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        serializer = SaleItemSerializer(data=items_data, many=True)
        serializer.is_valid(raise_exception=True)

        sale = Sale.objects.create(
            shop=request.user, customer=customer, is_debt=is_debt
        )

        for item in serializer.validated_data:
            try:
                product = Product.objects.select_for_update().get(
                    id=item["product_id"], shop=request.user
                )
            except Product.DoesNotExist:
                return Response(
                    {"ok": False, "error": f"محصول {item['product_id']} یافت نشد"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            if product.stock < item["quantity"]:
                return Response(
                    {"ok": False, "error": f"موجودی {product.name} کافی نیست"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            SaleItem.objects.create(
                sale=sale,
                product=product,
                quantity=item["quantity"],
                price=product.sell_price,
            )

            product.stock -= item["quantity"]
            product.save()

            if product.stock == 0:
                create_notification(
                    shop=request.user,
                    entity='products',
                    action='out_of_stock',
                    title='محصول تمام شد',
                    message=f'محصول {product.name} تمام شد',
                    entity_id=product.id
                )
            elif product.stock < 5:
                create_notification(
                    shop=request.user,
                    entity='products',
                    action='low_stock',
                    title='موجودی محصول کم است',
                    message=f'موجودی محصول {product.name} کم است - موجودی: {product.stock}',
                    entity_id=product.id
                )

        result = SaleSerializer(sale)

        if is_debt:
            total = sum(item.price * item.quantity for item in sale.items.all())
            Debt.objects.create(
                shop=request.user, customer=customer_shop, sale=sale, amount=total
            )

            log_activity(
                shop=request.user,
                action="create",
                entity="debt",
                title=f"بدهی ثبت شد {customer_shop.customer.full_name}",
                object_id=Debt.objects.filter(shop=request.user, customer=customer_shop)
                .last()
                .id,
            )

            create_notification(
                shop=request.user,
                entity='debts',
                action='created',
                title='بدهی ثبت شد',
                message=f'{customer_shop.customer.full_name} - مبلغ {total:,} تومان',
                entity_id=Debt.objects.filter(shop=request.user, customer=customer_shop).last().id
            )

        else:
            # result = SaleSerializer(sale)

            log_activity(
                shop=request.user,
                action="create",
                entity="sale",
                title=f"فروش ثبت شد {result.instance.customer.full_name if result.instance.customer else 'بدون مشتری'}",
                object_id=result.instance.id,
            )

            create_notification(
                shop=request.user,
                entity='sales',
                action='created',
                title='فروش ثبت شد',
                message=f'{result.instance.customer.full_name if result.instance.customer else "بدون مشتری"} - مبلغ {sum(item.price * item.quantity for item in sale.items.all()):,} تومان',
                entity_id=result.instance.id
            )

        invalidate_dashboard(request.user.id)
        invalidate_reports(request.user.id)

        return Response(
            {"ok": True, "message": "فروش با موفقیت ثبت شد", "sale": result.data},
            status=status.HTTP_201_CREATED,
        )


class SaleDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if not request.user.is_shop:
            return Response(
                {"ok": False, "error": "دسترسی ندارید"},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            sale = Sale.objects.prefetch_related("items__product").get(
                pk=pk, shop=request.user
            )
        except Sale.DoesNotExist:
            return Response(
                {"ok": False, "error": "فروش یافت نشد"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = SaleSerializer(sale)
        return Response({"ok": True, "sale": serializer.data})
