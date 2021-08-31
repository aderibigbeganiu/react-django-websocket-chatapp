from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = (
        "email",
        "username",
    )
    list_filter = ("is_active", "is_staff")
    ordering = ("-date_joined",)
    list_display = ("email", "username", "is_active", "date_joined")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "slug",
                    "email",
                    "phone_number",
                    "username",
                    "first_name",
                    "last_name",
                    "password",
                )
            },
        ),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
        ("Personal", {"fields": ("about", "profile_picture")}),
        ("Activity", {"fields": ("date_joined", "last_login")}),
    )

    formfield_overrides = {
        User.about: {"widget": Textarea(attrs={"rows": 10, "cols": 40})},
    }

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "about",
                    "profile_picture",
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )


admin.site.register(User, UserAdminConfig)
