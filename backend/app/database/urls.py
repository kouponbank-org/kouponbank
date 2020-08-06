from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', views.UserView)

urlpatterns = [
    path('', include(router.urls)),
    path('', views.apiOverview, name='api_overview'),
    path('user-list/', views.user_list, name='user-list'),
    path('user-detail/<str:pk>/', views.user_detail, name='user-detail'),
    path('user-create/', views.user_create, name='user-create'),
    path('user-update/<str:pk>/', views.user_update, name='user-update'),
    path('user-delete/<str:pk>/', views.user_delete, name='user-delete'),
]