from rest_auth.serializers import PasswordResetSerializer
from allauth.account.forms import ResetPasswordForm


class PasswordSerializer(PasswordResetSerializer):
    password_reset_form_class = ResetPasswordForm
