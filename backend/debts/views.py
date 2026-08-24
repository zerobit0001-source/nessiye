from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Debt, Payment
from .serializers import DebtSerializer
from config.pagination import StandardPagination
from django.utils import timezone
from datetime import timedelta
from activity.services import log_activity
from django.db.models import Sum, Count, Q, F
from config.cache import invalidate_dashboard, invalidate_reports
from django.db import transaction
from notifications.services import create_notification

class DebtListView(APIView):
    """This class for debt list view for shop account"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
        
        ordering = request.query_params.get('ordering', '-created_at')
        debt_status = request.query_params.get('status', None)
        period = request.query_params.get('period', None)

        search = request.query_params.get('search', None)

        thirty_days_ago = timezone.now() - timedelta(days=30)

        debts = Debt.objects.filter(
            shop=request.user
        ).select_related('customer__customer').prefetch_related('payments')

        if search:
            debts = debts.filter(
                Q(debt_id__icontains=search) |
                Q(customer__customer__full_name__icontains=search) |
                Q(customer__customer__phone_number__icontains=search)
            )

        # period filtering

        now = timezone.now()
        if period == 'today':
            debts = debts.filter(created_at__date=now.date())
        elif period == 'this_week':
            start_of_week = now - timezone.timedelta(days=now.weekday())
            debts = debts.filter(created_at__date__gte=start_of_week.date())
        elif period == 'this_month':
            debts = debts.filter(created_at__year=now.year, created_at__month=now.month)

        # ordering
        if ordering in ['created_at', '-created_at', 'amount', '-amount']:
            debts = debts.order_by(ordering)

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

        # summary
        total = len(result)
        total_amount = sum(r['total_amount'] for r in result)
        settled = len([r for r in result if r['is_paid']])
        partial = len([r for r in result if not r['is_paid'] and r['paid_amount'] > 0])
        overdue = len([r for r in result if not r['is_paid'] and r['created_at'] < thirty_days_ago])

        #status filter 
        if debt_status == 'active':
            result = [r for r in result if r['remaining_amount'] > 0]
        elif debt_status == 'settled':
            result = [r for r in result if r['remaining_amount'] == 0]
        elif debt_status == 'overdue':
            thirty_days_ago = timezone.now() - timedelta(days=30)
            result = [r for r in result if r['remaining_amount'] > 0 and r['created_at'] < thirty_days_ago]

        #ordering remaining_amount
        if ordering == ['remaining_amount', '-remaining_amount']:
            reverse = ordering.startswith('-')
            result = sorted(result, key=lambda x: x['remaining_amount'], reverse=reverse)

        # pagination = StandardPagination()
        # paginated_result = pagination.paginate_queryset(result, request)
        # return pagination.get_paginated_response(paginated_result)

        paginator = StandardPagination()
        page = paginator.paginate_queryset(result, request)
        response = paginator.get_paginated_response(page)
        response.data['summary'] = {
            'total': total,
            'total_amount': total_amount,
            'settled': settled,
            'partial': partial,
            'overdue': overdue
        }
        return response

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


class DebtPayView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        with transaction.atomic():

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

                create_notification(
                    shop=request.user,
                    entity='payments',
                    action='paid',
                    title= 'تسویه بدهی',
                    message=f'بدهی {serializer.instance.customer.customer.full_name} به مبلغ {amount} به صورت کامل توسط فروشگاه تسویه شد',
                    entity_id=serializer.instance.id
                )

            else:
                if not amount:
                    return Response({'ok': False, 'error': 'مبلغ الزامی است'}, status=status.HTTP_400_BAD_REQUEST)

                try:
                    amount = int(amount)
                except (TypeError, ValueError):
                    return Response({'ok': False, 'error': 'مبلغ باید عدد باشد'}, status=status.HTTP_400_BAD_REQUEST)

                if amount <= 0:
                    return Response({'ok': False, 'error': 'مبلغ باید بزرگتر از صفر باشد'}, status=status.HTTP_400_BAD_REQUEST)

                if amount > debt.remaining:
                    return Response({'ok': False, 'error': 'مبلغ پرداختی نمی‌تواند بیشتر از مبلغ باقی‌مانده باشد'}, status=status.HTTP_400_BAD_REQUEST)
                
                # if amount > debt.remaining:
                #     amount = debt.remaining

            Payment.objects.create(debt=debt, amount=amount)
    
            serializer = DebtSerializer(debt)
    
            log_activity(
                shop=request.user,
                action='create',
                entity='payments',
                title=f'پرداخت شد {serializer.instance.customer.customer.full_name} بدهی',
                object_id=serializer.instance.id
            )

            create_notification(
                shop=request.user,
                entity='payments',
                action='paid',
                title= 'تسویه بدهی',
                message=f'بدهی به مبلغ {amount} توسط {serializer.instance.customer.customer.full_name} پرداخت شد',
                entity_id=serializer.instance.id
            )
    
            invalidate_dashboard(request.user.id)
            invalidate_reports(request.user.id)
    
            return Response({
                'ok': True,
                'message': 'پرداخت ثبت شد',
                'debt': serializer.data
            })


# class PaymentListView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if not request.user.is_shop:
#             return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
#         
#         ordering = request.query_params.get('ordering', '-created_at')
#         period = request.query_params.get('period', None)
# 
#         payments = Payment.objects.filter(
#             debt__shop=request.user
#         ).select_related('debt__customer__customer')
# 
#         now = timezone.now()
#         this_month = now - timedelta(days=30)
# 
#         # period filter
#         now = timezone.now()
#         if period == 'today':
#             payments = payments.filter(created_at__date=now.date())
#         elif period == 'this_week':
#             payments = payments.filter(created_at__gte=now - timedelta(days=7))
#         elif period == 'this_month':
#             payments = payments.filter(created_at__gte=now - timedelta(days=30))
# 
#         # ordering
#         if ordering in ['created_at', '-created_at', 'amount', '-amount']:
#             payments = payments.order_by(ordering)
#         # elif ordering == 'amount':
#         #     payments = payments.order_by('amount')
#         # elif ordering == '-amount':
#         #     payments = payments.order_by('-amount')
# 
#         result = [
#             {
#                 'id': p.id,
#                 'payment_id': p.payment_id,
#                 'debt_id': p.debt.id,
#                 'customer_name': p.debt.customer.customer.full_name,
#                 'customer_phone': p.debt.customer.customer.phone_number,
#                 'amount': p.amount,
#                 'created_at': p.created_at
#             }
#             for p in payments
#         ]
# 
#         # summary
#         all_payments = Payment.objects.filter(debt__shop=request.user)
#         all_debts = Debt.objects.filter(shop=request.user).prefetch_related('payments')
#     
#         total_debts = all_debts.count()
#         this_month_total = all_payments.filter(created_at__gte=this_month).aggregate(total=Sum('amount'))['total'] or 0
#     
#         settled = len([d for d in all_debts if d.is_paid])
#         partial = len([d for d in all_debts if not d.is_paid and d.paid_amount > 0])
#         overdue = len([d for d in all_debts if not d.is_paid and d.created_at < this_month])
# 
#         # if ordering == 'remaining_amount':
#         #     result = sorted(result, key=lambda x: x['remaining_amount'])
#         # elif ordering == '-remaining_amount':
#         #     result = sorted(result, key=lambda x: x['remaining_amount'], reverse=True)
#         # elif ordering == 'amount':
#         #     result = sorted(result, key=lambda x: x['total_amount'])
#         # elif ordering == '-amount':
#         #     result = sorted(result, key=lambda x: x['total_amount'], reverse=True)
# 
#         # pagination = StandardPagination()
#         # paginated_result = pagination.paginate_queryset(result, request)
#         # return pagination.get_paginated_response(paginated_result)
# 
#         paginator = StandardPagination()
#         page = paginator.paginate_queryset(result, request)
#         response = paginator.get_paginated_response(page)
#         response.data['summary'] = {
#             'total_debts': total_debts,
#             'this_month_total': this_month_total,
#             'settled': settled,
#             'partial': partial,
#             'overdue': overdue
#         }
#         return response
# 
#         # return Response({'ok': True, 'payments': result})


class PaymentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
        
        ordering = request.query_params.get('ordering', '-created_at')
        period = request.query_params.get('period', None)

        search = request.query_params.get('search', None)

        payments = Payment.objects.filter(
            debt__shop=request.user
        ).select_related('debt__customer__customer')

        if search:
            payments = payments.filter(
                Q(payment_id__icontains=search) |
                Q(debt__debt_id__icontains=search) |
                Q(debt__customer__customer__full_name__icontains=search) |
                Q(debt__customer__customer__phone_number__icontains=search)
            )

        now = timezone.now()
        this_month = now - timedelta(days=30)

        # period filter
        now = timezone.now()
        if period == 'today':
            payments = payments.filter(created_at__date=now.date())
        elif period == 'this_week':
            payments = payments.filter(created_at__gte=now - timedelta(days=7))
        elif period == 'this_month':
            payments = payments.filter(created_at__gte=now - timedelta(days=30))

        # ordering
        if ordering in ['created_at', '-created_at', 'amount', '-amount']:
            payments = payments.order_by(ordering)
        # elif ordering == 'amount':
        #     payments = payments.order_by('amount')
        # elif ordering == '-amount':
        #     payments = payments.order_by('-amount')

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

        # summary
        all_payments = Payment.objects.filter(debt__shop=request.user)
        this_month_total = all_payments.filter(created_at__gte=this_month).aggregate(total=Sum('amount'))['total'] or 0
    
        debt_summary = Debt.objects.filter(
            shop=request.user
        ).annotate(
            paid=Sum('payments__amount')
        ).aggregate(
            total=Count('id'),
            settled=Count('id', filter=Q(paid__gte=F('amount'))),
            partial=Count('id', filter=Q(paid__gt=0, paid__lt=F('amount')))
        )

        overdue_count = Debt.objects.filter(
            shop=request.user,
            created_at__lt=this_month
        ).annotate(
            paid=Sum('payments__amount')
        ).filter(
            Q(paid__isnull=True) | Q(paid__lt=F('amount'))
        ).count()

        # if ordering == 'remaining_amount':
        #     result = sorted(result, key=lambda x: x['remaining_amount'])
        # elif ordering == '-remaining_amount':
        #     result = sorted(result, key=lambda x: x['remaining_amount'], reverse=True)
        # elif ordering == 'amount':
        #     result = sorted(result, key=lambda x: x['total_amount'])
        # elif ordering == '-amount':
        #     result = sorted(result, key=lambda x: x['total_amount'], reverse=True)

        # pagination = StandardPagination()
        # paginated_result = pagination.paginate_queryset(result, request)
        # return pagination.get_paginated_response(paginated_result)

        paginator = StandardPagination()
        page = paginator.paginate_queryset(result, request)
        response = paginator.get_paginated_response(page)
        response.data['summary'] = {
            'total_debts': debt_summary['total'] or 0,
            'this_month_total': this_month_total,
            'settled': debt_summary['settled'] or 0,
            'partial': debt_summary['partial'] or 0,
            'overdue': overdue_count
        }
        return response

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
            created_at__lt=timezone.now() - timedelta(days=30)
        ).select_related('customer__customer').prefetch_related('payments')

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
            if not d.is_paid
        ]

        pagination = StandardPagination()
        paginated_result = pagination.paginate_queryset(result, request)
        return pagination.get_paginated_response(paginated_result)
    
