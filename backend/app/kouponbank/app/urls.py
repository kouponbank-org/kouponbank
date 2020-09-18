from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from kouponbank.endpoints import (business_api, coupon_api, coupon_basket_api,
                                  login_api, menu_api, owner_api,
                                  owner_detail_api, user_api, user_detail_api)
from rest_framework import permissions

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
   path('login/user/', login_api.LoginUserApi.as_view()),
   path('login/owner/', login_api.LoginOwnerApi.as_view()),
   path('users/', user_api.UserListAPI.as_view()),
   path('users/<uuid:user_id>/', user_api.UserAPI.as_view()),
   path('users/<uuid:user_id>/detail/', user_detail_api.UserDetailAPI.as_view()),
   path('users/<uuid:user_id>/couponbasket/', coupon_basket_api.CouponBasketListAPI.as_view()),
   path('users/<uuid:user_id>/couponbasket/<uuid:coupon_id>/', coupon_basket_api.CouponBasketAPI.as_view()),
   path('owners/', owner_api.OwnerListAPI.as_view()),
   path('owners/<uuid:owner_id>/', owner_api.OwnerAPI.as_view()),
   path('owners/<uuid:owner_id>/detail/', owner_detail_api.OwnerDetailAPI.as_view()),
   path('owners/<uuid:owner_id>/detail/business/', business_api.BusinessListAPI.as_view()),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/', business_api.BusinessAPI.as_view()),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/menu/', menu_api.MenuListAPI.as_view()),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/menu/<uuid:menu_id>/', menu_api.MenuAPI.as_view()),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/coupon/', coupon_api.CouponListAPI.as_view()),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/coupon/<uuid:coupon_id>/', coupon_api.CouponAPI.as_view()),
]

# For Photos
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
