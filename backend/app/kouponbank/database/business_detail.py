import uuid

from django.db import models
from rest_framework import serializers

def upload_to(instance, filename):
    return '/'.join([
        str(instance.business_owner.owner.username),
        str(instance.business_name),
        filename
    ])

class BusinessDetail(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.OneToOneField(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_detail",
    )
    business_email = models.EmailField(max_length=254, blank=True)
    business_wifi = models.BooleanField(default=False)
    business_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True
    )

class BusinessDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDetail
        fields = (
            "id",
            "business_email",
            "business_wifi",
            "business_picture",
        )
