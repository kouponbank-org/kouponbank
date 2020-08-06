from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from .models import User
from .serializers import UserSerializer

#Api Overview Setup
@api_view(['GET'])
def apiOverview(request):
    #Adding URL Patterns
    api_urls = {
        'List': '/user-list',
        'Detail View': '/user-detail/<str:pk>/',
        'Create': '/user-create/',
        'Update': '/user-update/<str:pk>/',
        'Delete': '/user-delete/<str:pk>/',
    }
    return Response(api_urls)

#See List
@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True) #여러가지 object 리턴 가능
    return Response(serializer.data)

#See one object in detail
@api_view(['GET'])
def user_detail(request, pk):
    users = User.objects.get(id=pk)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

#Create
@api_view(['POST'])
def user_create(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


#Update
@api_view(['POST'])
def user_update(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user,data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

#Delete
@api_view(['DELETE'])
def user_delete(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response("성공적으로 삭제 되었습니다.")

#Viewsets package???? 
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer