# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from kouponbank.database.timeslot import Timeslot, TimeslotSerializer
from kouponbank.endpoints.timeslot_api import TableTimeslotListAPI, TableTimeslotAPI

from functools import reduce
import numpy as np
import math

class TableBookingAPI(APIView):
    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)}
    )

    #FOR: Process the times of reservation inputs
    #Return the list of information
    #1.How many slots of timeslot_string(length of 48) to skip (change starting slot)
    #2. How many slots to replace 0s to 1s (duration)
    def time_process(start_time, end_time):
        # times should be in HH:MM format
        start_hour, start_minutes = start_time.split(':')
        end_hour, end_minutes = end_time.split(':')

        # number of timeslots before the start time. ex) 9 am - 11am, we do not need first 18 time slots. 
        slots_before_start_time = int((int(start_hour)*2 + int(start_minutes)/30))

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
        total_duration = int(hour_duration_slots + minute_duration_slots)
        return [slots_before_start_time, total_duration]

    #FOR: Get the timeslot in string format from the reservation request information
    #Return the timeslot in a string format
    def time_slot_to_str(self, start_time, end_time):
        #Processed_time[0] = slots before the start time, Processed_time[1] = total duration of the reservation 
        processed_time = self.time_process(start_time, end_time)
        time_string = "000000000000000000000000000000000000000000000000"
        replacement = np.ones(processed_time[1], dtype = str)
        time_string = '%s%s%s'%(time_string[:processed_time[0]],"".join(replacement),time_string[processed_time[0] + processed_time[1]:])
        return time_string

    #FOR: Validate the timeslot if timeslot is full or not
    #Compare the slots that needed to be updated from reservation input times with existing timeslot of table
    #Return True if timeslot can be posted, else, return false.
    def time_validate(self, table_time, start_time, end_time):
        table_time = table_time
        processed_time = self.time_process(start_time, end_time)
        next_available_time_in_hours = self.next_available_time_in_hours(table_time, processed_time[0])
        return next_available_time_in_hours if "1" in table_time[processed_time[0]:processed_time[0]+processed_time[1]] else True

    #FOR: Replace the string of timeslot that already exists
    #If timeslot is available, call put request on timeslot_api's TableTimeslotAPI.put (PUT Request), after replacing the timeslot
    #If timeslot is full, return response bad.request
    def time_exists(self, request, owner_id, business_id, table_id, times_date_filtered_set, reservation_input):
        processed_time = self.time_process(reservation_input['start_time'], reservation_input['end_time'])
        #timeslot already exists
        time_validate=self.time_validate(self, times_date_filtered_set[0].times, reservation_input['start_time'], reservation_input['end_time'])
        if type(time_validate) is bool:
            #timeslot put request to create timeslot on the existing timeslot (indicated with True)
            return TableTimeslotAPI.put(TableTimeslotAPI, request, owner_id, business_id, table_id, times_date_filtered_set[0].id, processed_time, True)
        else:
            #timeslot is full
            raise serializers.ValidationError("Timeslot is full, nearest available starting hour: " + str(time_validate))
    
    def next_available_time_in_hours(table_time, slots_before_start_time):
        next_available_time = table_time[slots_before_start_time:].index(next(filter(lambda x: x!="1", table_time[slots_before_start_time:])))
        #next_available_time_in_hours = next_available_time * 0.5
        time_in_float = (next_available_time + slots_before_start_time) / 2
        hours = int(math.modf(time_in_float)[1])
        minutes = math.modf(time_in_float)[0]
        minutes = "30" if minutes == 0.5 else "00"
        time_in_str = str(hours) + ":" + minutes
        return time_in_str