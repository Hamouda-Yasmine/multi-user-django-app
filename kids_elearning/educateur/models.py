from django.db import models
from user.models import User
from django.core.validators import MinValueValidator,MaxValueValidator
from django.utils import timezone
LEVEL = (
        ('Facile', 'Facile'),
        ('Difficil', 'Difficil'),
        ('Intermediaire', 'Intermediaire'),
       
)
class Educateur(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    module=models.CharField(max_length=100)

class Feature(models.Model):
    name = models.CharField(max_length=151, unique=True)
    course = models.ForeignKey('Course', related_name='course_features', on_delete=models.CASCADE)
    
class Course(models.Model):
    #slug = models.SlugField(blank=True, unique=True)
    title = models.CharField(max_length=150, unique=False)
    summary = models.TextField(null=True, blank=True)
    price=models.IntegerField(null=True, default=0)
    is_approved = models.BooleanField(default=True, blank=True, null=True)
    is_free=models.BooleanField(default=True, blank=True, null=True)
    ratting=models.IntegerField(null=True, default=0)
    level = models.CharField(max_length=25, choices=LEVEL, null=True)
    educateur = models.ForeignKey(Educateur, on_delete=models.CASCADE)
    upload_time = models.DateTimeField(auto_now=False, auto_now_add=True, null=True)
    categorie=models.CharField(max_length=150)
    features = models.ManyToManyField(Feature,related_name='courses')
    update_time = models.DateTimeField(auto_now=True, null=True)




class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)


class Lesson(models.Model):
    #slug = models.SlugField(blank=True, unique=True)
    title = models.CharField(max_length=200, null=True)
    content = models.TextField(blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    chapter=  models.ForeignKey(Chapter, on_delete=models.CASCADE)
    date= models.DateTimeField( null=True)
    type=models.CharField(max_length=6,default="lesson")

    #this function is when we update the content of the lesson the update_time field of the course get updated too with the new timezone
    def save(self, *args, **kwargs):
        self.course.update_time = timezone.now()
        self.course.save()
        super().save(*args, **kwargs)
    
class Video(models.Model):
     course = models.ForeignKey(Course, on_delete=models.CASCADE)
     chapter=  models.ForeignKey(Chapter, on_delete=models.CASCADE) 
     title=models.CharField(max_length=200, null=True)
     thumbnail=models.CharField(max_length=200, null=True)
     url= models.CharField(max_length=200)
     duration=models.FloatField(validators=[MinValueValidator(0.30),MaxValueValidator(60.0)])
     date= models.DateTimeField( null=True)
     type=models.CharField(max_length=5,default="video")

     #this function is when we update the content of the lesson the update_time field of the course get updated too with the new timezone
     def save(self, *args, **kwargs):
        self.course.update_time = timezone.now()
        self.course.save()
        super().save(*args, **kwargs)