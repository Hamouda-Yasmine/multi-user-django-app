from django.urls import path

from .views import *

urlpatterns = [
  
   path('login/', LoginUserView.as_view(), name='login'),
   path("userCRUD/<int:pk>/",UserRetrieveUpdateDeleteView.as_view(),name="user_RUD"),
   path("getallCourses/",AllCoursesRetrieve.as_view(),name='all_courses_retrieve'),

  
]