# pylint: disable=import-error
from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.table import Table, TableSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

## List of all tables in a business owned by an owner (Get, Post)
class BusinessTableListAPI(APIView):
    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)}
    )
    def get(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        tables = business.business_table
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Table Capacity",
                openapi.IN_QUERY,
                description="Number of seats available in a table",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Table Outlet",
                openapi.IN_QUERY,
                description="Checking if there is an outlet near the table",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Table Near Wall",
                openapi.IN_QUERY,
                description="Checking if the table is near a wall",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def post(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        serializer = TableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(business=business)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

## Individual table in a business owned by an owner (Get, Put, Delete)
class BusinessTableAPI(APIView):
    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        serializer = TableSerializer(table)
        return Response(serializer.data)
    def __get_table(self, table_id):
        try:
            return Table.objects.get(pk=table_id)
        except Table.DoesNotExist:
            raise Http404("Table cannot  befound")

    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Table Capacity",
                openapi.IN_QUERY,
                description="Number of seats available in a table",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Table Outlet",
                openapi.IN_QUERY,
                description="Checking if there is an outlet near the table",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Table Near Wall",
                openapi.IN_QUERY,
                description="Checking if the table is near a wall",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def put(self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        serializer = TableSerializer(table, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        if table is None:
            raise Http404("Table cannot be found")
        table.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

## List of all table in a business (Get)
class TableListAPI(APIView):
    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)}
    )
    def get(self, request, business_id):
        business = self.__get_business(business_id)
        tables = business.business_table
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")