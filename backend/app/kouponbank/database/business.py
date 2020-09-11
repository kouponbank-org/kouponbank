from django.db import models
from rest_framework import serializers

class Business(models.Model):
    business_owner = models.ForeignKey(to="kouponbank.OwnerDetail", on_delete=models.CASCADE, related_name="business", null=True)
    business_name = models.CharField(max_length=50, default="")
    description = models.TextField(default="")
    location = models.CharField(max_length=50, default="")

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ("business_name", "description", "location")
