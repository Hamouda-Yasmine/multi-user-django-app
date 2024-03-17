from django.urls import path
from .views import *

app_name = 'kids'

urlpatterns = [

    path('signupKids/',SignupKidsView.as_view(),name='signupKids'),
    path("kidsdetail/<int:user_id>/",KidsDetail.as_view(),name="kidsdetail"),
    
    path('takenCourseCreate/',CreateTakenCourse.as_view(),name='create_tokencourse'),
    path('course-progress/<int:kid_id>/<int:course_id>/', CourseProgressView.as_view(), name='course-progress'),

]