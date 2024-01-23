from django.urls import path
from .views import SignupKidsView

app_name = 'kids'

urlpatterns = [

    path('signupKids/',SignupKidsView.as_view(),name='signupKids'),
   
]