from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .api import viewsets
from . import views
from app.router import router
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register('users', viewsets.UserViewset, basename='users')

app_name = 'kouponbank'

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:id>/', views.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)