from django.urls import path
from .views import mentor_list

urlpatterns = [
    path("mentors/", mentor_list),
]