from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.mixins import (RetrieveModelMixin, DestroyModelMixin,
                                   ListModelMixin, UpdateModelMixin,
                                   CreateModelMixin)
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from task_manager.task.models import Task
from task_manager.utils.paginators import OffsetPagination
from .serializers import TaskSerializer


class TaskViewSet(RetrieveModelMixin, DestroyModelMixin,
                  ListModelMixin, UpdateModelMixin,
                  CreateModelMixin, GenericViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    pagination_class = OffsetPagination

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)

    def perform_create(self, serializer, *args, **kwargs):
        user = self.request.user
        return serializer.save(user=user)

    @action(detail=True, methods=["POST"])
    def complete(self, request, pk=None):
        task = get_object_or_404(self.get_queryset(), pk=pk)
        data = request.data
        complete = data.get('complete', False)
        task.complete = complete
        task.save()
        serializer = self.get_serializer(
          task, many=False, context={'request': request})
        return Response(serializer.data)
