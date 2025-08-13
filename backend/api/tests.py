"""Unit tests for the API views and serializers."""

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "loanmate.settings")

import django
django.setup()

from django.contrib.auth import get_user_model  # noqa: E402
from rest_framework.test import APITestCase  # noqa: E402

from .models import LoanRequest  # noqa: E402


class LoanRequestDeletionPermissionTests(APITestCase):
    """Ensure users cannot delete loan requests that aren't theirs."""
    def setUp(self):
        CustomUser = get_user_model()
        self.user1 = CustomUser.objects.create_user(
            email="u1@example.com",
            password="pass",
            nome="u1",
            cognome="u1",
            citta="c",
            via="v",
            telefono="1",
            carta_identita="ci1",
        )
        self.user2 = CustomUser.objects.create_user(
            email="u2@example.com",
            password="pass",
            nome="u2",
            cognome="u2",
            citta="c",
            via="v",
            telefono="2",
            carta_identita="ci2",
        )
        self.request = LoanRequest.objects.create(
            user=self.user1, importo=1000, motivo="test"
        )

    def test_cannot_delete_other_users_request(self):
        self.client.force_authenticate(user=self.user2)
        url = f"/api/loan-requests/{self.request.pk}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 403)


class LoanRequestUserSerializationTests(APITestCase):
    """Verify that loan request listing includes user details."""
    def setUp(self):
        CustomUser = get_user_model()
        self.user = CustomUser.objects.create_user(
            email="test@example.com",
            password="pass",
            nome="nome",
            cognome="cognome",
            citta="citta",
            via="via",
            telefono="123",
            carta_identita="ci",
        )
        self.client.force_authenticate(user=self.user)
        res = self.client.post(
            "/api/loan-requests/",
            {"importo": 500, "motivo": "motivo"},
            format="json",
        )
        assert res.status_code == 201, res.content
        self.req = LoanRequest.objects.get()

    def test_user_fields_returned_in_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get("/api/loan-requests/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        lr = data[0]
        self.assertIn("user", lr)
        user_data = lr["user"]
        for field in [
            "id",
            "email",
            "nome",
            "cognome",
            "citta",
            "via",
            "telefono",
            "carta_identita",
        ]:
            self.assertIn(field, user_data)
        self.assertEqual(user_data["nome"], "nome")
        self.assertNotIn("password", user_data)

    def test_snapshot_persists_after_user_update(self):
        self.client.force_authenticate(user=self.user)
        self.user.nome = "changed"
        self.user.save()
        response = self.client.get("/api/loan-requests/")
        data = response.json()[0]
        self.assertEqual(data["user"]["nome"], "nome")

    def test_new_request_uses_updated_profile(self):
        self.client.force_authenticate(user=self.user)
        self.user.nome = "changed"
        self.user.save()
        res = self.client.post(
            "/api/loan-requests/",
            {"importo": 200, "motivo": "secondo"},
            format="json",
        )
        self.assertEqual(res.status_code, 201)
        response = self.client.get("/api/loan-requests/")
        names = [r["user"]["nome"] for r in response.json()]
        self.assertEqual(names, ["nome", "changed"])

class UserProfileTests(APITestCase):
    """Tests for the user profile endpoints."""

    def setUp(self):
        CustomUser = get_user_model()
        self.user = CustomUser.objects.create_user(
            email="prof@example.com",
            password="pass",
            nome="Nome",
            cognome="Cognome",
            citta="Roma",
            via="Via 1",
            telefono="123",
            carta_identita="CI1",
        )

    def test_retrieve_profile(self):
        self.client.force_authenticate(user=self.user)
        res = self.client.get("/api/user/")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["email"], "prof@example.com")
        self.assertNotIn("password", data)

    def test_update_profile(self):
        self.client.force_authenticate(user=self.user)
        res = self.client.put(
            "/api/user/",
            {
                "nome": "Nuovo",
                "cognome": "Test",
                "citta": "Milano",
                "via": "Via 2",
                "telefono": "999",
                "carta_identita": "CI2",
                "password": "newpass",
            },
            format="json",
        )
        self.assertEqual(res.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.nome, "Nuovo")
        self.assertTrue(self.user.check_password("newpass"))
