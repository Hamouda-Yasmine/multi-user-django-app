from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPES = (
        ('kids', 'Kids'),
        ('admin', 'Admin'),
        ('psychologue', 'Psychologue'),
        ('educateur', 'Educateur'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPES)

    