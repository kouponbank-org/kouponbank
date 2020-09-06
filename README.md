# 쿠폰뱅크 - Koupon Bank
![쿠폰뱅크 메인사진](/images/쿠폰뱅크.PNG)

<br>

## 프로젝트 설명

<br>

## 프로젝트 멤버
Jay Lee (이지원) <br>
Sung Hyun Ahn (안성현)

<br>

## 프로젝트 코드 베이스
Front-End: ReactJS/TypeScript <br>
Back-End: Python/Django/Django REST Framework <br>
DB: MySQL

<br>

## 기본 셋업
#### Node.js
Frontend에 필요한 Node.js package를 다운로드 해야 합니다. <br>
Node.js package는 terminal command-line package manager 'npm'을 활성화합니다. 

<br>

#### Visual Studio Code and Atom 
기본적으로 사용되는 코드 에디터 Visual Studio Code와 Atom을 사용하시면 편하실 겁니다.

<br>

## Frontend 셋업 
Frontend를 실행하기 위한 패키지 셋업을 위해서 <br>
아래 코드를 'frontend/client 다이렉토리에서' Run 하세요. <br>

```
npm install
```

<br>

### Frontend 실행
Frontend를 실행하시려면 <br>
아래 코드를 'frontend/client' 다이렉토리에서 아래 코드를 Run 하세요. <br> 

```
npm start
```

<br>

실행하신 다음에 http://localhost:3000 으로 가시면 웹 애플리케이션 브라우저가 생성됩니다. <br>
frontend를 수정하시면 페이지가 새로 고쳐질 것입니다.

<br>

## Backend 셋업
Backend를 실행하기 위한 패키지 셋업을 위해서 <br>
아래 코드를 backend virtual environment에서 Run 하세요. <br>

```
pip install -r requirements.txt
```

<br>

데이터베이스 리셋을 원하시는 경우 <br>
아래 코드를 'backend/app' 다이렉토리에서 Run 하세요. <br>

```
python manage.py reset_db
```

데이터베이스 셋업 또한 Backend 수정이있는 경우 <br>
아래 코드를 'backend/app' 다이렉토리에서 Run 하세요. <br>

```
1. python manage.py makemigrations
2. python manage.py migrate
```

<br>

### Backend 실행
Backend를 실행하시려면 <br>
아래 코드를 'backend/app' 다이렉토리에서 아래 코드를 Run 하세요 <br>
```
python manage.py runserver
```

<br>

실행하신 다음에 <br>
API Swagger View로 접근 하시려면: http://127.0.0.1:8000/ 으로 가시고 <br>
Endpoints를 접근 하려면 http://127.0.0.1:8000/{endpoints} 으로 가세요

<br>

## SUPERUSER
Superuser for API: <br>
Username: Kouponbank <br>
Email: kouponbank@gmail.com <br>
Password: znvhsqodzm1! <br>




