from kouponbank.database.models import User
from kouponbank.database.serializers import UserSerializer

from rest_framework import viewsets

# Generic Viewsets로 하는게 더 좋을수도 있을것 같은데
# 한번 다른 블로거들이 어떻게 했는지 봐야할듯.

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



