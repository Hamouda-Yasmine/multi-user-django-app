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
    gender = models.CharField(max_length=10, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    