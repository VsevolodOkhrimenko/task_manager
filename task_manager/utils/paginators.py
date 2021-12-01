from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


class OffsetPagination(LimitOffsetPagination):
    default_limit = 30
    max_limit = 30
    template = None

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'results': data
        })
