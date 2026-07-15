from django.urls import path
from .views import DebtListView, DebtDetailView, DebtPayView, OverdueDebtsView, PaymentListView, CustomerDebtPayView

urlpatterns = [
    path('debts/', DebtListView.as_view()),
    path('debts/<int:pk>/', DebtDetailView.as_view()),
    path('debts/<int:pk>/pay/', DebtPayView.as_view()),
    path('debts/<str:debt_id>/customer_pay/', CustomerDebtPayView.as_view()),
    path('payments/', PaymentListView.as_view()),
    path('overdue/', OverdueDebtsView.as_view()),
]