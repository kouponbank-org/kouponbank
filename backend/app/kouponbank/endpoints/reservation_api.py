# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.menu import Menu
from kouponbank.database.order import Order, OrderSerializer
from kouponbank.database.reservation import Reservation, ReservationSerializer
from kouponbank.database.table import Table
from kouponbank.database.user import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from kouponbank.database.timeslot import Timeslot, TimeslotSerializer
from kouponbank.endpoints.timeslot_api import TableTimeslotListAPI
from kouponbank.endpoints.table_booking_api import TableBookingAPI

## List of all reservations for a table in a business owned by an owner (Get, Post)
class BusinessTableReservationListAPI(APIView):
    @swagger_auto_schema(
        responses={200: ReservationSerializer(many=True)}
    )
    def get(self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        reservations = table.table_reservation
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)
    def __get_table(self, table_id):
        try:
            return Table.objects.get(pk=table_id)
        except Table.DoesNotExist:
            raise Http404("Table not found")

    @swagger_auto_schema(
        responses={200: ReservationSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Start Time",
                openapi.IN_QUERY,
                description="Start time of the reservation",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "End Time",
                openapi.IN_QUERY,
                description="End Time of the reservation",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Date",
                openapi.IN_QUERY,
                description="Date of the reservation",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )

    def post(self, request, owner_id, business_id, table_id):
        #TODO: Optimize better, make it cleaner.
        # Current post requests creates reservation, order, and puts menus connected to order.
        table = self.__get_table(table_id)
        business = self.__get_business(business_id)
        user = self.__get_user(request.data["user_id"])

        #define reservation_input to convert reservation to timeslot as well
        reservation_input = request.data["reservation"]
        reservation_serializer = ReservationSerializer(data=reservation_input)
        order_serializer = OrderSerializer(data=request.data["order"])
        menus = request.data["menu"]

        #converts reservation info to timeslot
        reservation_to_timeslot = TableBookingAPI.time_slot_to_str(TableBookingAPI, reservation_input['start_time'], reservation_input['end_time'])
        timeslot = {'times': reservation_to_timeslot, 'date': reservation_input['date']}
        timeslot_serializer = TimeslotSerializer(data=timeslot)
        
        if reservation_serializer.is_valid() and order_serializer.is_valid() and timeslot_serializer.is_valid():
            reservation_serializer.save(
                table=table,
                business=business,
                user=user,
            )
            reservation = self.__get_reservation(reservation_serializer.data["id"])
            order_serializer.save(
                id=reservation.id,
                reservation=reservation,
            )
            # timeslot_serializer.save(
            #     id=reservation.id,
            #     reservation=reservation,
            # )
            order_id = order_serializer.data["id"]
            order = self.__get_order(order_id)
            # adding menus to orders
            for menu_id in menus:
                menu = Menu.objects.get(pk=menu_id)
                order.menus.add(menu)
            response_data = {
                "reservation": reservation_serializer.data,
                "order": order_serializer.data,
                # "timeslot": timeslot_serializer.data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(reservation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")
    def __get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404("User not found")
    def __get_table(self, table_id):
        try:
            return Table.objects.get(pk=table_id)
        except Table.DoesNotExist:
            raise Http404("Table not found")
    def __get_reservation(self, reservation_id):
        try:
            return Reservation.objects.get(pk=reservation_id)
        except Reservation.DoesNotExist:
            raise Http404("Reservation cannot be found")
    def __get_order(self, order_id):
        try:
            return Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            raise Http404("Order not found")

## Individual menu in a business owned by an owner (Get, Put, Delete)
class BusinessTableReservationAPI(APIView):
    @swagger_auto_schema(
        responses={200: ReservationSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data)
    def __get_reservation(self, reservation_id):
        try:
            return Reservation.objects.get(pk=reservation_id)
        except Reservation.DoesNotExist:
            raise Http404("Reservation cannot be found")
    # def __get_timeslot(self, timeslot_id):
    #     try:
    #         return Timeslot.objects.get(pk=timeslot_id)
    #     except Timeslot.DoesNotExist:
    #         raise Http404("Timeslot not found")

    @swagger_auto_schema(
        responses={200: ReservationSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Start Time",
                openapi.IN_QUERY,
                description="Start time of the reservation",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "End Time",
                openapi.IN_QUERY,
                description="End Time of the reservation",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Date",
                openapi.IN_QUERY,
                description="Date of the reservation",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        reservation_serializer = ReservationSerializer(reservation, data=request.data)
        # timeslot = self.__get_timeslot(reservation_id)
        # #define reservation_input to convert reservation to timeslot as well
        # reservation_input = request.data
        # print(reservation_input)
        
        # #converts reservation info to timeslot
        # reservation_to_timeslot = TableBookingAPI.time_slot_to_str(TableBookingAPI, reservation_input['start_time'], reservation_input['end_time'])
        # timeslot_input = {'times': reservation_to_timeslot, 'date': reservation_input['date']}
        # timeslot_serializer = TimeslotSerializer(timeslot, data=timeslot_input)
        # and timeslot_serializer.is_valid()
        if reservation_serializer.is_valid():
            reservation_serializer.save()
            timeslot_serializer.save()
            response_data = {
                "reservation": reservation_serializer.data,
                "timeslot": timeslot_serializer.data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(reservation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    ## TODO: Need to talk about how to delete reservations and make sure that the timeslot is added back to the available times.
    @swagger_auto_schema(
        responses={200: ReservationSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        if reservation is None:
            raise Http404("Reservation cannot be found")
        ## Some code here
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)