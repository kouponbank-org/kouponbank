# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.owner import Owner, OwnerSerializer
from kouponbank.database.user import User, UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class LoginUserAPI(APIView):
    @swagger_auto_schema(
        responses={200: UserSerializer(many=True)},
        manual_parameters=
        [
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
            email=request.data['email'],
            password=request.data['password']
        )
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __login_user(self, email, password):
        try:
            return User.objects.get(
                email=email,
                password=password
            ) 
        except User.DoesNotExist:
            raise Http404("User Not Found")


class UsernameCheck(APIView):
    @swagger_auto_schema(
        responses={200: UserSerializer(many=True)},
    )
    def post(self, request):
        try: 
            User.objects.get(
                username=request.data['username']
            )
            # raise Http404("이미 존재하는 유저네임입니다.")
            return Response(data=False)
        except User.DoesNotExist:
            return Response(data=True)

        
class LoginOwnerAPI(APIView):
    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)},
        manual_parameters=
        [
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
            email=request.data['email'],
            password=request.data['password']
        )
        serializer = OwnerSerializer(owner, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __login_owner(self, email, password):
        try:
            return Owner.objects.get(
                email=email,
                password=password
            ) 
        except Owner.DoesNotExist:
            raise Http404("Owner Not Found")
