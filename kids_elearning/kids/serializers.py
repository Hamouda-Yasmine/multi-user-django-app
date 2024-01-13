from rest_framework import serializers

from .models import Kids


class PostSerializer(serializers.ModelSerializer):
    

    class Meta:
        model =Kids
        fields ='__all__'