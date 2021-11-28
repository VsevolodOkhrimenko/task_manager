from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import APIException
from rest_framework.authtoken.models import Token


class UnauthorizedException(APIException):
    """
    Enforce to return 401 Response code to handle authentification
    on frontend
    """

    status_code = 401
    default_detail = 'Token authentication failed'
    default_code = 'unauthorized'


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.select_related('user').get(key=key)
        except Token.DoesNotExist:
            raise UnauthorizedException('Invalid token')
        if not token.user.is_active:
            raise UnauthorizedException('User inactive or deleted')
        return token.user, token
