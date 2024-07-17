from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Currency(models.Model):
    currency = models.CharField(max_length=3)

    def __str__(self) -> str:
        return self.currency


# Create your models here.
class Transaction(models.Model):
    title = models.CharField(max_length=255, blank=False, null=False)
    amount = models.DecimalField(
        max_digits=7, decimal_places=2, null=False, blank=False
    )
    currency = models.ForeignKey(
        Currency, on_delete=models.PROTECT, default="USD", null=False, blank=False
    )
    timestamp = models.DateTimeField(default=timezone.now, null=False, blank=False)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="transactions",
        null=False,
        blank=False,
    )
