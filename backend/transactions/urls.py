from django.urls import path

from transactions.views import TransactionList, TransactionDetail

app_name = "transactions"

urlpatterns = [
    path("<int:pk>/", TransactionDetail.as_view(), name="detailcreate"),
    path("", TransactionList.as_view(), name="listcreate"),
]
