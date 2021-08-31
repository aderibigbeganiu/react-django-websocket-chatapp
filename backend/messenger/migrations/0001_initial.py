# Generated by Django 3.2.6 on 2021-08-25 13:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('label', models.SlugField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('handle', models.TextField()),
                ('message', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='messenger.room')),
            ],
        ),
    ]