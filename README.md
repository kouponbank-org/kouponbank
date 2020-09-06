# 쿠폰뱅크 - Koupon Bank

## Project Description

## Project Members
Jay Lee (이지원) <br>
Sung Hyun Ahn (안성현)

## Project Code Base
Front-End: ReactJS/TypeScript <br>
Back-End: Python/Django/Django REST Framework <br>
DB: MySQL

#### ----- Basic Setup-----
Install Node.js <br>
- Node.js will enable the command-line package manager 'npm' <br>

Install Visual Studio Code and Atom <br>
- Most popular text editor for JavaScript applications

#### ----- Frontend Setup -----
Frontend를 실행하기 위한 팩키지 셋업을 위해서 <br>
아래 코드를 'frontend/client 다이렉토리에서' Run하세요. <br>

'''
npm install
'''

#### To Run Front End
Frontend를 실행하실려면 <br>
아래 코드를 'frontend/client' 다이렉토리에서 아래 코드를 Run하세요 <br>

'''
npm start
'''

<br>

실행하신 다음에 http://localhost:3000 으로 가시면 웹애플리케이션 브라우저가 생성됩니다.
frontend를 수정하시면 페이지가 새로고쳐질 것 입니다.

#### ---- Backend Setup ----
Backend를 실행하기 위한 팩키지 셋업을 위해서 <br>
아래 코드를 backend virtual environment에서 Run하세요. <br>

```
pip install -r requirements.txt
```

<br>

데이터베이스 리셋을 원하시는 경우 <br>
아래 코드를 'backend/app' 다이렉토리에서 Run하세요. <br>

```
python manage.py reset_db
```

데이터베이스 셋업 또한 Backend 수정이있는 경우 <br>
아래 코드를 'backend/app' 다이렉토리에서 Run하세요. <br>

```
1. python manage.py makemigrations
2. python manage.py migrate
```

<br>

#### To Run Backend
Backend를 실행하실려면 <br>
아래 코드를 'backend/app' 다이렉토리에서 아래 코드를 Run하세요 <br>
```
python manage.py runserver
```

<br>

실행하신 다음에 <br>
API Swagger View로 접근 하실려면: http://127.0.0.1:8000/ 으로 가시고 <br>
Endpoints를 접근 하실려면 http://127.0.0.1:8000/{endpoints} 으로 가세요

<br>

## SUPERUSER
Superuser for API: <br>
Username: Kouponbank <br>
Email: kouponbank@gmail.com <br>
Password: znvhsqodzm1! <br>




