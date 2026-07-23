from django.urls import path

from .views import (
    MyShopDebtDetailView,
    RegisterView,
    RegisterVerifyCodeView,
    LoginView,
    SendOTPView,
    OTPLoginView,
    ProfileView,
    RefreshTokenView,
    MyShopsView,
    MyShopHistoryView,
    MeView,
    MyShopDebtsView,
    MyShopSalesView,
    MyShopDetailView,
    MyShopPaymentsView,
    MyShopSaleDetailView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("verify_register/", RegisterVerifyCodeView.as_view()),
    path("login/", LoginView.as_view()),
    path("send_otp/", SendOTPView.as_view()),
    path("login_otp/", OTPLoginView.as_view()),
    path("profile/", ProfileView.as_view()),
    path("refresh/", RefreshTokenView.as_view()),
    path('my_shops/', MyShopsView.as_view()),
    path('my_shops/<int:shop_id>/history/', MyShopHistoryView.as_view()),
    path('me/', MeView.as_view()),
    path('me/shops/<int:shop_id>/', MyShopDetailView.as_view()),
    path('me/shops/<int:shop_id>/debts/', MyShopDebtsView.as_view()),
    path('me/shops/<int:shop_id>/sales/', MyShopSalesView.as_view()),
    path('me/shops/<int:shop_id>/payments/', MyShopPaymentsView.as_view()),
    path('me/shops/<int:shop_id>/debts/<str:debt_id>/', MyShopDebtDetailView.as_view()),
    path('me/shops/<int:shop_id>/debts/sales/<int:sale_id>/', MyShopSaleDetailView.as_view()),
]