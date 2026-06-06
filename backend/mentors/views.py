from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Mentor
from .serializers import MentorSerializer

@api_view(["GET"])
def mentor_list(request):
    mentors = Mentor.objects.all()

    serializer = MentorSerializer(
        mentors,
        many=True
    )

    return Response(serializer.data)