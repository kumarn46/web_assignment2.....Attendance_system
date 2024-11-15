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
#from .permissions import IsAdmin, IsLecturer, IsStudent
import pandas as pd


# ViewSet for Semester
class SemesterViewSet(viewsets.ModelViewSet):
    queryset = semester.objects.all()
    serializer_class = SemesterSerializer
    #permission_classes = [IsAuthenticated]


# ViewSet for Courses
class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    #permission_classes = [IsAuthenticated]


# ViewSet for Lecturer
class LecturerViewSet(viewsets.ModelViewSet):
    queryset = lecturer.objects.all()
    serializer_class = LecturerSerializer
    #permission_classes = [IsAuthenticated]


# ViewSet for Classes
class ClassesViewSet(viewsets.ModelViewSet):
    queryset = classes.objects.all()
    serializer_class = ClassesSerializer
    #permission_classes = [IsAuthenticated]

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
    #permission_classes = [IsAuthenticated]


# ViewSet for Students
class StudentsViewSet(viewsets.ModelViewSet):
    queryset = students.objects.all()
    serializer_class = StudentsSerializer
    #permission_classes = [IsAuthenticated]

    def upload_students(request):
        if request.method == 'POST' and request.FILES['file']:
            file = request.FILES['file']
            fs = FileSystemStorage()
            filename = fs.save(file.name, file)
            uploaded_file_url = fs.url(filename)

            try:
                wb = load_workbook(fs.open(filename))
                sheet = wb.active

                for row in sheet.iter_rows(min_row=2, values_only=True):  # Assuming first row is headers
                    student_id, first_name, last_name = row
                    # Check if the student already exists
                    student, created = Student.objects.get_or_create(
                        student_id=student_id,
                        defaults={'first_name': first_name, 'last_name': last_name}
                    )
                    if created:
                        print(f"Student {first_name} {last_name} added.")
                    else:
                        print(f"Student {first_name} {last_name} already exists.")

                messages.success(request, 'Students uploaded successfully.')
                return redirect('dashboard')
            except Exception as e:
                messages.error(request, f"Error processing file: {e}")
                return redirect('upload_students')

        return render(request, 'upload_students.html', {'form': UploadFileForm()})


# ViewSet for Enrollment
class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    #permission_classes = [IsAuthenticated]


# ViewSet for Attendance
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    #permission_classes = [IsAuthenticated]

def email_students_with_poor_attendance(request):
    if request.method == 'POST':
        form = EmailAttendanceForm(request.POST)
        if form.is_valid():
            threshold = form.cleaned_data['threshold']
            students_with_poor_attendance = Attendance.objects.filter(is_present=False).values(
                'student_id').annotate(present_count=Count('id')).filter(present_count <= threshold)

            if students_with_poor_attendance.exists():
                student_ids = [item['student_id'] for item in students_with_poor_attendance]
                students = Student.objects.filter(id__in=student_ids)

                for student in students:
                    send_mail(
                        'Poor Attendance Alert',
                        f'Dear {student.first_name},\n\nYou have been marked absent {student.attendance.filter(is_present=False).count()} times recently. Please address this concern.',
                        'no-reply@school.com',
                        [student.email],
                        fail_silently=False,
                    )
                    print(f"Email sent to {student.email}")

                messages.success(request, 'Emails sent successfully.')
                return redirect('dashboard')
            else:
                messages.info(request, 'No students with poor attendance found.')
                return redirect('dashboard')
        else:
            messages.error(request, 'Invalid form data.')
            return redirect('email_students_with_poor_attendance')

    return render(request, 'email_students_with_poor_attendance.html', {'form': EmailAttendanceForm()})


# ViewSet for LClasses
class LClassesViewSet(viewsets.ModelViewSet):
    queryset = l_classes.objects.all()
    serializer_class = LClassesSerializer
    #permission_classes = [IsAuthenticated]




