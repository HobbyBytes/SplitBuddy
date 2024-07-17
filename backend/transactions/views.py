from rest_framework import generics

from transactions.models import Transaction
from transactions.serializers import TransactionSerializer


# Create your views here.
class TransactionList(generics.ListCreateAPIView):
    # you can get the query set with a custom object also - get the transasctions related to only one user
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionDetail(generics.RetrieveDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
