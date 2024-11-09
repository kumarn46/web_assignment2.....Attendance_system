
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('lecturer', 'Lecturer'),
        ('student', 'Student'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.role}"
        

class semester(models.Model):
    id = models.AutoField(primary_key=True)
    semester_name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.semester_name
        

class Courses(models.Model):
    id = models.AutoField(primary_key=True)
    course_code = models.CharField(max_length=10, unique=True)
    course_name = models.CharField(max_length=100)
    semester = models.ForeignKey(semester, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return f"{self.course_code} - {self.course_name}"


class lecturer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class classes(models.Model):
    id = models.AutoField(primary_key=True)
    class_number = models.IntegerField(null=True)
    course_code = models.ForeignKey(Courses, on_delete=models.CASCADE, related_name='classes')
    lecturer = models.ForeignKey(lecturer, on_delete=models.SET_NULL, null=True,
                                 related_name='classes')
    semester = models.ForeignKey(semester, on_delete=models.CASCADE,
                                 related_name='classes')
    class_time = models.TimeField()

    def __str__(self):
        return f"{self.class_number} - {self.class_time}"


class CollegeDay(models.Model):
    id = models.AutoField(primary_key=True)
    class_instance = models.ForeignKey(classes, on_delete=models.CASCADE, related_name='college_day')
    date = models.DateField()

    def __str__(self):
        return f"{self.class_instance} - {self.date}"


class students(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.id} - {self.first_name} - {self.last_name}"


class Enrollment(models.Model):
    id = models.AutoField(primary_key=True)
    students = models.ForeignKey(students, on_delete=models.CASCADE, related_name='enrollment')
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, related_name='enrollment')
    classes = models.ForeignKey(classes, on_delete=models.CASCADE, related_name='enrollment')
    enrollment_date = models.DateField()

    def __str__(self):
        return f"{self.enrollment_date} - {self.classes}"


class Attendance(models.Model):
    student = models.ForeignKey('students', on_delete=models.CASCADE)
    class_instance = models.ForeignKey(classes, on_delete=models.CASCADE)
    is_present = models.BooleanField()

    def __str__(self):
        return f"{self.student} - {self.class_instance} - {'Present' if self.is_present else 'Absent'}"


class l_classes(models.Model):
    id = models.AutoField(primary_key=True)
    semester = models.ForeignKey(semester, on_delete=models.CASCADE, related_name='l_classes')
    course_code = models.ForeignKey(Courses, on_delete=models.CASCADE, related_name='l_classes')
    classes = models.ForeignKey(classes, on_delete=models.CASCADE, related_name='l_classes')
    class_time = models.TimeField()

    def __str__(self):
        return f"{self.course_code} - {self.classes} - {self.class_time}"
