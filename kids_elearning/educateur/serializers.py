from rest_framework import serializers

from .models import Educateur,Course,Lesson,Video,Chapter,Feature


class EducateurSerializer(serializers.ModelSerializer):
     class Meta:
        model =Educateur
        fields ='__all__'

class LessonSerializer(serializers.ModelSerializer):
     class Meta:
        model =Lesson
        fields ='__all__'

class FeatureSerializer(serializers.ModelSerializer):
     class Meta:
        model =Feature
        fields ='__all__'
        
class CourseSerializer(serializers.ModelSerializer):
     features = FeatureSerializer(many=True, read_only=True)
     class Meta:
        model =Course
        fields ='__all__'

class ChapterSerializer(serializers.ModelSerializer):
     class Meta:
        model =Chapter
        fields ='__all__'
class VideoSerializer(serializers.ModelSerializer):
     class Meta:
        model =Video
        fields ='__all__'