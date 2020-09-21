from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from kouponbank.endpoints.business_api import BusinessAPI, BusinessListAPI
from kouponbank.endpoints.coupon_api import CouponAPI, CouponListAPI
from kouponbank.endpoints.coupon_basket_api import (CouponBasketAPI,
                                                    CouponBasketListAPI)
from kouponbank.endpoints.login_api import LoginOwnerApi, LoginUserApi
from kouponbank.endpoints.menu_api import MenuAPI, MenuListAPI
from kouponbank.endpoints.owner_api import OwnerAPI, OwnerListAPI
from kouponbank.endpoints.owner_detail_api import OwnerDetailAPI
from kouponbank.endpoints.user_api import UserAPI, UserListAPI
from kouponbank.endpoints.user_detail_api import UserDetailAPI

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
   path('login/user/', LoginUserApi.as_view(), name="login-user"),
   path('login/owner/', LoginOwnerApi.as_view(), name="login-owner"),
   path('users/', UserListAPI.as_view(), name="user-list"),
   path('users/<uuid:user_id>/', UserAPI.as_view(), name="user"),
   path('users/<uuid:user_id>/detail/', UserDetailAPI.as_view(), name="user-detail-list"),
   path('users/<uuid:user_id>/couponbasket/', CouponBasketListAPI.as_view(), name="coupon-basket-list"),
   path('users/<uuid:user_id>/couponbasket/<uuid:coupon_id>/', CouponBasketAPI.as_view(), name="coupon-basket"),
   path('owners/', OwnerListAPI.as_view(), name="owner-list"),
   path('owners/<uuid:owner_id>/', OwnerAPI.as_view(), name="owner"),
   path('owners/<uuid:owner_id>/detail/', OwnerDetailAPI.as_view(), name="owner-detail-list"),
   path('owners/<uuid:owner_id>/detail/business/', BusinessListAPI.as_view(), name="business-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/', BusinessAPI.as_view(), name="business"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/menu/', MenuListAPI.as_view(), name="menu-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/menu/<uuid:menu_id>/', MenuAPI.as_view(), name="menu"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/coupon/', CouponListAPI.as_view(), name="coupon-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/coupon/<uuid:coupon_id>/', CouponAPI.as_view(), name="coupon"),
]

# For Photos
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
