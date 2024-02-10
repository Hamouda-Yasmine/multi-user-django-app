from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from user.models import User
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Educateur,Course
from rest_framework import generics, mixins, status
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.shortcuts import get_object_or_404
from user.tokens import create_jwt_pair_for_user
from django.utils.decorators import method_decorator
from user.serializers import UserSerializer
from .serializers import EducateurSerializer,CourseSerializer,ChapterSerializer
from .models import Chapter


#Signup View
@method_decorator(csrf_protect, name='dispatch')
class SignupEducateurView(APIView):
   #post the  signup educateur form
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
                        educateur
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
        

#View for updating and getting the Profile of educateur
class EducateurDetail(generics.RetrieveAPIView,  mixins.UpdateModelMixin,):
    queryset = Educateur.objects.all()
    serializer_class = EducateurSerializer
    #getting and updating the educateur by the user id
    lookup_field = 'user_id'

    def get(self, request: Request, *args, **kwargs):
     return self.retrieve(request, *args, **kwargs)
    
    def put(self, request: Request, *args, **kwargs):
     return self.update(request, *args, **kwargs)



#View to retrieve,update,delete Course 
class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


#View to retrieve courses by there id
class CourseRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


#View to retrieve courses by the educateur id 
class CourseListByEducateurView(generics.ListAPIView):
    serializer_class = CourseSerializer
    def get_queryset(self):
        educateur = self.kwargs['educateur']
        return Course.objects.filter(educateur=educateur)  
    
#View to retreive the chapters and lessons ,Videos of the cours
class CoursContent(APIView):
    
    def get(self,request:Request,cours_id:int,*args, **kwargs):
      chapters=Chapter.objects.all(pk=cours_id)
      
       
      data_serelized=ChapterSerializer(instance=chapters)
      response={
        "message":"post by id",
        "data":data_serelized.data}
      return Response(data=response,status=status.HTTP_200_OK)

