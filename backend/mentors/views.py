from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Mentor
from .serializers import MentorSerializer


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def mentor_list_create(request):

    if request.method == "GET":
        mentors = Mentor.objects.all()
        serializer = MentorSerializer(mentors, many=True)
        return Response(serializer.data)

    serializer = MentorSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def mentor_detail(request, pk):

    try:
        mentor = Mentor.objects.get(pk=pk)
    except Mentor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = MentorSerializer(mentor)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = MentorSerializer(mentor, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    mentor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)