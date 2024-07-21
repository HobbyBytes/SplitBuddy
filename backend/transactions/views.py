from rest_framework import generics
from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
    IsAdminUser,
    DjangoModelPermissionsOrAnonReadOnly,
    DjangoModelPermissions,
)

from transactions.models import Transaction
from transactions.serializers import TransactionSerializer


class TransactionUserPermission(BasePermission):
    message = "Editing Transactions is restricted to the owner of the transaction."

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.owner == request.user


# Create your views here.
class TransactionList(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissions]
    # you can get the query set with a custom object also - get the transasctions related to only one user
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionDetail(
    generics.RetrieveUpdateDestroyAPIView, TransactionUserPermission
):
    permission_classes = [TransactionUserPermission]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
