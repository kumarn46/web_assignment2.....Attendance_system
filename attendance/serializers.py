from rest_framework import serializers
from .models import semester, Courses, lecturer, classes, CollegeDay, students, Enrollment, Attendance, l_classes

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = semester
        fields = ['id', 'semester_name', 'start_date', 'end_date']


class CoursesSerializer(serializers.ModelSerializer):
    semester_id = serializers.PrimaryKeyRelatedField(queryset=semester.objects.all(), source='semester')

    class Meta:
        model = Courses
        fields = ['id', 'course_code', 'course_name', 'semester_id']


class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = lecturer
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'email']


class ClassesSerializer(serializers.ModelSerializer):
    course_code = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())
    lecturer = serializers.PrimaryKeyRelatedField(queryset=lecturer.objects.all())
    semester = serializers.PrimaryKeyRelatedField(queryset=semester.objects.all())

    class Meta:
        model = classes
        fields = ['id', 'class_number', 'course_code', 'lecturer', 'semester', 'class_time']


class CollegeDaySerializer(serializers.ModelSerializer):
    class_instance = ClassesSerializer()  # Nested serializer to display class details

    class Meta:
        model = CollegeDay
        fields = ['id', 'class_instance', 'date']


class StudentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = students
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'email']


class EnrollmentSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(queryset=students.objects.all())
    course_code = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())
    #class_number = serializers.PrimaryKeyRelatedField(queryset=classes.objects.all())


    class Meta:
        model = Enrollment
        fields = ['id', 'students', 'course_code', 'enrollment_date']




class AttendanceSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=students.objects.all())
    class_instance = serializers.PrimaryKeyRelatedField(queryset=classes.objects.all())

    class Meta:
        model = Attendance
        fields = ['student', 'class_instance', 'is_present']


class LClassesSerializer(serializers.ModelSerializer):
    semester = serializers.PrimaryKeyRelatedField(queryset=semester.objects.all())
    course_code = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())
    classes = serializers.PrimaryKeyRelatedField(queryset=classes.objects.all())

    class Meta:
        model = l_classes
        fields = ['id', 'semester', 'course_code', 'classes', 'class_time']
