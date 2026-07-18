from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Debt, Payment
from .serializers import DebtSerializer
from config.pagination import StandardPagination
from django.utils import timezone
from activity.services import log_activity


class DebtListView(APIView):
    """This class for debt list view for shop account"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        debts = Debt.objects.filter(
            shop=request.user
        ).select_related('customer__customer').prefetch_related('payments')

        result = [
            {
                'id': d.id,
                'debt_id': d.debt_id,
                'customer_name': d.customer.customer.full_name,
                'total_amount': d.amount,
                'paid_amount': d.paid_amount,
                'remaining_amount': d.remaining,
                'created_at': d.created_at,
                'is_paid': d.is_paid
            }
            for d in debts
        ]

        pagination = StandardPagination()
        paginated_result = pagination.paginate_queryset(result, request)
        return pagination.get_paginated_response(paginated_result)

        # return Response({'ok': True, 'debts': result})

class DebtDetailView(APIView):
    """This class for debt detail view for shop account"""
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        try:
            debt = Debt.objects.get(pk=pk, shop=request.user)
        except Debt.DoesNotExist:
            return Response({'ok': False, 'error': 'بدهی یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        serializer = DebtSerializer(debt)
        return Response({'ok': True, 'debt': serializer.data})

    def delete(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        try:
            debt = Debt.objects.get(pk=pk, shop=request.user)
        except Debt.DoesNotExist:
            return Response({'ok': False, 'error': 'بدهی یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        debt.delete()
        return Response({'ok': True, 'message': 'بدهی حذف شد'})
    

# class DebtPayView(APIView):
#     """This class for pay debt from shop account"""
#     permission_classes = [IsAuthenticated]
# 
#     def post(self, request, pk):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         try:
#             debt = Debt.objects.get(pk=pk, shop=request.user)
#         except Debt.DoesNotExist:
#             return Response({'ok': False, 'error': 'بدهی یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
# 
#         if debt.is_paid:
#             return Response({'ok': False, 'error': 'این بدهی قبلاً پرداخت شده است'}, status=status.HTTP_400_BAD_REQUEST)
# 
#         pay_full = request.data.get('pay_full', False)
#         amount = request.data.get('amount', 0)
# 
#         if pay_full:
#             debt.paid_amount = debt.amount
#         else:
#             if not amount:
#                 return Response({'ok': False, 'error': 'مبلغ الزامی است'}, status=status.HTTP_400_BAD_REQUEST)
#             debt.paid_amount += amount
#             if debt.paid_amount > debt.amount:
#                 debt.paid_amount = debt.amount
# 
#         debt.save()
#         serializer = DebtSerializer(debt)
#         return Response({
#             'ok': True,
#             'message': 'پرداخت ثبت شد',
#             'debt': serializer.data
#         })
#     
# class PaymentListView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
# 
#         debts = Debt.objects.filter(
#             shop=request.user,
#             paid_amount__gt=0
#         ).select_related('customer__customer')
# 
#         result = [
#             {
#                 'id': d.id,
#                 'customer_name': d.customer.customer.full_name,
#                 'customer_phone': d.customer.customer.phone_number,
#                 'amount': d.amount,
#                 'paid_amount': d.paid_amount,
#                 'remaining': d.remaining,
#                 'is_paid': d.is_paid,
#                 'created_at': d.created_at
#             }
#             for d in debts
#         ]
# 
#         return Response({'ok': True, 'payments': result})


class DebtPayView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        try:
            debt = Debt.objects.get(pk=pk, shop=request.user)
        except Debt.DoesNotExist:
            return Response({'ok': False, 'error': 'بدهی یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        if debt.is_paid:
            return Response({'ok': False, 'error': 'این بدهی قبلاً پرداخت شده است'}, status=status.HTTP_400_BAD_REQUEST)

        pay_full = request.data.get('pay_full', False)
        amount = request.data.get('amount', 0)

        if pay_full:
            amount = debt.remaining
        else:
            if not amount:
                return Response({'ok': False, 'error': 'مبلغ الزامی است'}, status=status.HTTP_400_BAD_REQUEST)
            if amount > debt.remaining:
                amount = debt.remaining

        Payment.objects.create(debt=debt, amount=amount)

        serializer = DebtSerializer(debt)

        log_activity(
            shop=request.user,
            action='create',
            entity='payment',
            title=f'پرداخت شد {serializer.instance.customer.customer.full_name} بدهی',
            object_id=serializer.instance.id
        )

        return Response({
            'ok': True,
            'message': 'پرداخت ثبت شد',
            'debt': serializer.data
        })


class PaymentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        payments = Payment.objects.filter(
            debt__shop=request.user
        ).select_related('debt__customer__customer')

        result = [
            {
                'id': p.id,
                'payment_id': p.payment_id,
                'debt_id': p.debt.id,
                'customer_name': p.debt.customer.customer.full_name,
                'customer_phone': p.debt.customer.customer.phone_number,
                'amount': p.amount,
                'created_at': p.created_at
            }
            for p in payments
        ]

        pagination = StandardPagination()
        paginated_result = pagination.paginate_queryset(result, request)
        return pagination.get_paginated_response(paginated_result)

        # return Response({'ok': True, 'payments': result})
    
class CustomerDebtPayView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, debt_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این  برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            debt = Debt.objects.get(debt_id=debt_id, customer__customer=request.user)
        except Debt.DoesNotExist:
            return Response({'ok': False, 'error': 'بدهی یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        if debt.is_paid:
            return Response({'ok': False, 'error': 'این بدهی قبلاً پرداخت شده است'}, status=status.HTTP_400_BAD_REQUEST)

        pay_full = request.data.get('pay_full', False)
        amount = request.data.get('amount', 0)

        if pay_full:
            amount = debt.remaining
        else:
            if not amount:
                return Response({'ok': False, 'error': 'مبلغ الزامی است'}, status=status.HTTP_400_BAD_REQUEST)
            if amount > debt.remaining:
                amount = debt.remaining

        Payment.objects.create(debt=debt, amount=amount)

        return Response({
            'ok': True,
            'message': 'پرداخت ثبت شد',
            'payment_id': Payment.objects.filter(debt=debt).last().payment_id,
            'remaining': debt.remaining
        })
    

class OverdueDebtsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        overdue_debts = Debt.objects.filter(
            shop=request.user,
            is_paid=False,
            created_at__lt=timezone.now() - timezone.timedelta(days=30)
        ).select_related('customer__customer')

        result = [
            {
                'id': d.id,
                'debt_id': d.debt_id,
                'customer_name': d.customer.customer.full_name,
                'total_amount': d.amount,
                'paid_amount': d.paid_amount,
                'remaining_amount': d.remaining,
                'created_at': d.created_at
            }
            for d in overdue_debts
        ]

        pagination = StandardPagination()
        paginated_result = pagination.paginate_queryset(result, request)
        return pagination.get_paginated_response(paginated_result)
    
