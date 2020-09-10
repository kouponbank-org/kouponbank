from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.owner import Owner
from kouponbank.database.owner_detail import OwnerDetail, OwnerDetailSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


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
    def get(self, request, owner_id):
        owner = self.__get_owner(owner_id)
        serializer = OwnerDetailSerializer(owner.owner_details)
        return Response(serializer.data)
    def __get_owner(self, owner_id):
        try:
            return Owner.objects.get(pk=owner_id)
        except Owner.DoesNotExist:
            raise Http404("Owner not found")
    def __get_owner_detail(self, owner_id):
        try:
            return OwnerDetail.objects.get(pk=owner_id)
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
    def put(self, request, owner_id):
        owner_detail = self.__get_owner_detail(owner_id)
        serializer = OwnerDetailSerializer(owner_detail, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
