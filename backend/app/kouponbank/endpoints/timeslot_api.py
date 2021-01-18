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
            raise Http404("Table cannot  befound")

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
        table = self.__get_table(table_id)
        serializer = TimeslotSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(table=table)
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
    def put(self, request, owner_id, business_id, table_id, timeslot_id):
        times = self.__get_times(timeslot_id)
        serializer = TimeslotSerializer(times, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, table_id, timeslot_id):
        times = self.__get_times(timeslot_id)
        if times is None:
            raise Http404("timeslot cannot be found")
        times.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TableBookingAPI(APIView):
    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)}
    )

    def get (self, request, start_time, end_time, date):
        # start_time=request.query_params["time"]
        # end_time=request.query_params["time"]
        # date=request.query_params["date"]
        # start_time="22:00"
        # end_time="23:00"
        # testing one: 3f599a92-1d2c-4ad7-96d5-25d0c88ca2d0
        # date="2020-01-15"
        input_slots = self.time_slot_to_regex(self, start_time, end_time)
        times = Timeslot.objects.filter(date=date, times__regex=input_slots)
        print(times)
        #filters timeslot and check if the input slots can be updated in timeslot
        serializer = TimeslotSerializer(times, many=True)
        #return Response(serializer.data)
        return times

    def time_slot_to_regex(self, start_time, end_time):
        # times should be in HH:MM format
        start_hour, start_minutes = start_time.split(':')
        end_hour, end_minutes = end_time.split(':')

        # number of timeslots that we can skip. ex) 9 am - 11am, we do not need first 18 time slots. 
        slots_before_needed_time = (int(start_hour)*2 + int(start_minutes)/30)

        # compute how many hours are between given times and find out # of slots
        hour_duration_slots = (int(end_hour) - int(start_hour)) * 2  # 2 slots in each hour

        # adjust # of slots according to minutes in provided times. 
        # e.g. 9:30 to 11:30
        # Looking at HOURS ONLY, we have 11-9=2 hour, which is 4 time slots, 
        # but we need to subtract 1 time slots, because we don't have full time 
        # of 9:00 to 10:00, but only from 9:30 to 10:00. So we subtract 30/30= 1 timeslot
        # Then, referring to MINUTES, add what is left from the incomplete hour of 11:30 time,
        # which is 30/30 minutes = 1 slot, ending up with total 4 timeslots
        minute_duration_slots = int(end_minutes)/30 - int(start_minutes)/30
        total_duration = hour_duration_slots + minute_duration_slots
        regular_expression = r'^[01]{%d}1{%d}' % (slots_before_needed_time, total_duration)
        return regular_expression