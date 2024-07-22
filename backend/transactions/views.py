import logging
from rest_framework import generics
from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
    IsAdminUser,
    IsAuthenticated,
    DjangoModelPermissionsOrAnonReadOnly,
    DjangoModelPermissions,
)

from transactions.models import Transaction
from transactions.serializers import TransactionSerializer

logger = logging.getLogger(__name__)


class TransactionUserPermission(BasePermission):
    edit_methods = ("PUT", "PATCH")

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        if obj.owner == request.user:
            return True

        if request.user.is_staff and request.method not in self.edit_methods:
            return True

        return obj.owner == request.user


# Create your views here.
class TransactionList(generics.ListCreateAPIView):
    # permission_classes = [TransactionUserPermission]
    permission_classes = [IsAuthenticated]
    # queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        # allowing the transactions to be visible to only the owner
        # you can get the query set with a custom object also - get the transasctions related to only one user
        return Transaction.objects.filter(owner=self.request.user)


class TransactionDetail(
    generics.RetrieveUpdateDestroyAPIView, TransactionUserPermission
):
    permission_classes = [TransactionUserPermission]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        # allowing the transactions to be editable to only the owner
        return Transaction.objects.filter(owner=self.request.user)
