# pylint: disable=import-error
from django.http import Http404
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business
from kouponbank.database.table import Table, TableSerializer
from kouponbank.database.timeslot import Timeslot, TimeslotSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import numpy as np

## Individual timeslot for a table (Get, Put, Delete)
class TableTimeslotListAPI(APIView):
    def get (self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        times = table.table_timeslot
        serializer = TimeslotSerializer(times, many=True)
        return Response(serializer.data)
    def __get_table(self, table_id):
        try:
            return Table.objects.get(pk=table_id)
        except Table.DoesNotExist:
            raise Http404("Table cannot be found")

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

    def post(self, request, owner_id, business_id, table_id):
        table = self.__get_table(self, table_id)
        serializer = TimeslotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                table=table
                )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TableTimeslotAPI(APIView):
    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)},
    )
    def get (self, request, owner_id, business_id, table_id, timeslot_id):
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
    # FOR -> Put Request of Timeslot according to POST or DELETE Request from Reservation (update with replacement of 0s -> 1s for POST, 1s -> 0s for DELETE)
    # IF -> Return TimeslotSerializer 
    # ELSE -> Return Response BAD REQUEST
    def put(self, request, owner_id, business_id, table_id, timeslot_id, processed_time, create_or_delete):
        timeslot_original = self.__get_times(self, timeslot_id)
        times = timeslot_original.times
        replacement = np.ones(processed_time[1], dtype = str) if create_or_delete == True else np.zeros(processed_time[1], dtype = int).astype(str)
        times = '%s%s%s'%(times[:processed_time[0]],"".join(replacement),times[processed_time[0]+processed_time[1]:])
        timeslot_updated = {'times': times, 'date': timeslot_original.date}
        serializer = TimeslotSerializer(timeslot_original, data=timeslot_updated)
        if serializer.is_valid():
            return serializer
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, table_id, timeslot_id):
        times = self.__get_times(self, timeslot_id)
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