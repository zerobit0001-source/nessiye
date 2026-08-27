from django.urls import path
from .views import ProductListCreateView, ProductDetailView, CategoryListCreateView, ModalView, DashboardView, GlobalSearchView

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('modal/', ModalView.as_view()),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('search/', GlobalSearchView.as_view(), name='global-search')
]