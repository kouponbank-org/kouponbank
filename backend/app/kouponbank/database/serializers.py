from rest_framework import serializers
from kouponbank.database.models import User, Owner

# Serializers converts data into JSON
# And validates the data.

# Possible need to optimize Serializers.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'