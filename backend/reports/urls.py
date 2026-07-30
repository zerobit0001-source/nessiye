# from django.urls import path
# from .views import SalesReportView, DebtsReportView, PaymentsReportView, CustomersReportView, ProductsReportView
# 
# urlpatterns = [
#     path('reports/sales/', SalesReportView.as_view()),
#     path('reports/debts/', DebtsReportView.as_view()),
#     path('reports/payments/', PaymentsReportView.as_view()),
#     path('reports/customers/', CustomersReportView.as_view()),
#     path('reports/products/', ProductsReportView.as_view()),
# ]

from django.urls import path
from .views import ReportSummaryView, ReportChartsView, ReportCustomersView, ReportProductsView

urlpatterns = [
    path('reports/cards/', ReportSummaryView.as_view()),
    path('reports/charts/', ReportChartsView.as_view()),
    path('reports/customers/', ReportCustomersView.as_view()),
    path('reports/products/', ReportProductsView.as_view()),
]