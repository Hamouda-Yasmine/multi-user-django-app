from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def psychologue_home(request):
  
    return render(request, 'psychologue/psychologue_home.html', {'user': request.user, 'user_type': 'psychologue'})

