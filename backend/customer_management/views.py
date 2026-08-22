from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from .models import CustomerShop
from .serializers import CustomerSerializer
from sales.models import Sale
from sales.serializers import SaleSerializer
from debts.models import Debt, Payment
from debts.serializers import DebtSerializer
from django.db.models import Max, Sum, OuterRef, Subquery, Q, IntegerField
from django.db.models.functions import Coalesce
from accounts.models import User, OtpCode
from activity.services import log_activity
import random
from django.utils import timezone
from datetime import timedelta
from config.pagination import StandardPagination
from config.cache import invalidate_dashboard, invalidate_reports

class CustomerListCreateView(APIView):
    """
    List customers of the shop with accurate debt/payment summaries.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response(
                {'ok': False, 'error': 'دسترسی ندارید'},
                status=status.HTTP_403_FORBIDDEN
            )

        search_query = request.query_params.get('search')
        ordering = request.query_params.get('ordering', '-total_debts')
        filtering = request.query_params.get('filter')

        debt_totals = (
            Debt.objects
            .filter(
                customer=OuterRef('pk'),
                shop=request.user,
            )
            .values('customer')
            .annotate(
                total=Sum('amount')
            )
            .values('total')[:1]
        )

        payment_totals = (
            Payment.objects
            .filter(
                debt__customer=OuterRef('pk'),
                debt__shop=request.user,
            )
            .values('debt__customer')
            .annotate(
                total=Sum('amount')
            )
            .values('total')[:1]
        )

        last_debt_dates = (
            Debt.objects
            .filter(
                customer=OuterRef('pk'),
                shop=request.user,
            )
            .values('customer')
            .annotate(
                last_debt=Max('created_at')
            )
            .values('last_debt')[:1]
        )

        customer_shops = (
            CustomerShop.objects
            .filter(shop=request.user)
            .select_related('customer')
            .annotate(
                total_debts=Coalesce(
                    Subquery(
                        debt_totals,
                        output_field=IntegerField()
                    ),
                    0
                ),
                total_paid=Coalesce(
                    Subquery(
                        payment_totals,
                        output_field=IntegerField()
                    ),
                    0
                ),
                last_debt=Subquery(
                    last_debt_dates
                ),
            )
        )

        if search_query:
            customer_shops = customer_shops.filter(
                Q(customer__full_name__icontains=search_query)
                | Q(customer__phone_number__icontains=search_query)
            )

        result = []

        for cs in customer_shops:
            total_debts = cs.total_debts or 0
            total_paid = cs.total_paid or 0

            # Never expose a negative remaining amount.
            remaining_amount = max(
                total_debts - total_paid,
                0
            )

            result.append({
                'id': cs.customer.id,
                'full_name': cs.customer.full_name,
                'phone_number': cs.customer.phone_number,

                'total_debts': total_debts,
                'paid_amount': total_paid,
                'remaining_amount': remaining_amount,

                'last_debt': cs.last_debt,
            })

        total = len(result)

        this_month = timezone.now() - timedelta(days=30)

        new_this_month = customer_shops.filter(
            created_at__gte=this_month
        ).count()

        active = sum(
            1
            for customer in result
            if customer['remaining_amount'] > 0
        )

        settled = sum(
            1
            for customer in result
            if customer['remaining_amount'] <= 0
        )

        thirty_days_ago = timezone.now() - timedelta(days=30)

        overdue = sum(
            1
            for customer in result
            if (
                customer['remaining_amount'] > 0
                and customer['last_debt']
                and customer['last_debt'] < thirty_days_ago
            )
        )

        if filtering == 'active':
            result = [
                customer
                for customer in result
                if customer['remaining_amount'] > 0
            ]

        elif filtering == 'settled':
            result = [
                customer
                for customer in result
                if customer['remaining_amount'] <= 0
            ]

        elif filtering == 'overdue':
            result = [
                customer
                for customer in result
                if (
                    customer['remaining_amount'] > 0
                    and customer['last_debt']
                    and customer['last_debt'] < thirty_days_ago
                )
            ]

        reverse = ordering.startswith('-')
        order_field = ordering.lstrip('-')

        allowed_ordering = {
            'total_debts',
            'paid_amount',
            'remaining_amount',
        }

        if order_field in allowed_ordering:
            result.sort(
                key=lambda item: item.get(order_field, 0),
                reverse=reverse
            )

        paginator = StandardPagination()

        page = paginator.paginate_queryset(
            result,
            request
        )

        response = paginator.get_paginated_response(page)

        response.data['summary'] = {
            'total': total,
            'new_this_month': new_this_month,
            'active': active,
            'settled': settled,
            'overdue': overdue,
        }

        return response
    
    def post(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        phone_number = request.data.get('phone_number')
        if not phone_number:
            return Response({'ok': False, 'error': 'شماره تلفن الزامی است'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            customer = User.objects.get(phone_number=phone_number, is_shop=False)
        except User.DoesNotExist:
            return Response({'ok': False, 'error': 'کاربر یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        if CustomerShop.objects.filter(shop=request.user, customer=customer).exists():
            return Response({'ok': False, 'error': 'این مشتری قبلاً اضافه شده است'}, status=status.HTTP_400_BAD_REQUEST)

        OtpCode.objects.filter(phone_number=phone_number).delete()

        code = random.randint(100000, 999999)
        OtpCode.objects.create(phone_number=phone_number, code=str(code))

        # send_otp_code(phone_number, code)

        return Response({'ok': True, 'message': 'کد تایید به مشتری ارسال شد'})

# class CustomerListCreateView(APIView):
#     """This view allows shop users to list their customers and add new customers by phone number with OTP verification."""
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         search_query = request.query_params.get('search', None)
#         ordering = request.query_params.get('ordering', '-total_debts')
#         filtering = request.query_params.get('filter', None)
# 
#         customer_shops = CustomerShop.objects.filter(
#             shop=request.user
#         ).select_related('customer').annotate(
#             total_debts=Sum('debts__amount'),
#             total_paid=Sum('debts__payments__amount'),
#             last_debt=Max('debts__created_at')
#         )
# 
#         if search_query:
#             customer_shops = customer_shops.filter(
#                 Q(customer__full_name__icontains=search_query) |
#                 Q(customer__phone_number__icontains=search_query)
#             )
# 
#         result = [
#             {
#                 'id': cs.customer.id,
#                 'full_name': cs.customer.full_name,
#                 'phone_number': cs.customer.phone_number,
#                 'total_debts': cs.total_debts or 0,
#                 'paid_amount': cs.total_paid or 0,
#                 'remaining_amount': (cs.total_debts or 0) - (cs.total_paid or 0),
#                 'last_debt': cs.last_debt
#             }
#             for cs in customer_shops
#         ]
# 
#         # summary
#         total = len(result)
#         this_month = timezone.now() - timedelta(days=30)
#         new_this_month = customer_shops.filter(created_at__gte=this_month).count()
#         active = len([r for r in result if r['remaining_amount'] > 0])
#         settled = len([r for r in result if r['remaining_amount'] <= 0])
#         thirty_days_ago = timezone.now() - timedelta(days=30)
#         overdue = len([r for r in result if r['remaining_amount'] > 0 and r['last_debt'] and r['last_debt'] < thirty_days_ago])
# 
#         # filtering
#         if filtering == 'active':
#             result = [r for r in result if r['remaining_amount'] > 0]
#         elif filtering == 'settled':
#             result = [r for r in result if r['remaining_amount'] <= 0]
#         elif filtering == 'overdue':
#             result = [r for r in result if r['remaining_amount'] > 0 and r['last_debt'] and r['last_debt'] < thirty_days_ago]
# 
#         # ordering
#         reverse = ordering.startswith('-')
#         order_field = ordering.lstrip('-')
#         if order_field in ['total_debts', 'paid_amount', 'remaining_amount']:
#             result = sorted(result, key=lambda x: x.get(order_field, 0), reverse=reverse)
# 
#         paginator = StandardPagination()
#         page = paginator.paginate_queryset(result, request)
#         response = paginator.get_paginated_response(page)
#         response.data['summary'] = {
#             'total': total,
#             'new_this_month': new_this_month,
#             'active': active,
#             'settled': settled,
#             'overdue': overdue
#         }
#         return response
# 
#     def post(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         phone_number = request.data.get('phone_number')
#         if not phone_number:
#             return Response({'ok': False, 'error': 'شماره تلفن الزامی است'}, status=status.HTTP_400_BAD_REQUEST)
# 
#         try:
#             customer = User.objects.get(phone_number=phone_number, is_shop=False)
#         except User.DoesNotExist:
#             return Response({'ok': False, 'error': 'کاربر یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
# 
#         if CustomerShop.objects.filter(shop=request.user, customer=customer).exists():
#             return Response({'ok': False, 'error': 'این مشتری قبلاً اضافه شده است'}, status=status.HTTP_400_BAD_REQUEST)
# 
#         OtpCode.objects.filter(phone_number=phone_number).delete()
# 
#         code = random.randint(100000, 999999)
#         OtpCode.objects.create(phone_number=phone_number, code=str(code))
# 
#         # send_otp_code(phone_number, code)
# 
#         return Response({'ok': True, 'message': 'کد تایید به مشتری ارسال شد'})


class CustomerVerifyView(APIView):
    """Verifies the OTP code for adding a customer to the shops list."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        phone_number = request.data.get('phone_number')
        code = request.data.get('code')

        if not phone_number or not code:
            return Response({'ok': False, 'error': 'شماره و کد الزامی است'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            customer = User.objects.get(phone_number=phone_number, is_shop=False)
        except User.DoesNotExist:
            return Response({'ok': False, 'error': 'کاربر یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        otp = OtpCode.objects.filter(phone_number=phone_number, code=code).order_by('-created_at').first()

        if not otp:
            return Response({'ok': False, 'error': 'کد تایید اشتباه است'}, status=status.HTTP_400_BAD_REQUEST)

        if not otp.is_valid():
            otp.delete()
            return Response({'ok': False, 'error': 'کد تایید منقضی شده است'}, status=status.HTTP_400_BAD_REQUEST)

        otp.delete()

        CustomerShop.objects.create(shop=request.user, customer=customer)
        serializer = CustomerSerializer(customer)


        log_activity(
            shop=request.user,
            action='create',
            entity='customer',
            title=f'اضافه شد {serializer.instance.full_name} مشتری',
            object_id=serializer.instance.id
        )

        invalidate_dashboard(request.user.id)
        invalidate_reports(request.user.id)

        return Response({'ok': True, 'message': 'مشتری با موفقیت اضافه شد', 'customer': serializer.data}, status=status.HTTP_201_CREATED)


class CustomerDeleteView(APIView):
    """Deletes a customer from the shops list and also provides a summary of the customers debts and sales history."""
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        try:
            customer_shop = CustomerShop.objects.get(shop=request.user, customer_id=pk)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'مشتری یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        customer = customer_shop.customer
        debts = Debt.objects.filter(shop=request.user, customer=customer_shop).prefetch_related('payments')

        total_debt = sum(d.amount for d in debts)
        total_paid = sum(d.paid_amount for d in debts)

        return Response({
            'ok': True,
            'customer': {
                'id': customer.id,
                'full_name': customer.full_name,
                'phone_number': customer.phone_number,
            },
            'summary': {
                'total_debt': total_debt,
                'total_paid': total_paid,
                'total_remaining': total_debt - total_paid
            }
        })

    def delete(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        try:
            relation = CustomerShop.objects.get(shop=request.user, customer_id=pk)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'مشتری یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        relation.delete()
        return Response({'ok': True, 'message': 'مشتری حذف شد'})
    

# class CustomerHistoryView(APIView):
#     """Provides a detailed history of a customers interactions with the shop, including sales and debts."""
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request, pk):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         if not CustomerShop.objects.filter(shop=request.user, customer_id=pk).exists():
#             return Response({'ok': False, 'error': 'این مشتری در لیست شما نیست'}, status=status.HTTP_404_NOT_FOUND)
# 
#         sales = Sale.objects.filter(shop=request.user, customer_id=pk).prefetch_related('items__product')
#         debts = Debt.objects.filter(shop=request.user, customer__customer_id=pk)
# 
#         return Response({
#             'ok': True,
#             'customer': CustomerSerializer(User.objects.get(id=pk)).data,
#             'sales': SaleSerializer(sales, many=True).data,
#             'debts': DebtSerializer(debts, many=True).data
#         })
    

# class CustomerHistoryView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request, pk):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         try:
#             customer_shop = CustomerShop.objects.get(shop=request.user, customer_id=pk)
#         except CustomerShop.DoesNotExist:
#             return Response({'ok': False, 'error': 'این مشتری در لیست شما نیست'}, status=status.HTTP_404_NOT_FOUND)
# 
#         sales = Sale.objects.filter(shop=request.user, customer_id=pk).prefetch_related('items__product')
#         debts = Debt.objects.filter(shop=request.user, customer=customer_shop).prefetch_related('payments')
# 
#         total_debt = sum(d.amount for d in debts)
#         total_paid = sum(d.paid_amount for d in debts)
# 
#         return Response({
#             'ok': True,
#             'customer': CustomerSerializer(customer_shop.customer).data,
#             'summary': {
#                 'total_debt': total_debt,
#                 'total_paid': total_paid,
#                 'total_remaining': total_debt - total_paid
#             },
#             'sales': SaleSerializer(sales, many=True).data,
#             'debts': DebtSerializer(debts, many=True).data
#         })
# under 

class CustomerHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        try:
            customer_shop = CustomerShop.objects.get(shop=request.user, customer_id=pk)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'این مشتری در لیست شما نیست'}, status=status.HTTP_404_NOT_FOUND)

        summary = Debt.objects.filter(
            shop=request.user, customer=customer_shop
        ).aggregate(
            total_debt=Sum('amount'),
            total_paid=Sum('payments__amount')
        )
        total_debt = summary['total_debt'] or 0
        total_paid = summary['total_paid'] or 0

        sales = Sale.objects.filter(
            shop=request.user, customer_id=pk, is_debt=False
        ).prefetch_related('items__product')

        debts = Debt.objects.filter(
            shop=request.user, customer=customer_shop
        ).prefetch_related('payments')

        return Response({
            'ok': True,
            'customer': CustomerSerializer(customer_shop.customer).data,
            'summary': {
                'total_debt': total_debt,
                'total_paid': total_paid,
                'total_remaining': total_debt - total_paid
            },
            'sales': SaleSerializer(sales, many=True).data,
            'debts': DebtSerializer(debts, many=True).data
        })
    
