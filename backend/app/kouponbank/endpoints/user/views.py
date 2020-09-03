from kouponbank.database.user import User, UserSerializer
from django.urls import path

from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.views import APIView

# Generic Viewsets로 하는게 더 좋을수도 있을것 같은데
# 한번 다른 블로거들이 어떻게 했는지 봐야할듯.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class User(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

