from django.conf import settings
from django.urls import include, path
from rest_framework.routers import DefaultRouter, SimpleRouter
from task_manager.users.api.views import UserViewSet
from task_manager.task.api.views import TaskViewSet


if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()


router.register('users', UserViewSet)
router.register('tasks', TaskViewSet)

app_name = 'api'
api_urls = [
  path(r'', include(router.urls)),
]

urlpatterns = [path(r'v1/', include(api_urls))]
