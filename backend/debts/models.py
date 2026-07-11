from django.db import models
from accounts.models import User
from sales.models import Sale, SaleItem
from customer_management.models import CustomerShop
import random

def generate_debt_id():
    return f"DB-{random.randint(100000, 999999)}"

def generate_payment_id():
    return f"PM-{random.randint(100000, 999999)}"

class Debt(models.Model):
    debt_id = models.CharField(max_length=20, unique=True, default=generate_debt_id, editable=False)
    shop = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shop_debts')
    customer = models.ForeignKey(CustomerShop, on_delete=models.CASCADE, related_name='debts')
    sale = models.OneToOneField(Sale, on_delete=models.CASCADE, related_name='debt', null=True, blank=True)
    amount = models.PositiveBigIntegerField()
    # paid_amount = models.PositiveBigIntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def paid_amount(self):
        return sum(p.amount for p in self.payments.all())

    @property
    def remaining(self):
        return self.amount - self.paid_amount

    @property
    def is_paid(self):
        return self.remaining <= 0

    def __str__(self):
        return f"Debt #{self.id} - {self.customer.customer.full_name} - {self.remaining}"
    

class Payment(models.Model):
    payment_id = models.CharField(max_length=20, unique=True, default=generate_payment_id, editable=False)
    debt = models.ForeignKey(Debt, on_delete=models.CASCADE, related_name='payments')
    amount = models.PositiveBigIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment #{self.id} - {self.amount}"