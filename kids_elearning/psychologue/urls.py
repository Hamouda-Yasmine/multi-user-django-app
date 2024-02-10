from django.urls import path
from .views import SignupPsyView,PsychoDetail

app_name = 'psychologue'

urlpatterns = [ 
    path('signupPsychologue/',SignupPsyView.as_view(),name='psychosignup'),
     path("psychologuedetail/<int:user_id>/",PsychoDetail.as_view(),name="psydetail")
   
    
]