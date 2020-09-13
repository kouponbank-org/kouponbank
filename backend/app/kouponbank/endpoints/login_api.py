from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from kouponbank.database.owner import Owner, OwnerSerializer
from kouponbank.database.user import User, UserSerializer


class LoginUserApi(APIView):
    @swagger_auto_schema(
        responses={200: UserSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "username",
                openapi.IN_QUERY,
                description="Username of the user to login",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "email",
                openapi.IN_QUERY,
                description="Email of the user to log in",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "password",
                openapi.IN_QUERY,
                description="Password of the user to log in",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def post(self, request):
        user = self.__login_user(
            username=request.data['username'],
            email=request.data['email'],
            password=request.data['password']
        )
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __login_user(self, username, email, password):
        try:
            return Owner.objects.get(
                username=username,
                email=email,
                password=password
            ) 
        except Owner.DoesNotExist:
            raise Http404("Owner Not Found")
        
class LoginOwnerApi(APIView):
    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "username",
                openapi.IN_QUERY,
                description="Username of the owner to login",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "email",
                openapi.IN_QUERY,
                description="Email of the owner to log in",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "password",
                openapi.IN_QUERY,
                description="Password of the owner to log in",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def post(self, request):
        owner = self.__login_owner(
            username=request.data['username'],
            email=request.data['email'],
            password=request.data['password']
        )
        serializer = OwnerSerializer(owner, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __login_owner(self, username, email, password):
        try:
            return Owner.objects.get(
                username=username,
                email=email,
                password=password
            ) 
        except Owner.DoesNotExist:
            raise Http404("Owner Not Found")
