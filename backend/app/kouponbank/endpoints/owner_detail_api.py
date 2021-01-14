from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from kouponbank.database.owner import Owner
from kouponbank.database.owner_detail import OwnerDetail, OwnerDetailSerializer


class OwnerDetailAPI(APIView):
    @swagger_auto_schema(
        responses={200: OwnerDetailSerializer(many=True)},
    )
    def get(self, request, owner_id):
        owner = self.__get_owner(owner_id)
        serializer = OwnerDetailSerializer(owner.owner_detail)
        return Response(serializer.data)
    def __get_owner(self, owner_id):
        try:
            return Owner.objects.get(pk=owner_id)
        except Owner.DoesNotExist:
            raise Http404("Owner not found")

    @swagger_auto_schema(
        responses={200: OwnerDetailSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                'Name',
                openapi.IN_QUERY,
                description="Full name of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Gender',
                openapi.IN_QUERY,
                description="Gender of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Birthday',
                openapi.IN_QUERY,
                description="Birthday of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Address',
                openapi.IN_QUERY,
                description="Home address of the owner",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Picture',
                openapi.IN_QUERY,
                description="Profile picture of the owner",
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
    def __get_owner_detail(self, owner_id):
        try:
            return OwnerDetail.objects.get(pk=owner_id)
        except OwnerDetail.DoesNotExist:
            raise Http404("Owner detail not found")
