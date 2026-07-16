from django.db import models
from accounts.models import User

class Activity(models.Model):
    shop = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=20)
    entity = models.CharField(max_length=20)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    metadata = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Activities'
        ordering = ['-created_at']
