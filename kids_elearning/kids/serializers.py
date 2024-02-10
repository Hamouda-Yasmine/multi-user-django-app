from rest_framework import serializers

from .models import Kids


class KidsSerializer(serializers.ModelSerializer):
    

    class Meta:
        model =Kids
        fields ='__all__'