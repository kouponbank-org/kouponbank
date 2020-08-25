from rest_framework import serializers
from kouponbank.database.models import User

# Serializers converts data into JSON
# And validates the data.

# Possible need to optimize Serializers.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
