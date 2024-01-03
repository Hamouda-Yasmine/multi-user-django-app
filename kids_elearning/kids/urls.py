from django.urls import path
from .views import kids_home

app_name = 'kids'

urlpatterns = [
    path('homekids/', kids_home,name='homekids'),
   
]