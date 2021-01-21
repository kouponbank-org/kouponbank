# pylint: disable=import-error
from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.reservation import Reservation
from kouponbank.database.timeslot import Timeslot, TimeslotSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

## Individual timeslot for a table (Get, Put, Delete)
class TableTimeslotListAPI(APIView):
    def get (self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        times = reservation.reservation_timeslot
        serializer = TimeslotSerializer(times, many=True)
        return Response(serializer.data)
    def __get_reservation(self, reservation_id):
        try:
            return Reservation.objects.get(pk=reservation_id)
        except Reservation.DoesNotExist:
            raise Http404("Reservation cannot be found")

    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Times",
                openapi.IN_QUERY,
                description="timeslot in a string form",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Date",
                openapi.IN_QUERY,
                description="Date",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def post(self, request, owner_id, business_id, table_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        serializer = TimeslotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(reservation=reservation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TableTimeslotAPI(APIView):
    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)},
    )
    def get (self, request, owner_id, business_id, table_id, reservation_id, timeslot_id):
        times = self.__get_times(timeslot_id)
        serializer = TimeslotSerializer(times)
        return Response(serializer.data)
    def __get_times(self, timeslot_id):
        try:
            return Timeslot.objects.get(pk=timeslot_id)
        except Timeslot.DoesNotExist:
            raise Http404("Timeslot cannot  befound")

    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "Times",
                openapi.IN_QUERY,
                description="timeslot in a string form",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "Date",
                openapi.IN_QUERY,
                description="Date",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def put(self, request, owner_id, business_id, table_id, reservation_id, timeslot_id):
        times = self.__get_times(timeslot_id)
        serializer = TimeslotSerializer(times, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, table_id, reservation_id, timeslot_id):
        times = self.__get_times(timeslot_id)
        if times is None:
            raise Http404("timeslot cannot be found")
        times.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

## All Timeslots (Get) 
class TimeslotListAPI(APIView):
    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)}
    )
    def get(self, request):
        timeslots = Timeslot.objects.all()
        serializer = TimeslotSerializer(timeslots, many=True)
        return Response(serializer.data)