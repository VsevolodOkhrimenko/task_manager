import uuid
from django.contrib.auth.models import AbstractUser
from django.db.models import UUIDField, CharField


class User(AbstractUser):
    id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = CharField(blank=True, max_length=255)
