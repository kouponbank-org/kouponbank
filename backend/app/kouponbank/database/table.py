# pylint: disable=import-error
import uuid

from django.db import models
from rest_framework import serializers
import datetime
from kouponbank.database.business import Business
from kouponbank.database.timeslot import Timeslot

class Table(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.ForeignKey(
        Business,
        on_delete=models.CASCADE,
        related_name="business_table",
        null=True,
        blank=True,
    )
    table_capacity = models.IntegerField(default=0)
    table_outlet = models.BooleanField(default=False)
    table_near_wall = models.BooleanField(default=False)

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = (
            "id",
            "table_capacity",
            "table_outlet",
            "table_near_wall",
        )
    def create(self, validated_data):
        table = Table.objects.create(**validated_data)
        Timeslot.objects.create(
            times="000000000000000000000000000000000000000000000000",
            date="2021-01-21",
        )
        return table

#table -> timeslot (master), 
#Reservation: convert to timeslot format -> if it can be found, then no