## API is going to be requesting models from the DB
## Or updating these models in some way.

from django.db import models

# 유저모델
class User(models.Model):
    name = models.CharField(max_length=50, unique=False)

    def __repr__(self):
        return f"<User>(name: {self.name})"

# 유저 데이터
class UserDetails(models.Model):
    name = models.CharField(max_length=20, unique=False)
    email = models.CharField(max_length=50, unique=True)
    gender = models.CharField(max_length=50, unique=False)