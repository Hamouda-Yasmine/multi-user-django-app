# Generated by Django 5.0 on 2024-02-11 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('educateur', '0002_course_chapter_lesson_video'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='lesson',
            name='slug',
        ),
        migrations.AddField(
            model_name='lesson',
            name='date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='video',
            name='date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
    ]
