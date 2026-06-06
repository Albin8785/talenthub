from rest_framework.test import APITestCase
from django.urls import reverse
from backend.mentors.models import Mentor


class MentorAPITest(APITestCase):

    def setUp(self):
        self.mentor1 = Mentor.objects.create(
            name="John Doe",
            expertise="Python",
            bio="Python backend developer"
        )

        self.mentor2 = Mentor.objects.create(
            name="Jane Smith",
            expertise="Django",
            bio="Django expert"
        )

        # You will map this in urls.py
        self.url = "/api/mentors/"
    def test_mentor_list_api(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
    
    def test_mentor_response_fields(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)

        first_item = response.data[0]

        self.assertIn("name", first_item)
        self.assertIn("expertise", first_item)
        self.assertIn("bio", first_item)
        self.assertIn("id", first_item)
    
    def test_mentor_data_accuracy(self):
        response = self.client.get(self.url)

        names = [mentor["name"] for mentor in response.data]

        self.assertIn("John Doe", names)
        self.assertIn("Jane Smith", names)