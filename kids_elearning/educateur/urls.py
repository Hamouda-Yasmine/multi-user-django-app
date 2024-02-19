
from django.urls import path
from .views import *

app_name = 'educateur'

urlpatterns = [
    
    path('signupEducateur/',SignupEducateurView.as_view(),name='signupEducateur'),
    path("educateurdetail/<int:user_id>/",EducateurDetail.as_view(),name="educateurdetail"),

    #paths for the Course
    path("CourseCRUD/", CourseCreateView.as_view(), name="LessonCreate"),
    path("CourseCRUD/<int:pk>/", CourseRetrieveUpdateDeleteView.as_view(), name="course-detail"),
    path("educateurCourses/<int:educateur>/", CourseListByEducateurView.as_view(), name="course-detail-educateur"),

    #paths for the Chapter
    path("educateurChaptersCourses/<int:id_course>/", ChapterListView.as_view(), name="course-chapter-detail-educateur"),
    path("educateurChaptersCreate/", educateurChaptersCreate.as_view(), name="ChapterCreate"),
    path("chaptersRUD/<int:pk>/",chaptersRetrieveUpdateDeleteView.as_view(),name="chapters-retrieve-update-delete"),

    #paths for the lesson and video 
    path("lessonscreate/",lessonsCreate.as_view(),name="lesson-create"),
    path("lessonsRUD/<int:pk>/",lessonRetrieveUpdateDeleteView.as_view(),name="lessons-retrieve-update-delete"),
    path("videocreate/",videoCreate.as_view(),name="video-create"),
    path("videosRUD/<int:pk>/",videoRetrieveUpdateDeleteView.as_view(),name="videos-retrieve-update-delete"),
]
