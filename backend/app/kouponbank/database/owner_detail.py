from django.db import models
from kouponbank.database.business import Business, BusinessSerializer
from rest_framework import serializers


class OwnerDetail(models.Model):
    owner = models.OneToOneField(to="kouponbank.Owner", on_delete=models.CASCADE, related_name="owner_details")
    name = models.CharField(max_length=20, unique=False)
    location = models.CharField(max_length=50, unique=False)
    picture = models.CharField(max_length=50, unique=False)

class OwnerDetailSerializer(serializers.ModelSerializer):
    #businesses = BusinessSerializer(source="business", required=False)

    class Meta:
        model = OwnerDetail
        fields = ("name", "location", "picture")
