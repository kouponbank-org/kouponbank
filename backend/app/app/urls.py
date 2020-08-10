from django.contrib import admin
from django.urls import path, include
from .router import router



urlpatterns = [
    #path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('', include('database.urls', namespace='kouponbank')),
    path('api/', include(router.urls)),
]
