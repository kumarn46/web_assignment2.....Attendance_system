from django.contrib import admin

from attendance import models

# Register your models here.
admin.site.register(models.semester)
admin.site.register(models.Courses)
admin.site.register(models.lecturer)
admin.site.register(models.classes)
admin.site.register(models.students)
admin.site.register(models.Enrollment)
admin.site.register(models.Attendance)
admin.site.register(models.CollegeDay)
admin.site.register(models.l_classes)