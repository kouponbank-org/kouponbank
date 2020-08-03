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


To make migrations, go to backend/app:
```
1. python manage.py makemigrations
2. python manage.py migrate
```

Now the API model changes will exist in the database.

To run the server, go to backend/app:
```
python manage.py runserver
```

