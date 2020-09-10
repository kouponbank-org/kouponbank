from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business, BusinessSerializer
from kouponbank.database.owner import Owner
from kouponbank.database.owner_detail import OwnerDetail
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class BusinessListAPI(APIView):
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
                description="Creates the business name of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Creates the description of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "location",
                openapi.IN_QUERY,
                description="Creates the location of the user",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def post(self, request, owner_id):
        serializer = BusinessSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BusinessAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id):
        print(owner_id)
        print(business_id)
        business = self.__get_owner_detail(owner_id)
        serializer = BusinessSerializer(business.businesses.objects.get(pk=business_id))
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")
    def __get_owner_detail(self, owner_id):
        try:
            return OwnerDetail.objects.get(pk=owner_id)
        except OwnerDetail.DoesNotExist:
            raise Http404("Owner not found")

    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "business name",
                openapi.IN_QUERY,
                description="Updates the business name of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Updates the description of the user",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "location",
                openapi.IN_QUERY,
                description="Updates the location of the user",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def put(self, request, business_id):
        business = self.__business_user(business_id)
        serializer = BusinessSerializer(business, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )
    def delete(self, request, business_id):
        business = self.__get_business(business_id)
        if business is None:
            raise Http404("Business not found")
        business.delete()
        return
