from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def educateur_home(request):
    # Your view logic goes here
    return render(request, 'educateur/educateur_home.html', {'user': request.user, 'user_type': 'educateur'})
# Create your views here.
