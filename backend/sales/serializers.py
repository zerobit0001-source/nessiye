from rest_framework import serializers
from .models import Sale, SaleItem
from products.models import Product


class SaleItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class SaleItemDetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = SaleItem
        fields = ['id', 'product_id', 'product_name', 'quantity', 'price']


class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemDetailSerializer(many=True, read_only=True)
    customer_name = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Sale
        fields = ['id', 'shop', 'customer', 'customer_name', 'is_debt', 'items', 'total', 'created_at']
        read_only_fields = ['shop', 'created_at']

    def get_customer_name(self, obj):
        return obj.customer.full_name if obj.customer else None

    def get_total(self, obj):
        if hasattr(obj, 'total_amount'):
            return obj.total_amount or 0
        return sum(item.price * item.quantity for item in obj.items.all())