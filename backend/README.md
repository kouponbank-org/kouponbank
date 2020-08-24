# Backend

## Setup
Setup your venv in the backend directory.

To install the required packages:
```
pip install -r requirements.txt
```

OR

To install the require packages and keep them in the Pipfile/venv file
```
venv/pipenv install (package names)
```
<br>
To make migrations, go to backend/app:
```
1. python manage.py makemigrations
2. python manage.py migrate
```
<br>
Now the API model changes will exist in the database. 

## RUNNING THE SERVER

To reset or drop the database, go to backend/app:
```
python manage.py reset_db
```

To run the server, go to backend/app:
```
python manage.py runserver
```

To access the server, go to the following localhost:
http://127.0.0.1:8000/

## SUPERUSER
Superuser for API: <br>
Username: Kouponbank <br>
Email: kouponbank@gmail.com <br>
Password: znvhsqodzm1! <br>



