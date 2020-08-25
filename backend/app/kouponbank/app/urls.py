from django.contrib import admin
from django.urls import path, include
from kouponbank.endpoints import views

from .router import router
from . import views

#URL Directory
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.api_root),
    path('', include('kouponbank.endpoints.urls', namespace='users' and 'owners')),
]
