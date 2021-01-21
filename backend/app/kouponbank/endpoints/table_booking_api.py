# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from kouponbank.database.timeslot import Timeslot, TimeslotSerializer

class TableBookingAPI(APIView):
    @swagger_auto_schema(
        responses={200: TimeslotSerializer(many=True)}
    )

    # TODO: if reserved outside of the range, i can still post. 4-5pm on the db,
    # I can still post 3-4, 

    def get(self, start_time, end_time, date):
        input_slots = self.time_slot_to_regex(self, start_time, end_time)
        times = Timeslot.objects.filter(date=date, times__regex=input_slots)
        #times = times.filter(date=date, times__regex='^[01]{10}1{1}')
        #filters timeslot and check if the input slots can be updated in timeslot
        return times

    def time_process(self, start_time, end_time):
        # times should be in HH:MM format
        start_hour, start_minutes = start_time.split(':')
        end_hour, end_minutes = end_time.split(':')

        # number of timeslots that we can skip. ex) 9 am - 11am, we do not need first 18 time slots. 
        slots_before_needed_time = int((int(start_hour)*2 + int(start_minutes)/30))

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
        
        #return list of processed 2 info that we need to find time slot in regex and str format
        return [slots_before_needed_time, total_duration]

    def time_slot_to_regex(self, start_time, end_time):
        slots_before_needed_time = self.time_process(self, start_time, end_time)[0]
        total_duration = self.time_process(self, start_time, end_time)[1]
        time_regular_expression = r'^[01]{%d}1{%d}' % (slots_before_needed_time, total_duration)
        return time_regular_expression

    def time_slot_to_str(self, start_time, end_time):
        slots_before_needed_time = self.time_process(self, start_time, end_time)[0]
        total_duration = self.time_process(self, start_time, end_time)[1]
        time_string = "000000000000000000000000000000000000000000000000"
        replacement = ""
        for i in range(total_duration):
            replacement += "1"
        time_string = '%s%s%s'%(time_string[:slots_before_needed_time],replacement,time_string[slots_before_needed_time + total_duration:])
        return time_string

# print(TableBookingAPI.get(TableBookingAPI, "12:00", "13:00", "2021-01-01"))