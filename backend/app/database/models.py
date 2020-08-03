## API is going to be requesting models from the DB
## Or updating these models in some way.

from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=50, unique=False)

    def __repr__(self):
        return f"<User>(name: {self.name})"