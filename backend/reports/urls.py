from django.urls import path
from .views import SalesReportView, DebtsReportView, PaymentsReportView, CustomersReportView, ProductsReportView

urlpatterns = [
    path('reports/sales/', SalesReportView.as_view()),
    path('reports/debts/', DebtsReportView.as_view()),
    path('reports/payments/', PaymentsReportView.as_view()),
    path('reports/customers/', CustomersReportView.as_view()),
    path('reports/products/', ProductsReportView.as_view()),
]