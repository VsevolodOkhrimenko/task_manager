from rest_framework.serializers import ModelSerializer
from task_manager.task.models import Task


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = (
          "id",
          "name",
          "description",
          "user",
          "complete",
          "modified",
        )
        extra_kwargs = {
          'user':  {'read_only': True}
        }
