# pylint: disable=import-error
from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.menu import Menu, MenuSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

## List of all menus in a business owned by an owner (Get, Post)
class BusinessMenuListAPI(APIView):
    @swagger_auto_schema(
        responses={200: MenuSerializer(many=True)}
    )
    def get(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        menus = business.business_menu
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

    @swagger_auto_schema(
        responses={200: MenuSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Menu Title",
                openapi.IN_QUERY,
                description="Name of the menu item",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Menu Description",
                openapi.IN_QUERY,
                description="Description of the menu item",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Menu Price",
                openapi.IN_QUERY,
                description="Price of the menu item",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Menu Picture",
                openapi.IN_QUERY,
                description="Picture of the menu item",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def post(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        serializer = MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(business=business)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

## Individual menu in a business owned by an owner (Get, Put, Delete)
class BusinessMenuAPI(APIView):
    @swagger_auto_schema(
        responses={200: MenuSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id, menu_id):
        menu = self.__get_menu(menu_id)
        serializer = MenuSerializer(menu)
        return Response(serializer.data)
    def __get_menu(self, menu_id):
        try:
            return Menu.objects.get(pk=menu_id)
        except Menu.DoesNotExist:
            raise Http404("Menu not found")

    @swagger_auto_schema(
        responses={200: MenuSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Menu Title",
                openapi.IN_QUERY,
                description="Name of the menu item",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Menu Description",
                openapi.IN_QUERY,
                description="Description of the menu item",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Menu Price",
                openapi.IN_QUERY,
                description="Price of the menu item",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Menu Picture",
                openapi.IN_QUERY,
                description="Picture of the menu item",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def put(self, request, owner_id, business_id, menu_id):
        menu = self.__get_menu(menu_id)
        serializer = MenuSerializer(menu, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: MenuSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, menu_id):
        menu = self.__get_menu(menu_id)
        if menu is None:
            raise Http404("Menu not found")
        menu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

## List of all menus in a business (Get)
class MenuListAPI(APIView):
    @swagger_auto_schema(
        responses={200: MenuSerializer(many=True)}
    )
    def get(self, request, business_id):
        business = self.__get_business(business_id)
        menus = business.business_menu
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")