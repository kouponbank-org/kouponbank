# pylint: disable=import-error
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from kouponbank.database.reservation import Reservation, ReservationSerializer
from kouponbank.database.user import User
from rest_framework.response import Response
from rest_framework.views import APIView


## Returns the list of reservations that the user has made given an id of a user
class UserReservationListAPI(APIView):
    @swagger_auto_schema(
        responses={200: ReservationSerializer(many=True)},
    )
    def get(self, request, user_id):
        user = self.__get_user(user_id)
        reservations = user.user_reservation
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)
    def __get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404("User not found")

## Returns a reservation that the user has made given an id of a user and an id of the reservation
class UserReservationAPI(APIView):
    @swagger_auto_schema(
        responses={200: ReservationSerializer(many=True)},
    )
    def get(self, request, user_id, reservation_id):
        reservation = self.__get_reservation(reservation_id)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data)
    def __get_reservation(self, reservation_id):
        try:
            return Reservation.objects.get(pk=reservation_id)
        except Reservation.DoesNotExist:
            raise Http404("Reservation not found")
