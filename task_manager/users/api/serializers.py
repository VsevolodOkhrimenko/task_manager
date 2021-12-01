from rest_framework.serializers import (ModelSerializer, CharField,
                                        ValidationError)
from task_manager.users.models import User


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True, min_length=8)
    password2 = CharField(write_only=True, min_length=8)

    def create(self, validated_data):
        if validated_data['password'] != validated_data['password2']:
            raise ValidationError({
                'password': ['Passwords are not equal'],
                'password2': ['Passwords are not equal']
            })
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            name=validated_data['name']
        )

        return user

    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "username",
            "email",
            "password",
            "password2"
        )
