from django.db import models

class Mentor(models.Model):
    name = models.CharField(max_length=100)
    expertise = models.CharField(max_length=100)
    bio = models.TextField()

    def __str__(self):
        return self.name