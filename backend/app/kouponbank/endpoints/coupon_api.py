from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from kouponbank.database.business import Business, BusinessSerializer
from kouponbank.database.coupon import Coupon, CouponSerializer


class CouponListAPI(APIView):
    @swagger_auto_schema(
        responses={200: CouponSerializer(many=True)}
    )
    def get(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        coupons = business.business_coupon
        serializer = CouponSerializer(coupon, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

    @swagger_auto_schema(
        responses={200: CouponSerializer(many=True)},
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
                description="Creates the coupon title of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Creates the description of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "coupon code",
                openapi.IN_QUERY,
                description="Creates the coupon code of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "coupon picture",
                openapi.IN_QUERY,
                description="Creates the coupon picture of the coupon",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def post(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        serializer = CouponSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(business=business)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CouponAPI(APIView):
    @swagger_auto_schema(
        responses={200: CouponSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id, coupon_id):
        coupon = self.__get_coupon(coupon_id)
        serializer = CouponSerializer(coupon)
        return Response(serializer.data)
    def __get_coupon(self, coupon_id):
        try:
            return Coupon.objects.get(pk=coupon_id)
        except Coupon.DoesNotExist:
            raise Http404("Coupon not found")

    @swagger_auto_schema(
        responses={200: CouponSerializer(many=True)},
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
    def put(self, request, owner_id, business_id, coupon_id):
        coupon = self.__get_coupon(coupon_id)
        serializer = CouponSerializer(coupon, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: CouponSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, coupon_id):
        coupon = self.__get_coupon(coupon_id)
        if coupon is None:
            raise Http404("Coupon not found")
        coupon.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
