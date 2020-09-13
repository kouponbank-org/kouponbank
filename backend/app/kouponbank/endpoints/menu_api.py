from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from kouponbank.database.business import Business
from kouponbank.database.menu import Menu, MenuSerializer


class MenuListAPI(APIView):
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
                "menu title",
                openapi.IN_QUERY,
                description="Creates the menu title of the menu",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Creates the description of the menu",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "menu picture",
                openapi.IN_QUERY,
                description="Creates the menu picture of the menu",
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

class MenuAPI(APIView):
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
                "menu title",
                openapi.IN_QUERY,
                description="Updates the menu title of the menu",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Updates the description of the menu",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "menu picture",
                openapi.IN_QUERY,
                description="Updates the menu picture of the menu",
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
