# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.menu import MenuSerializer
from kouponbank.database.order import Order, OrderSerializer
from kouponbank.database.reservation import Reservation
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


## List of all reservations for a table in a business owned by an owner (Get, Post)
class ReservationOrderAPI(APIView):
    @swagger_auto_schema(
        responses={200: OrderSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        serializer = OrderSerializer(reservation.reservation_order)
        return Response(serializer.data)
    def __get_reservation(self, reservation_id):
        try:
            return Reservation.objects.get(pk=reservation_id)
        except Reservation.DoesNotExist:
            raise Http404("Reservation cannot be found")

## List of all menus that are contained in the order (Get)
class OrderMenuListAPI(APIView):
    @swagger_auto_schema(
        responses={200: MenuSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id, table_id, reservation_id, order_id):
        order = self.__get_order(order_id)
        serializer = MenuSerializer(order.menus.all(), many=True)
        return Response(serializer.data)
    def __get_order(self, order_id):
        try:
            return Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            raise Http404("Order not found")
