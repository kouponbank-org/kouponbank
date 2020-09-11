from django.db import models
from kouponbank.database.business import Business, BusinessSerializer
from rest_framework import serializers


class OwnerDetail(models.Model):
    owner = models.OneToOneField(to="kouponbank.Owner", on_delete=models.CASCADE, related_name="owner_details")
    name = models.CharField(max_length=20, default="", blank=True)
    gender = models.CharField(max_length=50, default="", blank=True)
    birthday = models.CharField(max_length=50, default="", blank=True)
    location = models.CharField(max_length=50, default="", blank=True)

class OwnerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerDetail
        fields = ("name", "gender", "birthday", "location")
