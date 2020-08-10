from database.api.viewsets import UserViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', UserViewset, basename='users')

#for url in router.urls:
#    print(url, '\n')