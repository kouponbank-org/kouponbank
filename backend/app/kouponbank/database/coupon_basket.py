import uuid

from django.db import models
from rest_framework import serializers


class CouponBasket(models.Model):
    coupon_id = models.UUIDField(primary_key=True, editable=False)
    user = models.ForeignKey(
        to="kouponbank.User",
        on_delete=models.CASCADE,
        related_name="user_coupon_basket",
        null=True
    )
    business_key = models.UUIDField(editable=False)
    business_name = models.CharField(max_length=50)
    coupon_code = models.CharField(max_length=50, default="", unique=True)
    coupon_title = models.CharField(max_length=50)


class CouponBasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = CouponBasket
        fields = (
            "coupon_id",
            "business_key",
            "business_name",
            "coupon_code",
            "coupon_title",
        )
