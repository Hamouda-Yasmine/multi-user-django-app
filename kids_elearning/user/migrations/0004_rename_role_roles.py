# Generated by Django 5.0 on 2024-01-02 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_role_id'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Role',
            new_name='Roles',
        ),
    ]