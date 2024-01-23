
from django.urls import path
from .views import SignupEducateurView

app_name = 'educateur'

urlpatterns = [
    
    path('signupEducateur/',SignupEducateurView.as_view(),name='signupEducateur')
    
]
