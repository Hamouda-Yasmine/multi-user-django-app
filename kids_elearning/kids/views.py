from django.contrib.auth.decorators import login_required
from user.models import User
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from django.shortcuts import get_object_or_404
from rest_framework import generics, mixins, status
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from user.tokens import create_jwt_pair_for_user
from django.utils.decorators import method_decorator
from user.serializers import UserSerializer
from .serializers import *

@method_decorator(csrf_protect, name='dispatch')
class SignupKidsView(APIView):
   def post(self, request:Request, *args, **kwargs):
        username= request.data.get("username")
        password = request.data.get("password")
        email=request.data.get("email")
        maladie = request.data.get("maladie")
       

        try:
           
                if User.objects.filter(username=username).exists():
                    return Response({ 'error': 'Username already exists' })
                else:
                    if len(password) < 8:
                        return Response({ 'error': 'Password must be at least 8 characters' })
                    else:
                        user = User.objects.create_user(username=username, password=password,email=email,user_type='kids')

                        user = User.objects.get(id=user.id)

                        kid = Kids.objects.create(user=user,maladie=maladie)
                        tokens = create_jwt_pair_for_user(user)
                        user_serializer = UserSerializer(user)
                        serialized_user = user_serializer.data

                        response = {
                         "message": "user created ",
                         "tokens":tokens,
                         "user": serialized_user,
                                                  }
                        return Response(data=response, status=status.HTTP_201_CREATED)
            
              
        except:
                response ={ 'error': 'Something went wrong when registering account' } 
                return Response(date=response,status=status.HTTP_400_BAD_REQUEST)

class KidsDetail(generics.RetrieveAPIView,mixins.UpdateModelMixin,):
    queryset = Kids.objects.all()
    serializer_class = KidsSerializer
    #getting the kid by the user id
    lookup_field = 'user_id'

    def get(self, request: Request, *args, **kwargs):
     return self.retrieve(request, *args, **kwargs)
    
    def put(self, request: Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    
class CreateTakenCourse(generics.CreateAPIView):
    queryset = TakenCourse.objects.all()
    serializer_class = TakenCourseSerializer 


class CourseProgressView(generics.ListCreateAPIView):
    queryset = CourseProgress.objects.all()
    serializer_class = CourseProgressSerializer

    def get_queryset(self):
        kid_id = self.kwargs.get('kid_id')
        course_id = self.kwargs.get('course_id')
        taken_course = get_object_or_404(TakenCourse, kid=kid_id, course=course_id)
        return CourseProgress.objects.filter(id=taken_course.progress_id)