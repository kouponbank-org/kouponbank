# Backend

## Virtual Environment Setup
Go to the backend directory and follow the instructions:
<br>

### To Install virtual env:

#### On macOS and Linux:
```
python3 -m pip install --user virtualenv
```
#### On Windows:
```
py -m pip install --user virtualenv
```
<br>

### Creating a virtual environment:
'kouponbank/backend' 다이렉토리에서

#### On macOS and Linux:
```
python3 -m venv env
```
#### On Windows:
```
py -m venv env
```
<br>

### Activating a virtual environment:

#### On macOS and Linux:
```
source env/bin/activate
```
#### On Windows:
```
.\env\Scripts\activate
```
<br>

## Setup
To install the required packages:
```
pip install -r requirements.txt
```
<br>

To setup database, go to backend/app:
```
1. python manage.py makemigrations
2. python manage.py migrate
```
<br>

## RUNNING THE SERVER

To reset or drop the database, go to backend/app:
```
python manage.py reset_db
```

<br>

To run the server, go to backend/app:
```
python manage.py runserver
```

<br>

To access the server, go to the following localhost:
http://127.0.0.1:8000/

<br>

## ACCESS
To access swagger: http://127.0.0.1:8000/

<br>

To access endpoints: http://127.0.0.1:8000/{endpoints}

<br>

## SUPERUSER
Superuser for API: <br>
Username: Kouponbank <br>
Email: kouponbank@gmail.com <br>
Password: znvhsqodzm1! <br>



