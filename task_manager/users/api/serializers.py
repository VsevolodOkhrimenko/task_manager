from rest_framework.serializers import ModelSerializer
from task_manager.users.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "username",
            "email",
        )
