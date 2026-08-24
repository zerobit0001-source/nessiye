from django.db import models
from accounts.models import User


class Notification(models.Model):
    ENTITY_CHOICES = [
        ('customer', 'customer'),
        ('debt', 'debt'),
        ('payment', 'payment'),
        ('product', 'product'),
    ]

    ACTION_CHOICES = [
        ('created', 'created'),
        ('updated', 'updated'),
        ('deleted', 'deleted'),
        ('paid', 'paid'),
        ('low_stock', 'low_stock'),
        ('out_of_stock', 'out_of_stock'),
    ]

    shop = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    entity = models.CharField(max_length=20, choices=ENTITY_CHOICES)
    entity_id = models.IntegerField(null=True, blank=True)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.shop} - {self.entity} - {self.action}"