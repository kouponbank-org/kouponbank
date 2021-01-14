from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from pyproj import Transformer, transform

from kouponbank.database.address import Address, AddressSerializer
from kouponbank.database.business import Business

## Address of Each Business (Get, Put)
class OwnerBusinessAddressAPI(APIView):
    @swagger_auto_schema(
        responses={200: AddressSerializer(many=True)}
    )
    def get(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        address = business.business_address
        serializer = AddressSerializer(address, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

    @swagger_auto_schema(
        responses={200: AddressSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "roadAddr",
                openapi.IN_QUERY,
                description="roadAddress of the Business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "jibunAddr",
                openapi.IN_QUERY,
                description="jibunAddress of the Business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "zipNo",
                openapi.IN_QUERY,
                description="zipcode of the Business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "entX",
                openapi.IN_QUERY,
                description="X-coord of the Business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "entY",
                openapi.IN_QUERY,
                description="y-coord of the Business",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, owner_id, business_id):
        address = self.__get_address(business_id)
        serializer = AddressSerializer(address, data=request.data)
        entX, entY = self.transform_utmk_to_wgs84(request.data["entX"], request.data["entY"])
        if serializer.is_valid():
            serializer.save(
                entX = entX,
                entY = entY,
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_address(self, business_id):
        try:
            return Address.objects.get(pk=business_id)
        except Address.DoesNotExist:
            raise Http404("Address not found")
    def transform_utmk_to_wgs84(self, x, y):
        transformer = Transformer.from_crs("epsg:5178", "epsg:4326")
        entX, entY = transformer.transform(x, y)
        return entX, entY

class BusinessAddressAPI(APIView):
    @swagger_auto_schema(
        responses={200: AddressSerializer(many=True)}
    )
    def get(self, request, business_id):
        business = self.__get_business(business_id)
        address = business.business_address
        serializer = AddressSerializer(address, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")