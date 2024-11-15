from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SemesterViewSet,
    CoursesViewSet,
    LecturerViewSet,
    ClassesViewSet,
    CollegeDayViewSet,
    StudentsViewSet,
    EnrollmentViewSet,
    AttendanceViewSet,
    LClassesViewSet,
    StudentAttendanceViewSet,
)

# Initialize the router
router = DefaultRouter()
router.register(r'semesters', SemesterViewSet)
router.register(r'courses', CoursesViewSet)
router.register(r'lecturers', LecturerViewSet)
router.register(r'classes', ClassesViewSet)
router.register(r'college_days', CollegeDayViewSet)
router.register(r'students', StudentsViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'l_classes', LClassesViewSet)
router.register(r'student_attendance', StudentAttendanceViewSet, basename='student_attendance')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
   # path('upload_students/', upload_students, name='upload_students'),

]
