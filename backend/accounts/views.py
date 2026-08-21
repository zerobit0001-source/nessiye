from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import RefreshToken as JWTRefreshToken
from rest_framework.permissions import IsAuthenticated
import random
from utils import send_otp_code
from customer_management.models import CustomerShop
from sales.models import Sale
from sales.serializers import SaleSerializer
from debts.models import Debt, Payment
from debts.serializers import DebtSerializer
from django.db.models import Sum, Count, Max, F, IntegerField, ExpressionWrapper
from .models import User, OtpCode
from config.pagination import StandardPagination
from .serializers import (
    RegisterSerializer,
    RegisterVerifyCodeSerializer,
    LoginSerializer,
    SendOTPSerializer,
    OTPLoginSerializer,
)
from sales.models import SaleItem


class RefreshTokenView(APIView):
    """This view allows clients to refresh their access token using a valid refresh token."""
    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"ok": False, "error": "توکن ارسال نشده است"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            refresh = JWTRefreshToken(refresh_token)
            return Response({
                "ok": True,
                "access": str(refresh.access_token)
            })
        except Exception:
            return Response(
                {"ok": False, "error": "توکن نامعتبر یا منقضی شده است"},
                status=status.HTTP_400_BAD_REQUEST
            )




class RegisterView(APIView):
    """This view handles user registration by
    accepting phone number, full name, password, and optional shop details.
    It generates an OTP code for verification and creates a temporary OtpCode entry."""
    def post(self, request):

        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone_number = serializer.validated_data["phone_number"]

        if User.objects.filter(phone_number=phone_number).exists():
            return Response(
                {   "ok": False,
                    "error": "این شماره قبلاً ثبت شده است"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        
        random_code = random.randint(100000, 999999)
        # send_otp_code(phone_number, random_code)
        OtpCode.objects.create(
            phone_number=phone_number,
            code=random_code,
            full_name=serializer.validated_data["full_name"],
            password=serializer.validated_data["password"],
            is_shop=serializer.validated_data["is_shop"],
            shop_name=serializer.validated_data.get("shop_name", ""),
            shop_address=serializer.validated_data.get("shop_address", "")
        )
        
        return Response({
            "ok": True,
            "message": "کد تایید به شماره شما ارسال شد"
        })
    
class RegisterVerifyCodeView(APIView):
    """This view verifies the OTP code sent to the user's phone number during registration."""
    def post(self, request):

        serializer = RegisterVerifyCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data["phone_number"]
        code = serializer.validated_data["code"]

        try:
            otp_code = OtpCode.objects.filter(
                phone_number=phone_number,
                code=code
            ).order_by("-created_at").first()
        except OtpCode.DoesNotExist:
            return Response(
                {
                    "ok": False,
                    "error": "کد تایید اشتباه است"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not otp_code.is_valid() or otp_code.created_at < timezone.now() - timedelta(minutes=2):
            otp_code.delete()
            return Response(
                {
                    "ok": False,
                    "error": "کد تایید منقضی شده است"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            phone_number=phone_number,
            full_name=otp_code.full_name,
            password=otp_code.password,
            is_shop=otp_code.is_shop,
            shop_name=otp_code.shop_name,
            shop_address=otp_code.shop_address
        )

        otp_code.delete()

        refresh = RefreshToken.for_user(user)

        return Response({
            "ok": True,
            "message": "ثبت نام موفق",
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })


class LoginView(APIView):

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data["phone_number"]
        password = serializer.validated_data["password"]

        user = authenticate(
            request,
            phone_number=phone_number,
            password=password
        )

        if user is None:
            return Response(
                {
                    "ok": False,
                    "error": "شماره یا رمز عبور اشتباه است"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "ok": True,
            "message": "ورود موفق",
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })
    

class SendOTPView(APIView):

    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data["phone_number"]

        if not User.objects.filter(phone_number=phone_number).exists():
            return Response(
                {
                    "ok": False,
                    "error": "کاربر یافت نشد"
                 },
                status=status.HTTP_404_NOT_FOUND
            )

        code = random.randint(100000, 999999)

        OtpCode.objects.create(
            phone_number=phone_number,
            code=str(code)
        )

        # send_otp_code(phone_number, code)

        return Response(
            {
                "ok": True,
                "message": "کد تایید ارسال شد"
             },
            status=status.HTTP_200_OK
        )


class OTPLoginView(APIView):

    def post(self, request):
        serializer = OTPLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data["phone_number"]
        code = serializer.validated_data["code"]

        if not User.objects.filter(phone_number=phone_number).exists():
            return Response(
                {
                    "ok": False,
                    "error": "کاربر یافت نشد"
                 },
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            otp_code = OtpCode.objects.get(
                phone_number=phone_number,
                code=code
            )
        except OtpCode.DoesNotExist:
            return Response(
                {
                    "ok": False,
                    "error": "کد تایید اشتباه است"
                 },
                status=status.HTTP_400_BAD_REQUEST
            )

        if not otp_code.is_valid():
            otp_code.delete()

            return Response(
                {
                    "ok": False,
                    "error": "کد تایید منقضی شده است"
                 },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.get(phone_number=phone_number)

        otp_code.delete()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "ok": True,
                "message": "ورود موفق",
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            },
            status=status.HTTP_200_OK
        )
    




# class ProfileView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         user = request.user
# 
#         data = {
#             "ok": True,
#             "phone_number": user.phone_number,
#             "full_name": user.full_name,
#             "is_shop": user.is_shop,
#             "shop_name": user.shop_name,
#             "shop_address": user.shop_address,
#         }
# 
#         if not user.is_shop:
#             customer_shops = CustomerShop.objects.filter(customer=user)
#             debts = Debt.objects.filter(customer__in=customer_shops)
# 
#             total_debt = sum(d.amount for d in debts)
#             total_paid = sum(d.paid_amount for d in debts)
#             total_remaining = total_debt - total_paid
# 
#             data['debt_summary'] = {
#                 'total_debt': total_debt,
#                 'total_paid': total_paid,
#                 'total_remaining': total_remaining
#             }
# 
#         return Response(data)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        data = {
            "ok": True,
            "phone_number": user.phone_number,
            "full_name": user.full_name,
            "is_shop": user.is_shop,
            "shop_name": user.shop_name,
            "shop_address": user.shop_address,
        }

        if not user.is_shop:
            customer_shops = CustomerShop.objects.filter(customer=user)
            summary = Debt.objects.filter(
                customer__in=customer_shops
            ).aggregate(
                total_debt=Sum('amount'),
                total_paid=Sum('payments__amount')
            )
            total_debt = summary['total_debt'] or 0
            total_paid = summary['total_paid'] or 0

            data['debt_summary'] = {
                'total_debt': total_debt,
                'total_paid': total_paid,
                'total_remaining': total_debt - total_paid
            }

        return Response(data)
    

class MyShopsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_shop:
            return Response({
                "ok": False,
                "error": "شما یک فروشگاه هستید و نمی‌توانید فروشگاه‌ها را مشاهده کنید."
            }, status=status.HTTP_403_FORBIDDEN)
        
        customer_shops = CustomerShop.objects.filter(customer=request.user).select_related('shop')

        result = [
            {
                'shop_id': cs.shop.id,
                'shop_name': cs.shop.shop_name,
                'shop_address': cs.shop.shop_address,
            }
            for cs in customer_shops
        ]
        return Response({'ok': True, 'shops': result})




# class MyShopHistoryView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request, shop_id):
#         if request.user.is_shop:
#             return Response({'ok': False, 'error': 'این  برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)
# 
#         try:
#             customer_shop = CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
#         except CustomerShop.DoesNotExist:
#             return Response({'ok': False, 'error': 'شما در این فروشگاه ثبت نیستید'}, status=status.HTTP_404_NOT_FOUND)
# 
#         sales = Sale.objects.filter(shop_id=shop_id, customer=request.user).prefetch_related('items__product')
#         debts = Debt.objects.filter(shop_id=shop_id, customer=customer_shop)
# 
#         total_purchase = sum(
#             sum(item.price * item.quantity for item in sale.items.all())
#             for sale in sales
#         )
#         total_debt = sum(d.amount for d in debts)
#         total_paid = sum(d.paid_amount for d in debts)
#         total_remaining = total_debt - total_paid
# 
#         return Response({
#             'ok': True,
#             'summary': {
#                 'total_purchase': total_purchase,
#                 'total_debt': total_debt,
#                 'total_paid': total_paid,
#                 'total_remaining': total_remaining
#             },
#             'sales': SaleSerializer(sales, many=True).data,
#             'debts': DebtSerializer(debts, many=True).data
#         })

# under 

class MyShopHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            customer_shop = CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'شما در این فروشگاه ثبت نیستید'}, status=status.HTTP_404_NOT_FOUND)

        total_purchase = SaleItem.objects.filter(
            sale__shop_id=shop_id,
            sale__customer=request.user
        ).aggregate(
            total=Sum(ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()))
        )['total'] or 0

        debt_summary = Debt.objects.filter(
            shop_id=shop_id,
            customer=customer_shop
        ).aggregate(
            total_debt=Sum('amount'),
            total_paid=Sum('payments__amount')
        )
        total_debt = debt_summary['total_debt'] or 0
        total_paid = debt_summary['total_paid'] or 0

        sales = Sale.objects.filter(shop_id=shop_id, customer=request.user).prefetch_related('items__product')
        debts = Debt.objects.filter(shop_id=shop_id, customer=customer_shop).prefetch_related('payments')

        return Response({
            'ok': True,
            'summary': {
                'total_purchase': total_purchase,
                'total_debt': total_debt,
                'total_paid': total_paid,
                'total_remaining': total_debt - total_paid
            },
            'sales': SaleSerializer(sales, many=True).data,
            'debts': DebtSerializer(debts, many=True).data
        })
    
# class MeView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request):
#         if request.user.is_shop:
#             return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)
# 
#         customer_shops = CustomerShop.objects.filter(
#             customer=request.user
#         ).select_related('shop').annotate(
#             total_amount=Sum('debts__amount'),
#             total_paid=Sum('debts__payments__amount'),
#             number_of_debts=Count('debts')
#         )
# 
#         shops = [
#             {
#                 'shop_id': cs.shop.id,
#                 'shop_name': cs.shop.shop_name,
#                 'shop_address': cs.shop.shop_address,
#                 'total_amount': (cs.total_amount or 0) - (cs.total_paid or 0),
#                 'number_of_debts': cs.number_of_debts or 0
#             }
#             for cs in customer_shops
#         ]
# 
#         total_amount = sum(s['total_amount'] for s in shops)
#         total_debts = sum(s['number_of_debts'] for s in shops)
# 
#         return Response({
#             'ok': True,
#             'total_amount': total_amount,
#             'number_of_debts': total_debts,
#             'shops': shops
#         })

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این  برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        customer_shops = CustomerShop.objects.filter(
            customer=request.user
        ).select_related('shop').annotate(
            total_amount=Sum('debts__amount'),
            total_paid=Sum('debts__payments__amount'),
            open_debts=Count('debts'),
            last_purchase=Max('debts__sale__created_at')
        )

        shops = []
        total_paid_all = 0
        total_remaining_all = 0
        open_debts_all = 0

        for cs in customer_shops:
            total_amount = cs.total_amount or 0
            total_paid = cs.total_paid or 0
            remaining = total_amount - total_paid
            open_debts = cs.open_debts or 0
            settlement = int((total_paid / total_amount * 100)) if total_amount > 0 else 0

            total_paid_all += total_paid
            total_remaining_all += remaining
            open_debts_all += open_debts

            shops.append({
                'shop_id': cs.shop.id,
                'shop_name': cs.shop.shop_name,
                'shop_address': cs.shop.shop_address,
                'last_purchase': cs.last_purchase,
                'open_debts_count': open_debts,
                'total_paid': total_paid,
                'total_remaining': remaining,
                'settlement_percentage': settlement
            })

        return Response({
            'ok': True,
            'full_name': request.user.full_name,
            'summary': {
                'open_debts_count': open_debts_all,
                'number_of_shops': len(shops),
                'total_paid': total_paid_all,
                'total_remaining': total_remaining_all
            },
            'shops': shops
        })

class MyShopDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            cs = CustomerShop.objects.select_related('shop').annotate(
                total_amount=Sum('debts__amount'),
                total_paid=Sum('debts__payments__amount'),
                open_debts=Count('debts'),
                last_purchase=Max('debts__sale__created_at')
            ).get(shop_id=shop_id, customer=request.user)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'فروشگاه یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        total_amount = cs.total_amount or 0
        total_paid = cs.total_paid or 0
        remaining = total_amount - total_paid
        settlement = int((total_paid / total_amount * 100)) if total_amount > 0 else 0

        return Response({
            'ok': True,
            'shop': {
                'shop_id': cs.shop.id,
                'shop_name': cs.shop.shop_name,
                'shop_address': cs.shop.shop_address,
                'last_purchase': cs.last_purchase,
                'open_debts_count': cs.open_debts or 0,
                'total_paid': total_paid,
                'total_remaining': remaining,
                'settlement_percentage': settlement
            }
        })


class MyShopDebtsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            cs = CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'فروشگاه یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        debts = Debt.objects.filter(customer=cs).prefetch_related('payments')

        result = [
            {
                'id': d.id,
                'debt_id': d.debt_id,
                'total_amount': d.amount,
                'paid_amount': d.paid_amount,
                'remaining': d.remaining,
                'is_paid': d.is_paid,
                'created_at': d.created_at
            }
            for d in debts
        ]

        paginator = StandardPagination()
        page = paginator.paginate_queryset(result, request)
        return paginator.get_paginated_response(page)


# class MyShopSalesView(APIView):
#     permission_classes = [IsAuthenticated]
# 
#     def get(self, request, shop_id):
#         if request.user.is_shop:
#             return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)
# 
#         try:
#             CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
#         except CustomerShop.DoesNotExist:
#             return Response({'ok': False, 'error': 'فروشگاه یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
# 
#         sales = Sale.objects.filter(
#             shop_id=shop_id,
#             customer=request.user
#         ).annotate(
#             total=Sum(
#                 ExpressionWrapper(
#                     F('items__price') * F('items__quantity'),
#                     output_field=IntegerField()
#                 )
#             )
#         )
# 
#         result = [
#             {
#                 'id': s.id,
#                 'total': s.total or 0,
#                 'is_debt': s.is_debt,
#                 'created_at': s.created_at
#             }
#             for s in sales
#         ]
# 
#         paginator = StandardPagination()
#         page = paginator.paginate_queryset(result, request)
#         return paginator.get_paginated_response(page)
# under

class MyShopSalesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id, sale_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'فروشگاه یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        try:
            sale = Sale.objects.prefetch_related('items').get(
                id=sale_id, customer=request.user, shop_id=shop_id
            )
        except Sale.DoesNotExist:
            return Response({'ok': False, 'error': 'فروش یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        total = SaleItem.objects.filter(sale=sale).aggregate(
            total=Sum(ExpressionWrapper(F('price') * F('quantity'), output_field=IntegerField()))
        )['total'] or 0

        return Response({
            'ok': True,
            'sale': {
                'id': sale.id,
                'total': total,
                'is_debt': sale.is_debt,
                'created_at': sale.created_at,
                'items': [
                    {
                        'product_name': item.product_name,
                        'price': item.price,
                        'quantity': item.quantity
                    }
                    for item in sale.items.all()
                ]
            }
        })

class MyShopPaymentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            cs = CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'فروشگاه یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        from debts.models import Payment
        payments = Payment.objects.filter(
            debt__customer=cs
        ).select_related('debt')

        result = [
            {
                'id': p.id,
                'payment_id': p.payment_id,
                'debt_id': p.debt.debt_id,
                'amount': p.amount,
                'created_at': p.created_at
            }
            for p in payments
        ]

        paginator = StandardPagination()
        page = paginator.paginate_queryset(result, request)
        return paginator.get_paginated_response(page)

class MyShopDebtDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id, debt_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            cs = CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'فروشگاه یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        try:
            debt = Debt.objects.prefetch_related(
                'payments',
                'sale__items__product'
            ).get(debt_id=debt_id, customer=cs)
        except Debt.DoesNotExist:
            return Response({'ok': False, 'error': 'بدهی یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        items = []
        if debt.sale:
            items = [
                {
                    'product_name': item.product.name,
                    'quantity': item.quantity,
                    'price': item.price,
                    'total': item.price * item.quantity
                }
                for item in debt.sale.items.all()
            ]

        return Response({
            'ok': True,
            'debt': {
                'id': debt.id,
                'debt_id': debt.debt_id,
                'total_amount': debt.amount,
                'paid_amount': debt.paid_amount,
                'remaining': debt.remaining,
                'is_paid': debt.is_paid,
                'created_at': debt.created_at,
                'items': items,
                'payments': [
                    {
                        'id': p.id,
                        'payment_id': p.payment_id,
                        'amount': p.amount,
                        'created_at': p.created_at
                    }
                    for p in debt.payments.all()
                ]
            }
        })

class MyShopSaleDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id, sale_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            cs = CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'فروشگاه یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        try:
            sale = Sale.objects.prefetch_related('items__product').get(id=sale_id, customer=request.user, shop_id=shop_id)
        except Sale.DoesNotExist:
            return Response({'ok': False, 'error': 'فروش یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'ok': True,
            'sale': {
                'id': sale.id,
                'total': sum(item.price * item.quantity for item in sale.items.all()),
                'is_debt': sale.is_debt,
                'created_at': sale.created_at,
                'items': [
                    {
                        'product_name': item.product.name,
                        'price': item.price,
                        'quantity': item.quantity
                    }
                    for item in sale.items.all()
                ]
            }
        })

class MyShopPaymentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, shop_id, payment_id):
        if request.user.is_shop:
            return Response({'ok': False, 'error': 'این برای مشتریان است'}, status=status.HTTP_403_FORBIDDEN)

        try:
            cs = CustomerShop.objects.get(shop_id=shop_id, customer=request.user)
        except CustomerShop.DoesNotExist:
            return Response({'ok': False, 'error': 'فروشگاه یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        try:
            payment = Payment.objects.select_related('debt').get(
                payment_id=payment_id,
                debt__customer=cs
            )
        except Payment.DoesNotExist:
            return Response({'ok': False, 'error': 'پرداخت یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'ok': True,
            'payment': {
                'id': payment.id,
                'payment_id': payment.payment_id,
                'amount': payment.amount,
                'created_at': payment.created_at,
                'debt': {
                    'debt_id': payment.debt.debt_id,
                    'total_amount': payment.debt.amount,
                    'remaining': payment.debt.remaining
                }
            }
        })