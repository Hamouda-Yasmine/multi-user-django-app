from django.urls import path
from .views import SignupPsyView

app_name = 'psychologue'

urlpatterns = [ path('signupPsychologue/',SignupPsyView.as_view(),name='psychosignup')
   
    
]