from django.db import models
from rest_framework import serializers
from kouponbank.database.user import User

class UserDetail(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=20, unique=False)
    gender = models.CharField(max_length=50, unique=False)

    def __str__(self):
        return f"<UserDetail>(name: {self.name}, \
            gender: {self.gender}, \
        )"

class UserDetailSerializer(serializers.ModelSerializer):
    user = User(required=True)
    
    class Meta:
        model: UserDetail
        fields = '__all__'
