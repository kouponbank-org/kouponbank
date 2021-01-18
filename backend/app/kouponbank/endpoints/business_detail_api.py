# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from kouponbank.database.business import Business
from kouponbank.database.business_detail import BusinessDetail, BusinessDetailSerializer

## Individual Owner Business Detail (Get, Put)
class OwnerBusinessDetailAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessDetailSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        serializer = BusinessDetailSerializer(business.business_detail)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business cannot be found")
        

    @swagger_auto_schema(
        responses={200: BusinessDetailSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                'Business Email',
                openapi.IN_QUERY,
                description="Email of the Business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Business Wifi',
                openapi.IN_QUERY,
                description="Wifi of the Business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Business Picture',
                openapi.IN_QUERY,
                description="Picture of the Business",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, owner_id, business_id):
        business_detail = self.__get_business_detail(business_id)
        serializer = BusinessDetailSerializer(business_detail, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_business_detail(self, business_id):
        try:
            return BusinessDetail.objects.get(pk=business_id)
        except BusinessDetail.DoesNotExist:
            raise Http404("Business Detail not found")

## Individual Business Detail (Get, Put, Delete)
class BusinessDetailAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessDetailSerializer(many=True)},
    )
    def get(self, request, business_id):
        business = self.__get_business(business_id)
        business_detail = business.business_detail
        serializer = BusinessDetailSerializer(business_detail, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business cannot be found")