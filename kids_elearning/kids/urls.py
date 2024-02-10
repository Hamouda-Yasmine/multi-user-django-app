from django.urls import path
from .views import SignupKidsView,KidsDetail

app_name = 'kids'

urlpatterns = [

    path('signupKids/',SignupKidsView.as_view(),name='signupKids'),
    path("kidsdetail/<int:user_id>/",KidsDetail.as_view(),name="kidsdetail")
   
]