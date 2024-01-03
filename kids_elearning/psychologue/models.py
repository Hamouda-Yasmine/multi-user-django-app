from django.db import models
from user.models import User

class Psychologue(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialite=models.CharField(max_length=100)

