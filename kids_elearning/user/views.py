from django.contrib.auth import  login,authenticate
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from .tokens import create_jwt_pair_for_user
from rest_framework import generics, mixins, status
from rest_framework.generics import ListAPIView
from .serializers import UserSerializer
from .models import User
from educateur import models as me, serializers as se
from kids import models as mk, serializers as sk
from psychologue import models as mp,serializers as sp




@method_decorator(csrf_exempt, name='dispatch')
class LoginUserView(APIView):
 permission_classes = [AllowAny]
 
 
 def post(self, request: Request,*args, **kwargs):
       
        username= request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            tokens = create_jwt_pair_for_user(user)
            user_serializer = UserSerializer(user)
            serialized_user = user_serializer.data
            match user.user_type:
             case "educateur":
               data = me.Educateur.objects.get(user_id=user.id)  
               serialized_data=se.EducateurSerializer(data).data
             case "kids":
               data = mk.Kids.objects.get(user_id=user.id)  
               serialized_data=sk.KidsSerializer(data).data
             case "psychologe":
               data = mp.Psychologue.objects.get(user_id=user.id)  
               serialized_data=sp.PsySerializer(data).data
            
                

            response = {
                "message": "Login Successful",
                "tokens":tokens,
                "user": serialized_user,
                "data":serialized_data,
            }
            
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            return Response(data={"message": "Invalid email or password"})

@method_decorator(csrf_protect, name='dispatch')
class UserRetrieveUpdateDeleteView(
    generics.GenericAPIView,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = UserSerializer
    queryset = User.objects.all()
   

    def get(self, request: Request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request: Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request: Request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

"""class view to retrieve all courses that exist in the data"""
class AllCoursesRetrieve(ListAPIView):
    queryset = me.Course.objects.all()
    serializer_class = se.CourseSerializer