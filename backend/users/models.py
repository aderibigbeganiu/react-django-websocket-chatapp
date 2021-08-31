from django.core.validators import RegexValidator
from django.template.defaultfilters import slugify
from django.db import models
from django.utils import timezone
# from PIL import Image
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

import environ

env = environ.Env()


class CustomAccountManager(BaseUserManager):
    def create_user(self, email, username, password, **other_fields):
        if not email:
            raise ValueError(_("You must provide an email address"))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password, **other_fields):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff=True")

        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned to is_superuser=True")
        return self.create_user(email, username, password, **other_fields)


class User(AbstractBaseUser, PermissionsMixin):
    slug = models.SlugField(blank=True)
    email = models.EmailField(_("email address"), unique=True)
    phone_regex = RegexValidator(
        regex=r"\+234\d{10}$",
        message="Phone number must be entered in the format: '+2348012345678'. A '+' and up to 13 digits allowed.",
    )
    phone_number = models.CharField(
        validators=[phone_regex], max_length=14, unique=True, null=True
    )
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True)
    about = models.TextField(_("about"), max_length=500, blank=True)
    profile_picture = models.ImageField(
        default="profile_picture/default_profile_picture.png",
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    REQUIRED_FIELDS = ["email"]
    USERNAME_FIELD = "username"

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.username)

        super(User, self).save(*args, **kwargs)
