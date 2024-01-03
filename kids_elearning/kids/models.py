from django.db import models

from user.models import User

class Kids(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    maladie=models.CharField(max_length=100)
