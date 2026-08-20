from rest_framework import serializers
from .models import Debt, Payment
from sales.serializers import SaleItemDetailSerializer




class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'created_at']


class DebtSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    items = SaleItemDetailSerializer(source = 'sale.items', many=True, read_only=True)
    remaining = serializers.SerializerMethodField()
    is_paid = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()
    customer_phone = serializers.SerializerMethodField()
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = Debt
        fields = [
            'id', 'customer', 'customer_name', 'customer_phone', 'sale', 'items',
            'amount', 'paid_amount', 'remaining', 'is_paid',
            'payments', 'description', 'created_at'
        ]
        read_only_fields = ['shop', 'created_at']

    def get_customer(seld, obj):
        if not obj.customer:
            return None
        return {
            'id': obj.customer.customer.id,
            'full_name': obj.customer.customer.full_name,
            'phone_number': obj.customer.customer.phone_number,
        }

    def get_remaining(self, obj):
        return obj.remaining

    def get_is_paid(self, obj):
        return obj.is_paid
    
    def get_paid_amount(self, obj):
        return obj.paid_amount

    def get_customer_name(self, obj):
        return obj.customer.customer.full_name if obj.customer else None

    def get_customer_phone(self, obj):
        return obj.customer.customer.phone_number if obj.customer else None