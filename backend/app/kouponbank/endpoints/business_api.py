# pylint: disable=import-error
from django.db.models import Q
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.address import Address, AddressSerializer
from kouponbank.database.business import Business, BusinessSerializer
from kouponbank.database.business_detail import (BusinessDetail,
                                                 BusinessDetailSerializer)
from kouponbank.database.owner import Owner
from kouponbank.database.owner_detail import OwnerDetail
from kouponbank.database.user import User
from pyproj import Transformer, transform
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from kouponbank.database.table import Table
from kouponbank.database.timeslot import Timeslot
from kouponbank.endpoints.table_booking import TableBooking


## List of all businesses owned by an owner (Get, Post)
class OwnerBusinessListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def get(self, request, owner_id):
        owner = self.__get_owner(owner_id)
        businesses = owner.owner_business
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data)
    def __get_owner(self, owner_id):
        try:
            return Owner.objects.get(pk=owner_id)
        except Owner.DoesNotExist:
            raise Http404("Owner not found")

    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Business Name",
                openapi.IN_QUERY,
                description="Name of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Business Number",
                openapi.IN_QUERY,
                description="Contact number of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Business Description",
                openapi.IN_QUERY,
                description="Description of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def post(self, request, owner_id):
        # TODO: Make this more optimized? or cleaner.
        business_owner = self.__get_owner(owner_id)
        business_serializer = BusinessSerializer(data=request.data["business"])
        business_detail_serializer = BusinessDetailSerializer(data=request.data["business_detail"])
        address_serializer = AddressSerializer(data=request.data["address"])
        if business_serializer.is_valid() and address_serializer.is_valid() and business_detail_serializer.is_valid():
            business_serializer.save(
                owner = business_owner,
            )
            business = self.__get_business(business_serializer.data["id"])
            entX, entY = self.transform_utmk_to_wgs84(request.data["address"]["entX"], request.data["address"]["entY"])
            address_serializer.save(
                id=business.id,
                business=business,
                entX = entX,
                entY = entY
            )
            business_detail_serializer.save(
                id=business.id,
                business=business,
            )
            return_serializer = BusinessSerializer(business)
            return Response(return_serializer.data, status=status.HTTP_201_CREATED)
        return Response(business_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")
    def transform_utmk_to_wgs84(self, x, y):
        transformer = Transformer.from_crs("+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
        entX, entY = transformer.transform(x, y)
        print(entX, entY)
        return entX, entY

## Individual Owner Business (Get, Put, Delete)
class OwnerBusinessAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        serializer = BusinessSerializer(business)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Business Name",
                openapi.IN_QUERY,
                description="Name of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Business Number",
                openapi.IN_QUERY,
                description="Contact number of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Business Description",
                openapi.IN_QUERY,
                description="Description of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        serializer = BusinessSerializer(business, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        if business is None:
            raise Http404("Specified business not found")
        business.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

## All Businesses (Get) 
class BusinessListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def get(self, request):
        businesses = Business.objects.all()
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data)

## Each Businesses (Get)
class BusinessAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def get(self, request, business_id):
        business = self.__get_business(business_id)
        serializer = BusinessSerializer(business)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

## All Businesses Within Map Bounds (Get)
class BusinessMapListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def get(self, request):
        minLat = request.query_params["minLat"]
        maxLat = request.query_params["maxLat"]
        minLng = request.query_params["minLng"]
        maxLng = request.query_params["maxLng"]
        # TODO: We need to optimize this filter query if possible.
        business = Business.objects.filter(
            address__entX__range=(minLng, maxLng),
            address__entY__range=(minLat, maxLat)
        )
        serializer = BusinessSerializer(business, many=True)
        return Response(serializer.data)

## All Non-verified Businesses (For us to sort out unverified businesses)
class UnverifiedBusinessListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)},
    )
    def get(self, request):
        business = Business.objects.filter(
            Q(business_verification__verified_business=False) |
            Q(business_verification__verified_owner=False) |
            Q(business_verification__verified_email=False)
        )
        serializer = BusinessSerializer(business, many=True)
        return Response(serializer.data)

class FilterSearchBusinessListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)},
    )
    def get(self, request):
        #add sggNm: "용인시 수지구"
        #siNm: "경기도" to model?
        tables = Table.objects.all()
        for table in tables:
            times_date_filtered_set = table.table_timeslot.filter(date=request.query_params['date'])
            time_validate=TableBooking.time_validate(TableBooking, times_date_filtered_set[0].times, request.query_params['start_time'], request.query_params['end_time'])
            print(time_validate)
            if time_validate != True:
                tables=Table.objects.exclude(id=table.id)
            #else return next available timeslot?
        print(tables)
        business = Business.objects.filter(
            Q(business_verification__verified_business=False) &
            Q(business_verification__verified_owner=False) &
            Q(business_verification__verified_email=False) &
            Q(business_table__table_capacity=request.query_params["guest"]) &
            Q(business_address__emdNm=request.query_params["emdNm"]) &
            Q(business_table__in=tables)
        )
        print(business)
        serializer = BusinessSerializer(business, many=True)
        return Response(serializer.data)