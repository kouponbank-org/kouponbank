from database.api.viewsets import UserViewset
from rest_framework import routers
from database import views

router = routers.DefaultRouter()
router.register('users', UserViewset, basename='users')
