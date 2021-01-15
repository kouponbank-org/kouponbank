# pylint: disable=import-error
from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.user import User
from kouponbank.database.user_detail import UserDetail, UserDetailSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

class UserDetailAPI(APIView):
    @swagger_auto_schema(
        responses={200: UserDetailSerializer(many=True)},
    )
    # This allows us to get UserDetail @ /users/user_id(pk)/detail
    def get(self, request, user_id):
        user = self.__get_user(user_id)
        # related name = user_details (check user_detail.py)
        serializer = UserDetailSerializer(user.user_detail)
        return Response(serializer.data)
    def __get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404("User not found")
    def __get_user_detail(self, user_id):
        try:
            return UserDetail.objects.get(pk=user_id)
        except UserDetail.DoesNotExist:
            raise Http404("User details not found")

    @swagger_auto_schema(
        responses={200: UserDetailSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                'Name',
                openapi.IN_QUERY,
                description="Full name of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Gender',
                openapi.IN_QUERY,
                description="Gender of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Birthday',
                openapi.IN_QUERY,
                description="Birthday of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Address',
                openapi.IN_QUERY,
                description="Home address of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Picture',
                openapi.IN_QUERY,
                description="Profile picture of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, user_id):
        user_detail = self.__get_user_detail(user_id)
        serializer = UserDetailSerializer(user_detail, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)