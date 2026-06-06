from django.urls import path
from .views import mentor_list_create, mentor_detail

urlpatterns = [
    path("", mentor_list_create),
    path("<int:pk>/", mentor_detail),
]