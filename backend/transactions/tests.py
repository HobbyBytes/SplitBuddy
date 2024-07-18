from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth.models import User
from transactions.models import Currency, Transaction


class Test_Create_Currency(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        test_currency = Currency.objects.create(currency="INR")

    def test_currency(self):
        currency = Currency.objects.get(id=1)

        # self.assertEqual(currency, "INR")
        self.assertEqual(str(currency), "INR")


class Test_Create_Transaction(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        test_currency = Currency.objects.create(currency="INR")
        test_user1 = User.objects.create_user(
            username="test_user1", password="123456789"
        )
        test_transaction = Transaction.objects.create(
            currency_id=1,
            title="Test Currency 1",
            amount=1234.56,
            description="This is a long description of the transaction",
            owner_id=1,
        )

    def test_transaction(self):
        currency = Currency.objects.get(id=1)
        transaction = Transaction.objects.get(id=1)

        title = f"{transaction.title}"
        amount = f"{transaction.amount}"
        currency = f"{transaction.currency}"
        description = f"{transaction.description}"
        owner = f"{transaction.owner}"

        self.assertEqual(owner, "test_user1")
        self.assertEqual(title, "Test Currency 1")
        self.assertEqual(float(amount), 1234.56)
        self.assertEqual(description, "This is a long description of the transaction")
        self.assertEqual(str(currency), "INR")


# Below are the API Test Cases
class TransactionTests(APITestCase):
    def test_view_transactions(self):
        url = reverse("transactions:listcreate")
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_transaction(self):
        self.test_currency = Currency.objects.create(currency="INR")
        self.testuser1 = User.objects.create_user(
            username="test_user1", password="123456789"
        )

        data = {
            "title": "new test",
            "owner": 1,
            "amount": 12345.67,
            "currency": 1,
            "description": "This is a long description for testing.",
        }

        url = reverse("transactions:listcreate")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
