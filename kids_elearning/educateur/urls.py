
from django.urls import path
from .views import educateur_home

app_name = 'educateur'

urlpatterns = [
    path('homeeducateur/', educateur_home ,name='homeeducateur'),
    
]
