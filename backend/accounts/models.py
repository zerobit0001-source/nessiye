from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from django.utils import timezone

class User(AbstractBaseUser):
    """Users Database"""
    phone_number = models.CharField(max_length=11, unique=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    is_shop = models.BooleanField(default=False)
    shop_name = models.CharField(max_length=255, blank=True, null=True)
    shop_address = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.phone_number
    
    # def get_all_permissions(self, obj=None):
    #     return set()
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    
    @property
    def is_staff(self):
        return self.is_admin
    

class OtpCode(models.Model):
    """Register and login otp codes"""
    phone_number = models.CharField(max_length=11)
    code = models.CharField(max_length=6)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    is_shop = models.BooleanField(default=False)
    shop_name = models.CharField(max_length=255, blank=True, null=True)
    shop_address = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def is_valid(self):
        now = timezone.now()
        return (now - self.created_at).total_seconds() < 120

    def __str__(self):
        return f"{self.phone_number} - {self.code}"
