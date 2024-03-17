from rest_framework import serializers

from .models import Kids,TakenCourse,CourseProgress


class KidsSerializer(serializers.ModelSerializer):
    class Meta:
        model =Kids
        fields ='__all__'

class TakenCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model =TakenCourse
        fields ='__all__'
        
class CourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model =CourseProgress
        fields ='__all__'