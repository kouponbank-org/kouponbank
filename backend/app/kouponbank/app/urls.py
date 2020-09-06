from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from kouponbank.endpoints import (owner_api, owner_detail_api, user_api,
                                  user_detail_api)

from .router import router

schema_view = get_schema_view(
   openapi.Info(
      title="Koupon Bank API",
      default_version='v1',
      description="Koupon Bank API"
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

#URL Directory
urlpatterns = [
   path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('admin/', admin.site.urls),
   path('users/', user_api.UserListAPI.as_view()),
   path('users/<int:pk>/', user_api.UserAPI.as_view()),
   path('users/<int:pk>/detail/', user_detail_api.UserDetailAPI.as_view()),
   path('owners/', owner_api.OwnerListAPI.as_view()),
   path('owners/<int:pk>/', owner_api.OwnerAPI.as_view()),
   path('owners/<int:pk>/detail', owner_detail_api.OwnerDetailAPI.as_view())
]
