import uuid
from django.db.models import (Model, UUIDField, CharField, TextField,
                              BooleanField, DateTimeField, ForeignKey, CASCADE)
from task_manager.users.models import User


class Task(Model):
    id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = CharField(max_length=255)
    description = TextField(max_length=1023, blank=True, null=True)
    user = ForeignKey(
      User, related_name='tasks', on_delete=CASCADE)
    complete = BooleanField(default=False)
    modified = DateTimeField(auto_now=True)
    created = DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
