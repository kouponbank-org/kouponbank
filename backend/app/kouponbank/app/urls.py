# pylint: disable=import-error
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from kouponbank.endpoints.address_api import (BusinessAddressAPI,
                                              OwnerBusinessAddressAPI)
from kouponbank.endpoints.business_api import (BusinessAPI, BusinessListAPI,
                                               BusinessMapListAPI,
                                               OwnerBusinessAPI,
                                               OwnerBusinessListAPI,
                                               UnverifiedBusinessListAPI)
from kouponbank.endpoints.business_detail_api import (BusinessDetailAPI,
                                                      OwnerBusinessDetailAPI)
from kouponbank.endpoints.business_verification_api import \
    BusinessVerificationAPI
from kouponbank.endpoints.login_api import LoginOwnerAPI, LoginUserAPI
from kouponbank.endpoints.menu_api import (BusinessMenuAPI,
                                           BusinessMenuListAPI, MenuListAPI)
from kouponbank.endpoints.order_api import (OrderMenuListAPI,
                                            ReservationOrderAPI)
from kouponbank.endpoints.owner.owner_api import OwnerAPI, OwnerListAPI
from kouponbank.endpoints.owner.owner_detail_api import OwnerDetailAPI
from kouponbank.endpoints.reservation_api import (
    BusinessTableReservationAPI, BusinessTableReservationListAPI)
from kouponbank.endpoints.table_api import (BusinessTableAPI,
                                            BusinessTableListAPI, TableListAPI)
from kouponbank.endpoints.user.user_api import UserAPI, UserListAPI
from kouponbank.endpoints.user.user_business_api import UserBusinessListAPI
from kouponbank.endpoints.user.user_detail_api import UserDetailAPI
from kouponbank.endpoints.user.user_reservation_api import (
    UserReservationAPI, UserReservationListAPI)
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
   path('login/user/', LoginUserAPI.as_view(), name="login-user"),
   path('login/owner/', LoginOwnerAPI.as_view(), name="login-owner"),
   path('users/', UserListAPI.as_view(), name="list-of-all-users"),
   path('users/<uuid:user_id>/', UserAPI.as_view(), name="individual-user"),
   path('users/<uuid:user_id>/detail/', UserDetailAPI.as_view(), name="user-detail"),
   path('users/<uuid:user_id>/businesses/', UserBusinessListAPI.as_view(), name="list-of-all-user-favorited-business"),
   path('users/<uuid:user_id>/reservations/', UserReservationListAPI.as_view(), name="list-of-all-user-reservations"),
   path('users/<uuid:user_id>/reservations/<uuid:reservation_id>/', UserReservationAPI.as_view(), name="individual-user-reservations"),
   path('owners/', OwnerListAPI.as_view(), name="list-of-all-owners"),
   path('owners/<uuid:owner_id>/', OwnerAPI.as_view(), name="individual-owner"),
   path('owners/<uuid:owner_id>/detail/', OwnerDetailAPI.as_view(), name="owner-detail"),
   path('owners/<uuid:owner_id>/business/', OwnerBusinessListAPI.as_view(), name="list-of-all-businesses-owned-by-an-owner"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/', OwnerBusinessAPI.as_view(), name="individual-owner-business"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/detail/', OwnerBusinessDetailAPI.as_view(), name="detail-of-owner-business"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/verification/', BusinessVerificationAPI.as_view(), name="verification-of-owner-business"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/address/', OwnerBusinessAddressAPI.as_view(), name="address-of-owner-business"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/menu/', BusinessMenuListAPI.as_view(), name="list-of-all-menus-in-a-business"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/menu/<uuid:menu_id>/', BusinessMenuAPI.as_view(), name="individual-business-menu"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/table/', BusinessTableListAPI.as_view(), name="list-of-all-tables-in-a-business"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/table/<uuid:table_id>/', BusinessTableAPI.as_view(), name="individual-business-table"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/table/<uuid:table_id>/reservation/', BusinessTableReservationListAPI.as_view(), name="list-of-all-reservations-in-a-table-business"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/table/<uuid:table_id>/reservation/<uuid:reservation_id>/', BusinessTableReservationAPI.as_view(), name="individual-reservation-in-table-business"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/table/<uuid:table_id>/reservation/<uuid:reservation_id>/order/', ReservationOrderAPI.as_view(), name="reservation-order"),
   path('owners/<uuid:owner_id>/business/<uuid:business_id>/table/<uuid:table_id>/reservation/<uuid:reservation_id>/order/menus/', OrderMenuListAPI.as_view(), name="menus-ordered"),
   path('business/', BusinessListAPI.as_view(), name="list-of-all-businesses"),
   path('unverified_business/', UnverifiedBusinessListAPI.as_view(), name="list-of-all-unverified-businesses"),
   path('business/<uuid:business_id>/', BusinessAPI.as_view(), name="individual-business"),
   path('business/<uuid:business_id>/detail/', BusinessDetailAPI.as_view(), name="detail-of-business"),
   path('business/<uuid:business_id>/address/', BusinessAddressAPI.as_view(), name="address-of-business"),
   path('business/<uuid:business_id>/menu/', MenuListAPI.as_view(), name="menus-of-business"),
   path('business/<uuid:business_id>/table/', TableListAPI.as_view(), name="tables-of-business"),
   path('business_map/', BusinessMapListAPI.as_view(), name="list-of-business-within-map-bounds"),
]

# For Photos
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
