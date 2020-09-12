from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from kouponbank.endpoints import (business_api, coupon_api, menu_api,
                                  owner_api, owner_detail_api, user_api,
                                  user_detail_api)

from .router import router

# Swagger View
schema_view = get_schema_view(
   openapi.Info(
      title="Koupon Bank API",
      default_version='v1',
      description="Koupon Bank API"
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

#URL Route Directory
urlpatterns = [
   path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('admin/', admin.site.urls),
   path('users/', user_api.UserListAPI.as_view()),
   path('users/<int:user_id>/', user_api.UserAPI.as_view()),
   path('users/<int:user_id>/detail/', user_detail_api.UserDetailAPI.as_view()),
   path('owners/', owner_api.OwnerListAPI.as_view()),
   path('owners/<int:owner_id>/', owner_api.OwnerAPI.as_view()),
   path('owners/<int:owner_id>/detail/', owner_detail_api.OwnerDetailAPI.as_view()),
   path('owners/<int:owner_id>/detail/business/', business_api.BusinessListAPI.as_view()),
   path('owners/<int:owner_id>/detail/business/<int:business_id>/', business_api.BusinessAPI.as_view()),
   path('owners/<int:owner_id>/detail/business/<int:business_id>/menu/', menu_api.MenuListAPI.as_view()),
   path('owners/<int:owner_id>/detail/business/<int:business_id>/menu/<int:menu_id>/', menu_api.MenuAPI.as_view()),
   path('owners/<int:owner_id>/detail/business/<int:business_id>/coupon/', coupon_api.CouponListAPI.as_view()),
   path('owners/<int:owner_id>/detail/business/<int:business_id>/coupon/<int:coupon_id/', coupon_api.CouponAPI.as_view()),
]

# For Photos
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
