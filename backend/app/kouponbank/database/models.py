## API is going to be requesting models from the DB
## Or updating these models in some way.

from django.db import models

# 유저모델
# username-ID and password
# username 지우면 연관 데이터 삭제  on_delete=models.CASCADE --> 어떻게 연계시키는지? 
class User(models.Model):
    username = models.CharField("username", max_length=50, unique=True, default="")
    user_password = models.CharField("user_password", max_length=50, unique=False, default="")
    user_email = models.CharField("user_email", max_length=50, unique=True, default="")

    def __str__(self):
        return f"<User>(username: {self.username}, \
            user_password: {self.user_password}, \
            user_email: {self.user_email}, \
        )"

    
# 유저 데이터
class UserDetails(models.Model):
    #username 연계 어떻게?
    name = models.CharField(max_length=20, unique=False)
    gender = models.CharField(max_length=50, unique=False)


#사업자 모델
class Owner(models.Model):
    owner_username = models.CharField("owner_username", max_length=50, unique=True, default="")
    owner_password = models.CharField("owner_password", max_length=50, unique=False, default="")
    owner_email = models.CharField("owner_email", max_length=50, unique=True, default="")

    def __str__(self):
        return f"<Owner>(owner_username: {self.owner_username}, \
            owner_password: {self.owner_password}, \
            owner_email: {self.owner_email}, \
        )"

# 사업자 데이터
class OwnerDetails(models.Model):
    name = models.CharField(max_length=20, unique=False)
    location = models.CharField(max_length=50, unique=False)
    picture = models.CharField(max_length=50, unique=False)
