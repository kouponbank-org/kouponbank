from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.business_map import BusinessMap, BusinessMapSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class BusinessMapListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessMapSerializer(many=True)}
    )
    def get(self, request):
        minLat = request.query_params["minLat"]
        maxLat = request.query_params["maxLat"]
        minLng = request.query_params["minLng"]
        maxLng = request.query_params["maxLng"]
        business_map = BusinessMap.objects.filter(
            x__range=(minLng, maxLng)
        ).filter(
            y__range=(minLat, maxLat)
        )
        serializer = BusinessMapSerializer(business_map, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={200: BusinessMapSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "business name",
                openapi.IN_QUERY,
                description="Adds the business into the map database",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "doromyeong",
                openapi.IN_QUERY,
                description="Adds the doromyeong of the business into the database",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "jibeon",
                openapi.IN_QUERY,
                description="Adds the jibeon of the business into the database",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "postal_code",
                openapi.IN_QUERY,
                description="Adds the postal_code of the business into the database",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "lat",
                openapi.IN_QUERY,
                description="Adds the latitude of the business into the database",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "lng",
                openapi.IN_QUERY,
                description="Adds the longitude of the business into the database",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )

    def post(self, request):
        business = self.__get_business(request.data["id"])
        serializer = BusinessMapSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                id=request.data["id"],
                business=business
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

class BusinessMapAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessMapSerializer(many=True)},
    )
    def get(self, request, business_id):
        business_map = self.__get_business_map(business_id)
        serializer = BusinessMapSerializer(business_map)
        return Response(serializer.data)
    def __get_business_map(self, business_id):
        try:
            return BusinessMap.objects.get(pk=business_id)
        except BusinessMap.DoesNotExist:
            raise Http404("Business location not found")

    def put(self, request, business_id):
        business_map = self.__get_business_map(business_id)
        serializer = BusinessMapSerializer(business_map, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

