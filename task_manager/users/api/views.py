from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.mixins import (RetrieveModelMixin, DestroyModelMixin,
                                   ListModelMixin, UpdateModelMixin,
                                   CreateModelMixin)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from .serializers import UserSerializer

User = get_user_model()


class UserViewSet(RetrieveModelMixin, DestroyModelMixin,
                  ListModelMixin, UpdateModelMixin,
                  CreateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self, *args, **kwargs):
        return User.objects.filter(id=self.request.user.id)

    def get_permissions(self):
        if self.action in ('create',):
            self.permission_classes = (AllowAny,)
        else:
            self.permission_classes = (IsAuthenticated,)
        return super(self.__class__, self).get_permissions()

    @action(detail=False, methods=["GET"])
    def me(self, request):
        serializer = self.serializer_class(
            request.user, context={"request": request})
        return Response(data=serializer.data)
