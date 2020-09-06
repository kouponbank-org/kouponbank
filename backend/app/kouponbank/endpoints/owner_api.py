from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.owner import Owner, OwnerSerializer
from kouponbank.database.owner_detail import OwnerDetail, OwnerDetailSerializer


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
            )
        ]
    )
    def post(self, request):
        serializer = OwnerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OwnerAPI(APIView):
    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)},
    )
    def get(self, request, pk):
        owner = self.__get_owner(pk)
        serializer = OwnerSerializer(owner)
        return Response(serializer.data)
    def __get_owner(self, pk):
        try:
            return Owner.objects.get(pk=pk)
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
            )
        ]
    )
    def put(self, request, pk):
        owner = self.__get_owner(pk)
        serializer = OwnerSerializer(owner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: OwnerSerializer(many=True)}
    )
    def delete(self, request, pk):
        user = self.__get_owner(pk)
        if user is None:
            raise Http404("Owner not found")
        user.delete()
        return
