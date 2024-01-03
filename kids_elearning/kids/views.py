from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def kids_home(request):
  
    return render(request, 'kids/kids_home.html', {'user': request.user, 'user_type': 'kids'})

