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
from kouponbank.endpoints.timeslot_api import TableTimeslotListAPI, TableTimeslotAPI
from kouponbank.endpoints.table_booking import TableBooking

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

    # FOR -> Update the timeslot that already exists for reservation date of the table
    # IF -> Return true
    # ELSE -> Return the next_available_time_in_hours (dtype=string)
    # 1. get the reservation, order and menu data
    # 2. check if #1 information are valid
    # 2-1. If -> 3, ELSE -> return Response BAD REQUEST
    # 3. get table data
    # 4. translate reservation data to timeslot(dtype=str)
    # 5. Filter the timeslots to get only those matching with reservation date
    # 6. Define timeslot_serializer under condition if the timeslot for given date and table already exists or not
    # 6-1. IF -> timeslot serializer is processed and updated with TableBooking.time_exists function, 
    # 6-2. ELSE -> create new timesloe serializer from the reservation data
    # 7. check if #6 information (timeslot serializer) is valid
    # 7-1. If -> 8, ELSE -> return Response BAD REQUEST
    # 8. save serializer and so on
    def post(self, request, owner_id, business_id, table_id):
        #TODO: Optimize better, make it cleaner.
        # Current post requests creates reservation, order, and puts menus connected to order.
        reservation_data = request.data["reservation"]
        reservation_serializer = ReservationSerializer(data=reservation_data)
        order_serializer = OrderSerializer(data=request.data["order"])
        menus = request.data["menu"]
        #2
        if reservation_serializer.is_valid() and order_serializer.is_valid():
            table = self.__get_table(table_id)
            reservation_to_timeslot = TableBooking.time_slot_to_str(TableBooking, reservation_data['start_time'], reservation_data['end_time'])
            times_date_filtered_set = table.table_timeslot.filter(date=reservation_data['date'])
            #6
            if len(times_date_filtered_set) != 0:
                timeslot_serializer = TableBooking.time_exists(TableBooking, request, owner_id, business_id, table_id, times_date_filtered_set, reservation_data)
            else:
                timeslot = {'times': reservation_to_timeslot, 'date': reservation_data['date']}
                timeslot_serializer = TimeslotSerializer(data=timeslot)
            #7
            if timeslot_serializer.is_valid():
                business = self.__get_business(business_id)
                user = self.__get_user(request.data["user_id"])   
                timeslot_serializer.save(table=table)
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
                order_id = order_serializer.data["id"]
                order = self.__get_order(order_id)
                # adding menus to orders
                for menu_id in menus:
                    menu = Menu.objects.get(pk=menu_id)
                    order.menus.add(menu)
                response_data = {
                    "reservation": reservation_serializer.data,
                    "order": order_serializer.data,
                    "timeslot": timeslot_serializer.data,
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            return Response(reservation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
    #Need to update put request and delete
    def put(self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        reservation_serializer = ReservationSerializer(reservation, data=request.data)
        # and timeslot_serializer.is_valid()
        if reservation_serializer.is_valid():
            reservation_serializer.save()
            #timeslot_serializer.save()
            response_data = {
                "reservation": reservation_serializer.data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(reservation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    ## TODO: Need to talk about how to delete reservations and make sure that the timeslot is added back to the available times.
    @swagger_auto_schema(
        responses={200: ReservationSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        table = self.__get_table(table_id)
        if reservation is None:
            raise Http404("Reservation cannot be found")
        times_date_filtered_set = table.table_timeslot.filter(date=reservation.date)
        processed_time = TableBooking.time_process(reservation.start_time.strftime("%H:%M"), reservation.end_time.strftime("%H:%M"))
        reservation.delete()
        #Updating the timeslot with deletion
        TableTimeslotAPI.put(TableTimeslotAPI, request, owner_id, business_id, table_id, times_date_filtered_set[0].id, processed_time, False)
        return Response(status=status.HTTP_204_NO_CONTENT)