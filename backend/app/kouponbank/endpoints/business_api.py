from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business, BusinessSerializer
from kouponbank.database.owner import Owner
from kouponbank.database.owner_detail import OwnerDetail
from pyproj import Transformer, transform
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class OwnerBusinessListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def get(self, request, owner_id):
        owner = self.__get_owner(owner_id)
        businesses = owner.owner_details.business
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
                "business name",
                openapi.IN_QUERY,
                description="Creates the business name of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "business email",
                openapi.IN_QUERY,
                description="Creates the business email of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Creates the description of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "address",
                openapi.IN_QUERY,
                description="Creates the address of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "business picture",
                openapi.IN_QUERY,
                description="Creates the business picture of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def post(self, request, owner_id):
        business_owner = self.__get_owner_detail(owner_id)
        serializer = BusinessSerializer(data=request.data)
        entX, entY = self.transform_utmk_to_wgs84(request.data["entX"], request.data["entY"])
        if serializer.is_valid():
            # This business_owner=business_owner is important in linking the urls
            serializer.save(
                verified_business = True,
                business_owner = business_owner,
                entX = entX,
                entY = entY
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_owner_detail(self, owner_id):
        try:
            return OwnerDetail.objects.get(pk=owner_id)
        except OwnerDetail.DoesNotExist:
            raise Http404("ownerDetail not found")
    def transform_utmk_to_wgs84(self, x, y):
        transformer = Transformer.from_crs("+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")
        entX, entY = transformer.transform(x, y)
        print(entX, entY)
        return entX, entY

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
                "business name",
                openapi.IN_QUERY,
                description="Updates the business name of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "business email",
                openapi.IN_QUERY,
                description="Updates the business email of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Updates the description of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "address",
                openapi.IN_QUERY,
                description="Updates the address of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "business picture",
                openapi.IN_QUERY,
                description="Updates the business picture of the business",
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
            raise Http404("Business not found")
        business.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class BusinessListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def get(self, request):
        businesses = Business.objects.filter(verified_business=True)
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BusinessSerializer(data=request.data)
        entX, entY = self.transform_utmk_to_wgs84(request.data["entX"], request.data["entY"])
        if serializer.is_valid():
            serializer.save(
                entX = entX,
                entY = entY
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def transform_utmk_to_wgs84(self, x, y):
        transformer = Transformer.from_crs("epsg:5178", "epsg:4326")
        entX, entY = transformer.transform(x, y)
        return entX, entY

class BusinessAPI(APIView):
    def get(self, request, business_id):
        business = self.__get_business(business_id)
        serializer = BusinessSerializer(business)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

    def put(self, request, business_id):
        owner_id = request.data["owner_id"]
        del request.data["owner_id"]

        business_owner = self.__get_owner_detail(owner_id)
        business = self.__get_business(business_id)

        serializer = BusinessSerializer(business, data=request.data)
        if serializer.is_valid():
            serializer.save(
                verified_business=True,
                business_owner=business_owner,
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_owner_detail(self, owner_id):
        try:
            return OwnerDetail.objects.get(pk=owner_id)
        except OwnerDetail.DoesNotExist:
            raise Http404("ownerDetail not found")

class BusinessMapListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def get(self, request):
        minLat = request.query_params["minLat"]
        maxLat = request.query_params["maxLat"]
        minLng = request.query_params["minLng"]
        maxLng = request.query_params["maxLng"]
        business = Business.objects.filter(
            verified_business=True,
            entX__range=(minLng, maxLng),
            entY__range=(minLat, maxLat),
        )
        serializer = BusinessSerializer(business, many=True)
        return Response(serializer.data)

class BusinessSearchListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def get(self, request):
        char = request.query_params["char"]
        business = Business.objects.filter(
            verified_business=True,
            business_name__startswith=char,
        )[:10]
        serializer = BusinessSerializer(business, many=True)
        return Response(serializer.data)
