from django.contrib.auth import  login,authenticate

from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from .tokens import create_jwt_pair_for_user
from rest_framework import generics, mixins, status
from .serializers import UserSerializer




@method_decorator(csrf_protect, name='dispatch')
class LoginUserView(APIView):
 
 
 
 def post(self, request: Request,*args, **kwargs):
       
        username= request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            tokens = create_jwt_pair_for_user(user)
            user_serializer = UserSerializer(user)
            serialized_user = user_serializer.data

            response = {
                "message": "Login Successful",
                "tokens":tokens,
                "user": serialized_user,
            }
            
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            return Response(data={"message": "Invalid email or password"})




"""def login_view(request):
   
    form = CustomAuthenticationForm(request, data=request.POST)
    print(form.errors)
    if form.is_valid():
            print("login sec")
            user = form.get_user()
            login(request, user)# set the session
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            print(user.user_type, 'this is the type')
            return JsonResponse({"status": "success", "message": "Login successful"})
           # return redirect(f'{user.user_type}:home{user.user_type}')  # Redirect based on user type
    else:
         return JsonResponse({"status": "error"})
@csrf_exempt
def login_view(request:Request):
        username= request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            #tokens = create_jwt_pair_for_user(user)
            user_serializer = UserSerializer(user)
            serialized_user = user_serializer.data

            response = {
                "message": "Login Successful",
                
                "user": serialized_user,
            }
            
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            return Response(data={"message": "Invalid email or password"})""" 