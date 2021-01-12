import uuid

from django.db import models
from rest_framework import serializers

def upload_to(instance, filename):
    return '/'.join([
        str(instance.username),
        str(instance.business_name),
        "review",
        filename
    ])

class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.ForeignKey(
        to="kouponbank.Business",
        on_delete=models.CASCADE,
        related_name="business_review",
    )
    user = models.ForeignKey(
        to="kouponbank.User",
        related_name="user_review",
        blank=True,
        null=True,
    )
    rating = models.IntegerField(blank=True, null=True)
    review = models.TextField(default="", blank=True, null=True)
    review_picture = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True
    )

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "id",
            "rating",
            "review",
            "review_picture",
        )