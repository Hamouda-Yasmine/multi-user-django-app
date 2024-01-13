from rest_framework import serializers

from .models import Psychologue


class PostSerializer(serializers.ModelSerializer):
    

    class Meta:
        model =Psychologue
        fields ='__all__'