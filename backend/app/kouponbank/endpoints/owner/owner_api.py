# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.owner import Owner, OwnerSerializer
from kouponbank.database.owner_detail import OwnerDetailSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class OwnerListAPI(APIView):
    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)}
    )
    def get(self, request):
        owner = Owner.objects.all()
        serializer = OwnerSerializer(owner, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "username",
                openapi.IN_QUERY,
                description="Creates the username of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "email",
                openapi.IN_QUERY,
                description="Creates the email of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "password",
                openapi.IN_QUERY,
                description="Creates the password of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def post(self, request):
        owner_serializer = OwnerSerializer(data=request.data["owner"])
        owner_detail_serializer = OwnerDetailSerializer(data=request.data["owner_detail"])
        if owner_serializer.is_valid() and owner_detail_serializer.is_valid():
            owner_serializer.save()
            owner = self.__get_owner(owner_serializer.data["id"])
            owner_detail_serializer.save(
                id=owner.id,
                owner=owner,
            )
            return_serializer = OwnerSerializer(owner)
            return Response(return_serializer.data, status=status.HTTP_201_CREATED)
        return Response(owner_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_owner(self, owner_id):
        try:
            return Owner.objects.get(pk=owner_id)
        except Owner.DoesNotExist:
            raise Http404("Owner not found")

class OwnerAPI(APIView):
    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)},
    )
    def get(self, request, owner_id):
        owner = self.__get_owner(owner_id)
        serializer = OwnerSerializer(owner)
        return Response(serializer.data)
    def __get_owner(self, owner_id):
        try:
            return Owner.objects.get(pk=owner_id)
        except Owner.DoesNotExist:
            raise Http404("Owner not found")

    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "username",
                openapi.IN_QUERY,
                description="Updates the username of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "email",
                openapi.IN_QUERY,
                description="Updates the email of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "password",
                openapi.IN_QUERY,
                description="Updates the password of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, owner_id):
        owner = self.__get_owner(owner_id)
        serializer = OwnerSerializer(owner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)}
    )
    def delete(self, request, owner_id):
        user = self.__get_owner(owner_id)
        if user is None:
            raise Http404("Owner not found")
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
