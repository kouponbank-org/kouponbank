from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.table import Table
from kouponbank.database.timeslot import Timeslot, TimeslotSerializer
from kouponbank.endpoints.timeslot_api import TableBookingAPI
from kouponbank.database.reservation import Reservation, ReservationSerializer
from kouponbank.database.user import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

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
        ]
    )
    def post(self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        business = self.__get_business(business_id)
        # user = self.__get_user(request.data["user_id"])
        user = self.__get_user("dcf42c5d-7697-4dce-9588-66ef9d4b7872")
        serializer = ReservationSerializer(data=request.data)
        get_timeslot = TableBookingAPI.get(TableBookingAPI, request, request.data["start_time"], request.data["end_time"])
        if serializer.is_valid() and len(get_timeslot)==0:
            serializer.save(
                table=table,
                business=business,
                user=user,
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
            raise Http404("Reservation cannot  befound")

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
        ]
    )
    def put(self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        serializer = ReservationSerializer(reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
