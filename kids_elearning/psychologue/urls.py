from django.urls import path
from .views import psychologue_home

app_name = 'psychologue'

urlpatterns = [
    path('homepsychologue/', psychologue_home ,name='homepsychologue'),
    
]