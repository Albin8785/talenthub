from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status


class AuthenticationTests(APITestCase):

    def test_register_user(self):

        data = {
            "username": "testuser",
            "email": "test@test.com",
            "password": "password123"
        }

        response = self.client.post(
            "/api/register/",
            data
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(
            User.objects.count(),
            1
        )

    def test_login(self):

        User.objects.create_user(
            username="testuser",
            password="password123"
        )

        response = self.client.post(
            "/api/login/",
            {
                "username": "testuser",
                "password": "password123"
            }
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertIn(
            "access",
            response.data
        )

    def test_profile_requires_auth(self):

        response = self.client.get(
            "/api/profile/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )