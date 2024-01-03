# educateur/urls.py
from django.urls import path
from .views import educateur_home

app_name = 'educateur'

urlpatterns = [
    path('home/', educateur_home ,name='home'),
    # Other URLs specific to 'educateur'
]
