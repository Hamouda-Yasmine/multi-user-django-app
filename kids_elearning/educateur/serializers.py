from rest_framework import serializers

from .models import Educateur


class PostSerializer(serializers.ModelSerializer):
    

    class Meta:
        model =Educateur
        fields ='__all__'