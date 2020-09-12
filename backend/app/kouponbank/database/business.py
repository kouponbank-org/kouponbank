from django.db import models
from rest_framework import serializers


def upload_to(instance, filename):
    return '/'.join([
        str(instance.business_owner.owner.username),
        str(instance.business_name),
        filename
    ])

class Business(models.Model):
    business_owner = models.ForeignKey(
        to="kouponbank.OwnerDetail",
        on_delete=models.CASCADE,
        related_name="business",
        null=True
    )
    business_name = models.CharField(max_length=50, default="")
    description = models.TextField(default="")
    location = models.CharField(max_length=50, default="")
    business_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True
    )

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = (
            "business_name",
            "description",
            "location",
            "business_picture"
        )
