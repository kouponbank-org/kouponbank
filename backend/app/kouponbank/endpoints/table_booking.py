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

class TableBooking():
    # FOR -> calculate # of slots before starting time and total duration from reservation data
    # return list of slots before starting time and total duration
    def time_process(start_time, end_time):
        # times should be in HH:MM format
        start_hour, start_minutes = start_time.split(':')
        end_hour, end_minutes = end_time.split(':')
        slots_before_start_time = int((int(start_hour)*2 + int(start_minutes)/30))
        hour_duration_slots = (int(end_hour) - int(start_hour)) * 2  # 2 slots in each hour
        minute_duration_slots = int(end_minutes)/30 - int(start_minutes)/30
        total_duration = int(hour_duration_slots + minute_duration_slots)
        return [slots_before_start_time, total_duration]

    # FOR -> Translate the reservation data to the string timeslot
    # Return the timeslot (dtype=string)
    def time_slot_to_str(self, start_time, end_time):
        #Processed_time[0] = slots before the start time, Processed_time[1] = total duration of the reservation 
        processed_time = self.time_process(start_time, end_time)
        time_string = "000000000000000000000000000000000000000000000000"
        replacement = np.ones(processed_time[1], dtype = str)
        time_string = '%s%s%s'%(time_string[:processed_time[0]],"".join(replacement),time_string[processed_time[0] + processed_time[1]:])
        return time_string

    # FOR -> Validate the timeslot if timeslot is full or not
    # IF -> Return true
    # ELSE -> Return the next_available_time_in_hours (dtype=string)
    def time_validate(self, table_time, start_time, end_time):
        processed_time = self.time_process(start_time, end_time)
        next_available_time_in_hours = self.next_available_time_in_hours(table_time, processed_time[0])
        return next_available_time_in_hours if "1" in table_time[processed_time[0]:processed_time[0]+processed_time[1]] else True

    # FOR -> Update the timeslot that already exists for reservation date of the table
    # IF -> Return true
    # ELSE -> Return the next_available_time_in_hours (dtype=string)
    def time_exists(self, request, owner_id, business_id, table_id, times_date_filtered_set, reservation_data):
        processed_time = self.time_process(reservation_data['start_time'], reservation_data['end_time'])
        time_validate=self.time_validate(self, times_date_filtered_set[0].times, reservation_data['start_time'], reservation_data['end_time'])
        if type(time_validate) is bool:
            return TableTimeslotAPI.put(TableTimeslotAPI, request, owner_id, business_id, table_id, times_date_filtered_set[0].id, processed_time, True)
        else:
            raise serializers.ValidationError("Timeslot is full, nearest available starting hour: " + str(time_validate))
    
    # FOR -> Find next available time and convert to "HH:MM" format
    # Return times in "HH:MM" (dtype=str)
    def next_available_time_in_hours(table_time, slots_before_start_time):
        next_available_time = table_time[slots_before_start_time:].index(next(filter(lambda x: x!="1", table_time[slots_before_start_time:])))
        time_in_float = (next_available_time + slots_before_start_time) / 2
        hours = int(math.modf(time_in_float)[1])
        minutes = math.modf(time_in_float)[0]
        minutes = "30" if minutes == 0.5 else "00"
        time_in_str = str(hours) + ":" + minutes
        return time_in_str