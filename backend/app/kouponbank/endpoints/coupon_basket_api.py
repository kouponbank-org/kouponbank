from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.coupon import Coupon
from kouponbank.database.coupon_basket import (CouponBasket,
                                               CouponBasketSerializer)
from kouponbank.database.user import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class CouponBasketListAPI(APIView):
    @swagger_auto_schema(
        responses={200: CouponBasketSerializer(many=True)}
    )
    def get(self, request, user_id):
        user = self.__get_user(user_id)
        coupons = user.user_coupon_basket
        serializer = CouponBasketSerializer(coupons, many=True)
        return Response(serializer.data)
    def __get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404("User not found")

    @swagger_auto_schema(
        responses={200: CouponBasketSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "business key",
                openapi.IN_QUERY,
                description="Configures the business_id of the coupon that user downloads",
                type=openapi.TYPE_INTEGER,
                required=True
            ),
            openapi.Parameter(
                "business name",
                openapi.IN_QUERY,
                description="Configures the business name of the coupon that user downloads",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "coupon code",
                openapi.IN_QUERY,
                description="Configures the coupon code of the coupon that user downloads",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "coupon_title",
                openapi.IN_QUERY,
                description="Creates the description of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def post(self, request, user_id):
        user = self.__get_user(user_id)
        serializer = CouponBasketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                coupon_id=request.data["coupon_id"],
                user=user,
                business_key=request.data["business_key"]
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CouponBasketAPI(APIView):
    @swagger_auto_schema(
        responses={200: CouponBasketSerializer(many=True)},
    )
    def get(self, request, user_id, coupon_id):
        coupon = self.__get_coupon(coupon_id)
        serializer = CouponBasketSerializer(coupon)
        return Response(serializer.data)
    def __get_coupon(self, coupon_id):
        try:
            return CouponBasket.objects.get(pk=coupon_id)
        except CouponBasket.DoesNotExist:
            raise Http404("Coupon not found")

    @swagger_auto_schema(
        responses={200: CouponBasketSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "business key",
                openapi.IN_QUERY,
                description="Configures the business_id of the coupon",
                type=openapi.TYPE_INTEGER,
                required=True
            ),
            openapi.Parameter(
                "coupon title",
                openapi.IN_QUERY,
                description="Updates the coupon title of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Updates the description of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "coupon code",
                openapi.IN_QUERY,
                description="Updates the coupon code of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "coupon picture",
                openapi.IN_QUERY,
                description="Updates the coupon picture of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, user_id, coupon_id):
        coupon = self.__get_coupon(coupon_id)
        serializer = CouponBasketSerializer(coupon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: CouponBasketSerializer(many=True)}
    )
    def delete(self, request, user_id, coupon_id):
        coupon = self.__get_coupon(coupon_id)
        if coupon is None:
            raise Http404("Coupon not found")
        coupon.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
