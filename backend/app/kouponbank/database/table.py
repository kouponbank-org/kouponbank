# pylint: disable=import-error
import uuid

from django.db import models
from rest_framework import serializers
from kouponbank.database.timeslot import Timeslot
import datetime
from kouponbank.database.business import Business

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
    # def create(self, validated_data):
    #     table = Table.objects.create(**validated_data)
    #     Timeslot.objects.create(
    #         table=table,
    #         times="000000000000000000000000000000000000000000000000",
    #         date=datetime.date.today()
    #     )
    #     return table
    def create(self, validated_data):
        table = Table.objects.create(**validated_data)
        Timeslot.objects.create(
            id=table.id,
            times="",
            date="",
        )
