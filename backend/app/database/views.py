from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets, status, mixins, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication, BasicAuthentication
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated


from .models import User
from .api.serializers import UserSerializer




