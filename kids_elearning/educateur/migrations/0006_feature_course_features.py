# Generated by Django 5.0 on 2024-02-27 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('educateur', '0005_alter_course_categorie'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='features',
            field=models.ManyToManyField(to='educateur.feature'),
        ),
    ]
