from django.db import models
from user.models import User

class Educateur(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    module=models.CharField(max_length=100)
    
