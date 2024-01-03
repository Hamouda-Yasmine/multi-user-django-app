# Generated by Django 5.0 on 2024-01-02 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_alter_user_groups_alter_user_user_permissions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('kids', 'Kids'), ('admin', 'Admin'), ('psychologue', 'Psychologue'), ('educateur', 'Educateur')], max_length=20),
        ),
    ]