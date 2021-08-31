from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer
from .models import User
from django.core.validators import RegexValidator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "url",
            "slug",
            "id",
            "username",
            "email",
            "phone_number",
            "first_name",
            "last_name",
            "about",
            "profile_picture",
            "is_staff",
            "is_active",
            "last_login",
            "date_joined",
        ]
        read_only_fields = [
            "is_staff",
            "is_active",
            "last_login",
            "date_joined",
        ]
        extra_kwargs = {"url": {"lookup_field": "slug"}}


class UserDetailsSerializer(UserDetailsSerializer):
    profile_picture = serializers.ImageField()
    about = serializers.CharField(max_length=500)
    phone_regex = RegexValidator(
        regex=r"\+234\d{10}$",
        message="Phone number must be entered in the format: '+2348012345678'. A '+' and up to 13 digits allowed.",
    )
    phone_number = serializers.CharField(
        validators=[phone_regex], max_length=14)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            "slug",
            "profile_picture",
            "about",
            "phone_number",
        )

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("user", {})
        profile_picture = profile_data.get("profile_picture")
        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.user
        if profile_data and profile_picture:
            profile.profile_picture = profile_picture
            profile.save()
        return instance
