from django.db import models
from rest_framework import serializers

class User(models.Model):
    username = models.CharField(max_length=50, unique=True, default='')
    password = models.CharField(max_length=50, unique=False, default='')
    email = models.EmailField(max_length=50, unique=True, default='')

    def __str__(self):
        return f"<User>(username: {self.username}, \
            password: {self.password}, \
            email: {self.eemail}, \
        )"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

