from django.template.defaultfilters import slugify
from rest_framework import viewsets
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.mail import send_mail


class UserViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "slug"

    def update(self, request, *arg, **kwargs):
        user_object = self.get_object()

        data = request.data

        user_object.slug = slugify(data["username"])
        # user_object.username = data["username"]
        # user_object.email = data["email"]
        # user_object.phone_number = data["phone_number"]
        # user_object.whatsapp_number = data["whatsapp_number"]
        # user_object.first_name = data["first_name"]
        # user_object.last_name = data["last_name"]
        # user_object.about = data["about"]
        if data["profile_picture"] != "":
            user_object.profile_picture = data["profile_picture"]

        fields = user_object._meta.fields
        exclude = ["profile_picture"]
        for field in fields:
            field = field.name.split(".")[-1]  # to get coulmn name
            if field in exclude:
                continue
            exec("user_object.%s = data.get(field, user_object.%s)" %
                 (field, field))
        serializer_context = {
            "request": request,
        }
        user_object.save()

        send_mail(
            f'Hello {user_object.username}',
            'Your profile has been updated successfully',
            'aderibigbeganiu@gmail.com',
            [user_object.email],
            fail_silently=False,
        )

        serializer = UserSerializer(user_object, context=serializer_context)
        return Response(serializer.data)
