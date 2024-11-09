from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import semester, Courses, lecturer, classes, CollegeDay, students, Enrollment, Attendance, l_classes
from .serializers import (
    SemesterSerializer,
    CoursesSerializer,
    LecturerSerializer,
    ClassesSerializer,
    CollegeDaySerializer,
    StudentsSerializer,
    EnrollmentSerializer,
    AttendanceSerializer,
    LClassesSerializer
)
from .permissions import IsAdmin, IsLecturer, IsStudent
import pandas as pd


# ViewSet for Semester
class SemesterViewSet(viewsets.ModelViewSet):
    queryset = semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Courses
class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Lecturer
class LecturerViewSet(viewsets.ModelViewSet):
    queryset = lecturer.objects.all()
    serializer_class = LecturerSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Classes
class ClassesViewSet(viewsets.ModelViewSet):
    queryset = classes.objects.all()
    serializer_class = ClassesSerializer
    permission_classes = [IsAuthenticated]

    '''

    @action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def enroll_student(self, request, pk=None):
        class_instance = self.get_object()
        student_id = request.data.get('student_id')
        try:
            student = students.objects.get(id=student_id)
            class_instance.students.add(student)
            return Response({"status": "student enrolled"})
        except students.DoesNotExist:
            return Response({"error": "student not found"}, status=404)
            
            '''


# ViewSet for CollegeDay
class CollegeDayViewSet(viewsets.ModelViewSet):
    queryset = CollegeDay.objects.all()
    serializer_class = CollegeDaySerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Students
class StudentsViewSet(viewsets.ModelViewSet):
    queryset = students.objects.all()
    serializer_class = StudentsSerializer
    permission_classes = [IsAuthenticated]

    '''
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            self.permission_classes = [IsAuthenticated, IsStudent]
        elif self.action == 'update' or self.action == 'partial_update':
            self.permission_classes = [IsAuthenticated, IsLecturer]
        return super().get_permissions()

    @action(detail=False, methods=['post'], permission_classes=[IsAdmin])
    def upload_students(self, request):
        file = request.FILES['file']
        try:
            df = pd.read_excel(file)
            for _, row in df.iterrows():
                students.objects.create(name=row['Name'], email=row['Email'])
            return Response({"status": "students uploaded"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)
            
            '''


# ViewSet for Enrollment
class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Attendance
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for LClasses
class LClassesViewSet(viewsets.ModelViewSet):
    queryset = l_classes.objects.all()
    serializer_class = LClassesSerializer
    permission_classes = [IsAuthenticated]
