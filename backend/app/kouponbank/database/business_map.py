import uuid

from django.db import models
from rest_framework import serializers


class BusinessMap(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    business = models.OneToOneField(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_map"
    )
    business_name = models.CharField(max_length=50, blank=False)
    roadAddress= models.CharField(max_length=64, blank=False)
    jibun = models.CharField(max_length=64, blank=False)
    zipcode = models.CharField(max_length=64, blank=False)
    x = models.CharField(max_length=64, blank=False)
    y = models.CharField(max_length=64, blank=False)

class BusinessMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessMap
        fields = (
            "id",
            "business_name",
            "roadAddress",
            "jibun",
            "zipcode",
            "x",
            "y"
        )
