from rest_framework.permissions import BasePermission

'''
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.userprofile.role == 'admin'


class IsLecturer(BasePermission):
    def has_permission(self, request, view):
        return request.user.userprofile.role == 'lecturer'


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.userprofile.role == 'student'
        
        '''
        
