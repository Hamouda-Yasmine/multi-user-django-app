from django.urls import path

from . import views

urlpatterns = [
   #path('login/', login_view, name='login'),
   path('login/', views.LoginUserView.as_view(), name='login'),
    # Other common app URLs
]