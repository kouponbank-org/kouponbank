from database.models import User
from .serializers import UserSerializer

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

# Model Viewsets
class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
