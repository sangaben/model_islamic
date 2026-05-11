# admissions/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'applications', views.StudentApplicationViewSet, basename='application')
router.register(r'fees', views.FeeStructureViewSet, basename='fee')
router.register(r'requirements', views.AdmissionRequirementViewSet, basename='requirement')
router.register(r'inquiries', views.InquiryViewSet, basename='inquiry')

urlpatterns = [
    # This includes all router URLs at the root of /api/admissions/
    path('', include(router.urls)),
    
    # These should be at /api/admissions/apply/, etc.
    path('apply/', views.submit_application, name='submit_application'),
    path('status/', views.check_application_status, name='check_application_status'),
    path('data/', views.get_admissions_data, name='admissions-data'),
]