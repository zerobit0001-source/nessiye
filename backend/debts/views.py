from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Debt
from .serializers import DebtSerializer


class DebtListView(APIView):
    """This class for debt list view for shop account"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_shop:
            return Response({'ok': False, 'error': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)

        debts = Debt.objects.filter(shop=request.user)
        serializer = DebtSerializer(debts, many=True)
        return Response({'ok': True, 'debts': serializer.data})


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
    """This class for pay debt from shop account"""
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
            debt.paid_amount = debt.amount
        else:
            if not amount:
                return Response({'ok': False, 'error': 'مبلغ الزامی است'}, status=status.HTTP_400_BAD_REQUEST)
            debt.paid_amount += amount
            if debt.paid_amount > debt.amount:
                debt.paid_amount = debt.amount

        debt.save()
        serializer = DebtSerializer(debt)
        return Response({
            'ok': True,
            'message': 'پرداخت ثبت شد',
            'debt': serializer.data
        })