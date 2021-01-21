#### POST: http://127.0.0.1:8000/users/
{
    "username": "test_user_1",
    "password": "test_user_password_1",
    "email": "test_user_email_1@em.com"
}

#### PUT: http://127.0.0.1:8000/users/<uuid:user_id>/
{
    "username": "test_username_changed_1",
    "password": "test_user_password_changed_1",
    "email": "test_user_email_changed_1@em.com",
}
OR TO ADD A BUSINESS TO THE USER FAVORITE
{
    "business_id": "the business's id should go in here",
    "username": "test_username_changed_1",
    "password": "test_user_password_changed_1",
    "email": "test_user_email_changed_1@em.com",
}

#### POST: http://127.0.0.1:8000/owners/
{
    "username": "test_owner_1",
    "password": "test_owner_password_1",
    "email": "test_owner_email_1@em.com"
}

#### POST: http://127.0.0.1:8000/owners/<uuid:owner_id>/business/
** Note that zipNo has to be 5 digits.
{
    "business": {
        "business_name": "test_business_name_1",
        "business_number": "000000001",
        "business_description": "test_business_description_1"
    },
    "business_detail": {
        "business_email": "test_business_email_1@em.com",
        "business_wifi": false
    },
    "address": {
        "roadAddr": "test_road_address_1",
        "jibunAddr": "test_jibun_address_1",
        "zipNo": "00001",
        "entX": "test_x_coord_1",
        "entY": "test_y_coord_1"
    }
}

#### POST: http://127.0.0.1:8000/owners/<uuid:owner_id>/business/<uuid:business_id>/table/

{
    "table_capacity": 1,
    "table_outlet": true,
    "table_near_wall": true
}

#### POST: http://127.0.0.1:8000/owners/<uuid:owner_id>/business/<uuid:business_id>/table/<uuid:table_id>/reservation/
{
    "user_id": "<uuid:user_id>",
    "reservation": {
        "start_time": "00:00",
        "end_time": "01:00",
        "date": "2021-01-01"
    },
    "order": {
        "total_price": 0.00,
        "total_quantity": 1,
        "order_complete_status": false
    },
    "menu": ""
}

#### POST: http://127.0.0.1:8000/owners/<uuid:owner_id>/business/<uuid:business_id>/table/<uuid:table_id>/timeslot/
** Note that times has to be 48 digits.
{
    "times": "000000000000000000000000000000000000000000000000",
    "date": "2021-01-21"
}

#### POST: http://127.0.0.1:8000/owners/<uuid:owner_id>/business/<uuid:business_id>/menu/
{
    "menu_title": "menu_title",
    "menu_description": "menu_des",
    "menu_price": "menu_price",
    "menu_picture": null
}