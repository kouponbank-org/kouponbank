# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.user import User, UserSerializer
from kouponbank.database.user_detail import UserDetail, UserDetailSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


## Returns a list of all users in the database (Get)
## Create a user in the database (Post)
class UserListAPI(APIView):
    @swagger_auto_schema(
        responses={200: UserSerializer(many=True)}
    )
    def get(self, request):
        # get all users and save to 'users'
        user = User.objects.all()
        # serialize each user item with the UserSerializer class
        serializer = UserSerializer(user, many=True)
        # return serialized data
        # {'id': 2, username: test, email: test, password: test}
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={200: UserSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "username",
                openapi.IN_QUERY,
                description="Creates the username of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "email",
                openapi.IN_QUERY,
                description="Creates the email of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "password",
                openapi.IN_QUERY,
                description="Creates the password of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def post(self, request):
        # using request data to send to UserSerialzer
        serializer = UserSerializer(data=request.data)
        # then check if the data is correct according to serializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

## Returns a user given an id of a user (Get)
## Updates a user information given an id of a user and returns it (Put)
## Deletes a user information given an id of a user (Delete)
class UserAPI(APIView):
    @swagger_auto_schema(
        responses={200: UserSerializer(many=True)},
    )
    def get(self, request, user_id):
        user = self.__get_user(user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    def __get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404("User not found")

    @swagger_auto_schema(
        responses={200: UserSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "username",
                openapi.IN_QUERY,
                description="Updates the username of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "email",
                openapi.IN_QUERY,
                description="Updates the email of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "password",
                openapi.IN_QUERY,
                description="Updates the password of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, user_id):
        #TODO: optimize this with Try/Except
        user = self.__get_user(user_id)
        if request.data.get("business_id") is not None:
            business_id = request.data["business_id"]
            business = self.__get_business(business_id)
            user.businesses.add(business)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

    @swagger_auto_schema(
        responses={200: UserSerializer(many=True)}
    )
    def delete(self, request, user_id):
        user = self.__get_user(user_id)
        if user is None:
            raise Http404("User not found")
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
