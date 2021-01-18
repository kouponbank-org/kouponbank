from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from kouponbank.endpoints.business_api import (BusinessAPI, BusinessListAPI,
                                               BusinessMapListAPI,
                                               BusinessSearchListAPI,
                                               OwnerBusinessAPI,
                                               OwnerBusinessListAPI)
from kouponbank.endpoints.coupon_api import (BusinessCouponAPI,
                                             BusinessCouponListAPI, CouponAPI,
                                             CouponListAPI)
from kouponbank.endpoints.coupon_basket_api import (CouponBasketAPI,
                                                    CouponBasketListAPI)
from kouponbank.endpoints.login_api import LoginOwnerAPI, LoginUserAPI
from kouponbank.endpoints.menu_api import (BusinessMenuAPI,
                                           BusinessMenuListAPI, MenuAPI,
                                           MenuListAPI)
from kouponbank.endpoints.owner_api import OwnerAPI, OwnerListAPI
from kouponbank.endpoints.owner_detail_api import OwnerDetailAPI
from kouponbank.endpoints.user_api import UserAPI, UserListAPI
from kouponbank.endpoints.user_detail_api import UserDetailAPI
from kouponbank.endpoints.reservation_api import (BusinessTableReservationListAPI,
                                                   BusinessTableReservationAPI)
from kouponbank.endpoints.table_api import (BusinessTableListAPI,
                                             BusinessTableAPI,
                                             TableListAPI)
from kouponbank.endpoints.timeslot_api import TableTimeslotListAPI, TableTimeslotAPI, TableBookingAPI
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
   path('users/', UserListAPI.as_view(), name="user-list"),
   path('users/<uuid:user_id>/', UserAPI.as_view(), name="user"),
   path('users/<uuid:user_id>/detail/', UserDetailAPI.as_view(), name="user-detail-list"),
   path('users/<uuid:user_id>/couponbasket/', CouponBasketListAPI.as_view(), name="coupon-basket-list"),
   path('users/<uuid:user_id>/couponbasket/<uuid:coupon_id>/', CouponBasketAPI.as_view(), name="coupon-basket"),
   path('owners/', OwnerListAPI.as_view(), name="owner-list"),
   path('owners/<uuid:owner_id>/', OwnerAPI.as_view(), name="owner"),
   path('owners/<uuid:owner_id>/detail/', OwnerDetailAPI.as_view(), name="owner-detail-list"),
   path('owners/<uuid:owner_id>/detail/business/', OwnerBusinessListAPI.as_view(), name="owner-business-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/', OwnerBusinessAPI.as_view(), name="owner-business"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/menu/', BusinessMenuListAPI.as_view(), name="business-menu-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/menu/<uuid:menu_id>/', BusinessMenuAPI.as_view(), name="business-menu"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/coupon/', BusinessCouponListAPI.as_view(), name="business-coupon-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/coupon/<uuid:coupon_id>/', BusinessCouponAPI.as_view(), name="business-coupon"),
   path('map/', BusinessMapListAPI.as_view(), name="business-map-list"),
   path('search/', BusinessSearchListAPI.as_view(), name="business-search-list"),
   path('business/', BusinessListAPI.as_view(), name="business-list"),
   path('business/<uuid:business_id>/', BusinessAPI.as_view(), name="business"),
   path('business/<uuid:business_id>/menu/', MenuListAPI.as_view(), name="menu-list"),
   path('business/<uuid:business_id>/menu/<uuid:menu_id>/', MenuAPI.as_view(), name="menu"),
   path('business/<uuid:business_id>/coupon/', CouponListAPI.as_view(), name="coupon-list"),
   path('business/<uuid:business_id>/coupon/<uuid:coupon_id>/', CouponAPI.as_view(), name="coupon"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/business_tables/', BusinessTableListAPI.as_view(), name="business-table-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/business_tables/<uuid:table_id>/', BusinessTableAPI.as_view(), name="business-table"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/business_tables/<uuid:table_id>/timeslot/', TableTimeslotListAPI.as_view(), name="timeslot-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/business_tables/<uuid:table_id>/timeslot/<uuid:timeslot_id>', TableTimeslotAPI.as_view(), name="timeslot"),
   path('owners/book', TableBookingAPI.as_view(), name="book"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/business_tables/<uuid:table_id>/table_reservations/', BusinessTableReservationListAPI.as_view(), name="table-reservation-list"),
   path('owners/<uuid:owner_id>/detail/business/<uuid:business_id>/business_tables/<uuid:table_id>/table_reservations/<uuid:reservation_id>/', BusinessTableReservationAPI.as_view(), name="table-reservation")
]

# For Photos
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
