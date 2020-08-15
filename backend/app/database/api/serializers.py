from rest_framework import serializers
from database.models import User

# Serializers converts data into JSON
# And validates the data.

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
