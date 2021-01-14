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


class TableListAPI(APIView):
    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)}
    )
    def get(self, request, business_id):
        business = self.__get_business(business_id)
        tables = business.business_table
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

class TableAPI(APIView):
    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)},
    )
    def get(self, request, business_id, table_id):
        table = self.__get_table(table_id)
        serializer = TableSerializer(table)
        return Response(serializer.data)
    def __get_table(self, table_id):
        try:
            return Table.objects.get(pk=table_id)
        except Table.DoesNotExist:
            raise Http404("Table not found")

class BusinessTableListAPI(APIView):
    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)}
    )
    def get(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        tables = business.business_table
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business not found")

    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "table capacity",
                openapi.IN_QUERY,
                description="Creates the table capacity",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "table outlet",
                openapi.IN_QUERY,
                description="Creates if the table has an outlet",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "table near wall",
                openapi.IN_QUERY,
                description="Creates if the table is near wall",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def post(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        serializer = TableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(business=business)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BusinessTableAPI(APIView):
    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        serializer = TableSerializer(table)
        return Response(serializer.data)
    def __get_table(self, table_id):
        try:
            return Table.objects.get(pk=table_id)
        except Table.DoesNotExist:
            raise Http404("Table not found")

    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                "table title",
                openapi.IN_QUERY,
                description="Updates the table title of the table",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "description",
                openapi.IN_QUERY,
                description="Updates the description of the table",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                "table picture",
                openapi.IN_QUERY,
                description="Updates the table picture of the table",
                type=openapi.TYPE_STRING,
                required=True
            )
        ]
    )
    def put(self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        serializer = TableSerializer(table, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={200: TableSerializer(many=True)}
    )
    def delete(self, request, owner_id, business_id, table_id):
        table = self.__get_table(table_id)
        if table is None:
            raise Http404("Table not found")
        table.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TableBookingAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)}
    )

    def time_slot_to_regex(start_time, end_time):
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
        minute_duration_slots = int(end_minutes)/15 - int(start_minutes)/15
        total_duration = hour_duration_slots + minute_duration_slots
        regular_expression = r'^[01]{%d}1{%d}' % (slots_before_needed_time, total_duration)
        return regular_expression
    
    def post_booking (self, request, start_time, end_time):
        input_slots = time_slot_to_regex(start_time, end_time)
        timeslot = Timeslot.objects.filter(timslot__regex=input_slots)
        #filters timeslot and check if the input slots can be updated in timeslot
        serializer = TimeslotSerializer(timeslot, data=request.data)
        if timeslot is None:
            raise Http404("Not available time")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

