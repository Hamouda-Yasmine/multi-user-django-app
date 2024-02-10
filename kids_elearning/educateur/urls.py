
from django.urls import path
from .views import SignupEducateurView,EducateurDetail,CourseRetrieveUpdateDeleteView,CourseCreateView,CourseListByEducateurView

app_name = 'educateur'

urlpatterns = [
    
    path('signupEducateur/',SignupEducateurView.as_view(),name='signupEducateur'),
    path("educateurdetail/<int:user_id>/",EducateurDetail.as_view(),name="educateurdetail"),

    #paths for the Course
    path("CourseCRUD/", CourseCreateView.as_view(), name="LessonCreate"),
    path("CourseCRUD/<int:pk>/", CourseRetrieveUpdateDeleteView.as_view(), name="course-detail"),
    path("educateurCourses/<int:educateur>/", CourseListByEducateurView.as_view(), name="course-detail-educateur"),
    
    
]
