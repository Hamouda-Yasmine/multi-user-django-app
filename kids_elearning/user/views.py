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
from .serializers import UserSerializer
from .models import User




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

            response = {
                "message": "Login Successful",
                "tokens":tokens,
                "user": serialized_user,
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
   

    """def get(self, request: Request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)"""

    def put(self, request: Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request: Request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

