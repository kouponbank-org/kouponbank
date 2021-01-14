from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from kouponbank.database.business import Business
from kouponbank.database.business_verification import BusinessVerification, BusinessVerificationSerializer

## Individual Businesses' Verification
class BusinessVerificationAPI(APIView):
    @swagger_auto_schema(
        responses={200: BusinessVerificationSerializer(many=True)},
    )
    def get(self, request, owner_id, business_id):
        business = self.__get_business(business_id)
        business_verification = business.business_verification
        serializer = BusinessVerificationSerializer(business_verification, many=True)
        return Response(serializer.data)
    def __get_business(self, business_id):
        try:
            return Business.objects.get(pk=business_id)
        except Business.DoesNotExist:
            raise Http404("Business cannot be found")
        

    @swagger_auto_schema(
        responses={200: BusinessVerificationSerializer(many=True)},
        manual_parameters=
        [
            openapi.Parameter(
                'Business',
                openapi.IN_QUERY,
                description="Checking to see if the business exists",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Owner',
                openapi.IN_QUERY,
                description="Checking to see if the owner is the true owner of the business",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                'Email',
                openapi.IN_QUERY,
                description="Checking to see if the email business is correct",
                type=openapi.TYPE_STRING,
                required=True
            ),
        ]
    )
    def put(self, request, owner_id, business_id):
        business_verification = self.__get_business_verification(business_id)
        serializer = BusinessVerificationSerializer(business_verification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def __get_business_verification(self, business_id):
        try:
            return BusinessVerification.objects.get(pk=business_id)
        except BusinessVerification.DoesNotExist:
            raise Http404("Business not found")