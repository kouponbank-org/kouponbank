from kouponbank.endpoints.views import User, Owner
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', User, basename='users')
router.register('owners', Owner, basename='owners')
