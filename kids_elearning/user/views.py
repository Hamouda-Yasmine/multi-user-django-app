from django.contrib.auth import  login
from django.shortcuts import render, redirect
from .forms import CustomAuthenticationForm

def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)# set the session
            print(user.user_type, 'this is the type')
            return redirect(f'{user.user_type}:home')  # Redirect based on user type
    else:
        form = CustomAuthenticationForm()

    return render(request, 'user/login.html', {'form': form})