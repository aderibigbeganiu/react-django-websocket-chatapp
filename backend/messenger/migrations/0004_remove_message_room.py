# Generated by Django 3.2.6 on 2021-08-25 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0003_remove_message_handle'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='room',
        ),
    ]
