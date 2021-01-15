# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.business import Business, BusinessSerializer
from kouponbank.database.user import User
from rest_framework.response import Response
from rest_framework.views import APIView


## Returns a list businesses that the user has favorited given an id of a user
class UserBusinessListAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessSerializer(many=True)},
    )
    def get(self, request, user_id):
        user = self.__get_user(user_id)
        serializer = BusinessSerializer(user.businesses.all(), many=True)
        return Response(serializer.data)
    def __get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404("User not found")
