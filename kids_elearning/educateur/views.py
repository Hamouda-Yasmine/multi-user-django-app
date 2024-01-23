from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from user.models import User
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Educateur
from rest_framework import generics, mixins, status
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from user.tokens import create_jwt_pair_for_user
from django.utils.decorators import method_decorator
from user.serializers import UserSerializer

@method_decorator(csrf_protect, name='dispatch')
class SignupEducateurView(APIView):
   
   def post(self, request:Request, *args, **kwargs):
      

        username= request.data.get("username")
        password = request.data.get("password")
        email=request.data.get("email")
        
        module = request.data.get("module")
       

        try:
           
                if User.objects.filter(username=username).exists():
                    return Response({ 'error': 'Username already exists' })
                else:
                    if len(password) < 6:
                        return Response({ 'error': 'Password must be at least 6 characters' })
                    else:
                        user = User.objects.create_user(username=username, password=password,email=email,user_type='educateur')

                        user = User.objects.get(id=user.id)

                        educateur = Educateur.objects.create(user=user,module=module)
                        tokens = create_jwt_pair_for_user(user)
                        user_serializer = UserSerializer(user)
                        serialized_user = user_serializer.data

                        response = {
                         "message": "Login Successful",
                         "tokens":tokens,
                         "user": serialized_user,
                                                  }
                        return Response(data=response, status=status.HTTP_201_CREATED)
            
              
        except:
                return Response({ 'error': 'Something went wrong when registering account' })