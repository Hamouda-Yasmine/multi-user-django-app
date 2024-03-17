from django.db import models

from user.models import User
from educateur.models import Course

class Kids(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    maladie=models.CharField(max_length=100)

class CourseProgress(models.Model):
    idLessonVideo=models.CharField(max_length=100,null=True)
    type=models.CharField(max_length=100,null=True)

class TakenCourse(models.Model):
    kid=models.ForeignKey(Kids, on_delete=models.CASCADE)
    course=models.ForeignKey(Course, on_delete=models.CASCADE)
    progress=models.ForeignKey(CourseProgress, on_delete=models.CASCADE,null=True)


