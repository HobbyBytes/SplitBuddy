from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.serializers import RegisterUserSerializer
from users.models import CustomUser
from users.serializers import UsersSerializer


# Create your views here.
class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        req_serializer = RegisterUserSerializer(data=request.data)
        if req_serializer.is_valid():
            new_user = req_serializer.save()
            if new_user:
                # to login the user immediately after signup
                # r=requests.post('http://127.0.0.1:8000/auth/token', data = {
                #     'username':new_user.email,
                #     'password':request.data['password'],
                #     'client_id':'Your Client ID',
                #     'client_secret':'Your Client Secret',
                #     'grant_type':'password'
                # })
                # return Response(r.json(),status=status.HTTP_201_CREATED)
                return Response(status=status.HTTP_201_CREATED)
        return Response(req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllUsers(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = UsersSerializer


class CurrentUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsersSerializer(self.request.user)
        return Response(serializer.data)
