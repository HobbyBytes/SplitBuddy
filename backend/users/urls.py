from django.urls import path
from users.views import CustomUserCreate, AllUsers, CurrentUser

app_name = "users"

urlpatterns = [
    path("register/", CustomUserCreate.as_view(), name="create_user"),
    path("all/", AllUsers.as_view(), name="all"),
    path("current-user/", CurrentUser.as_view(), name="current"),
]
