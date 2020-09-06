from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.owner import Owner
from kouponbank.database.owner_detail import OwnerDetail, OwnerDetailSerializer


class OwnerDetailAPI(APIView):
    @swagger_auto_schema(
        responses={200: OwnerDetailSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                'name',
                openapi.IN_QUERY,
                description="Gets the name of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'location',
                openapi.IN_QUERY,
                description="Gets the location of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'picture',
                openapi.IN_QUERY,
                description="Gets the picture of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def get(self, request, pk):
        owner = self.__get_owner(pk)
        serializer = OwnerDetailSerializer(owner.owner_details)
        return Response(serializer.data)
    def __get_owner(self, pk):
        try:
            return Owner.objects.get(pk=pk)
        except Owner.DoesNotExist:
            raise Http404("Owner not found")
    def __get_owner_detail(self, pk):
        try:
            return OwnerDetail.objects.get(pk=pk)
        except OwnerDetail.DoesNotExist:
            raise Http404("Owner details not found")

    @swagger_auto_schema(
        responses={200: OwnerDetailSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                'name',
                openapi.IN_QUERY,
                description="Updates the name of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'location',
                openapi.IN_QUERY,
                description="Updates the location of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'picture',
                openapi.IN_QUERY,
                description="Updates the picture of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, pk):
        owner_detail = self.__get_owner_detail(pk)
        serializer = OwnerDetailSerializer(owner_detail, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
