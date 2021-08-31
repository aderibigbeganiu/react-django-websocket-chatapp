from django.core.checks import messages
from django.db import models
from django.db.models.base import Model
from django.db.models.fields.related import ForeignKey
from users.models import User


class Room(models.Model):
    name = models.CharField(max_length=50)
    label = models.SlugField(unique=True)

    def __str__(self):
        return self.label


class Message(models.Model):
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE, related_name='room')
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sender")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return self.sender.username + " : " + self.message
