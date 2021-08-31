from users.models import User
from messenger.models import Room, Message
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
import json
from channels.db import database_sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def goc_room(self, label, name):
        # Get or create room
        room = Room.objects.get_or_create(label=label, name=name)
        return room

    @database_sync_to_async
    def get_room_instance(self):
        # Get room instance
        return Room.objects.all()[0]

    @database_sync_to_async
    def get_user_instance(self, user_id):
        # Get user instance
        user = User(id=user_id)
        return user

    @database_sync_to_async
    def new_message(self, room, sender, message):
        new_message = Message.objects.create(
            room=room,
            sender=sender,
            message=message)
        return new_message

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # add room to database
        await self.goc_room(self.room_group_name, self.room_name)

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Called when the socket closes
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        message = text_data_json['message']
        username = text_data_json['username']
        user_id = text_data_json['user_id']
        self.room_instance = await self.get_room_instance()
        self.user_instance = await self.get_user_instance(user_id)

        await self.new_message(self.room_instance, self.user_instance, message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Send message to Websocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
        }))
