from django.contrib import admin

# Register your models here.
from .models import Educateur,Lesson,Course,Video,Chapter,Feature

admin.site.register(Educateur)
admin.site.register(Lesson)
admin.site.register(Course)
admin.site.register(Video)
admin.site.register(Chapter)
admin.site.register(Feature)
