from django.db import models
from accounts.models import User
from django.utils import timezone


class Category(models.Model):
    """Product categories"""
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Categories'
    
class Product(models.Model):
    """Product > products items"""
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    shop = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    barcode = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    buy_price = models.PositiveBigIntegerField()
    sell_price = models.PositiveBigIntegerField()
    stock = models.PositiveIntegerField(default=0)
    exp_date = models.DateField(blank=True, null=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def __str__(self):
        return self.name
    
