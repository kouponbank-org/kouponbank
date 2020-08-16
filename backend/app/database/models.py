## API is going to be requesting models from the DB
## Or updating these models in some way.

from django.db import models

# 유저모델
# username-ID and password
# username 지우면 연관 데이터 삭제  on_delete=models.CASCADE --> 어떻게 연계시키는지? 
class User(models.Model):
    username = models.CharField("Username", max_length=50, unique=True)
    password = models.CharField("Password", max_length=50, unique=False)

    def __str__(self):
        return f"<User>(username: {self.username}, password: {self.password})"

    

# 유저 데이터
class UserDetails(models.Model):
    #username 연계 어떻게?
    name = models.CharField(max_length=20, unique=False)
    email = models.CharField(max_length=50, unique=True)
    gender = models.CharField(max_length=50, unique=False)