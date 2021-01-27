#### POST: http://127.0.0.1:8000/users/
{
    "user": {
        "username": "test_user_1",
        "password": "test_user_password_1",
        "email": "test_user_email_1@em.com"
    },
    "user_detail": {
        "name": "test_user_first_last_middle_name",
        "gender": "test_user_gender",
        "birthday": "test_user_birthday",
        "address": "test_user_address",
        "cell_number": "test_cell_number"
    }
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
    owner: {
        "username": "test_owner_1",
        "password": "test_owner_password_1",
        "email": "test_owner_email_1@em.com"
    },
    "owner_detail": {
        "name": "test_owner__first_,iddle_name",
        "gender": "test_owner_gender",
        "birthday": "test_owner_birthday",
        "address": "test_owner_address",
        "cell_number": "test_owner_num"
    }
}