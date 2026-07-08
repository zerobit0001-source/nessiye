from django.contrib import admin
from .models import CustomerShop


@admin.register(CustomerShop)
class CustomerShopAdmin(admin.ModelAdmin):
    list_display = ['id', 'shop', 'customer', 'created_at']
    list_filter = ['shop']
    search_fields = ['shop__shop_name', 'customer__phone_number', 'customer__full_name']
    readonly_fields = ['created_at']