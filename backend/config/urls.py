from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('silk/', include('silk.urls', namespace='silk')),
    path('api/accounts/', include('accounts.urls')),
    path('api/', include('products.urls')),
    path('api/', include('customer_management.urls')),
    path('api/', include('sales.urls')),
    path('api/', include('debts.urls')),
    path('api/', include('reports.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


