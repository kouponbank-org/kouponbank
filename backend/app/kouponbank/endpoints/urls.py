from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.User.as_view(), name='user'),
    path('owners/', views.OwnerList.as_view(), name='owner-list'),
    path('owners/<int:pk>/', views.Owner.as_view(), name='owner'),
]

app_name = 'users'