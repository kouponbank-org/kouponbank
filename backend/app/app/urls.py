from django.contrib import admin
from django.urls import path, include
from .router import router


#URL Directory
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
