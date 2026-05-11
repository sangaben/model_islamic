# admissions/views.py
from rest_framework import status, viewsets, permissions, filters
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django_filters.rest_framework import DjangoFilterBackend
from .models import AdmissionApplication, ApplicationNotification, FeeStructure, AdmissionRequirement, Inquiry
from .serializers import (
    AdmissionApplicationSerializer, 
    FeeStructureSerializer, 
    AdmissionRequirementSerializer, 
    InquirySerializer
)
#import africastalking
import uuid
from datetime import datetime
import logging

# Set up logging
logger = logging.getLogger(__name__)

# Initialize Africa's Talking (with error handling)
try:
    africastalking.initialize(
        username=settings.AFRICASTALKING_USERNAME,
        api_key=settings.AFRICASTALKING_API_KEY
    )
    sms = africastalking.SMS
    sms_available = True
except Exception as e:
    logger.warning(f"Africa's Talking initialization failed: {e}")
    sms_available = False
    sms = None

# ==================== VIEWSETS ====================

class StudentApplicationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing student applications.
    """
    queryset = AdmissionApplication.objects.all().order_by('-application_date')
    serializer_class = AdmissionApplicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'program', 'campus', 'boarding_status']
    search_fields = ['first_name', 'last_name', 'email', 'application_ref', 'phone_number']
    ordering_fields = ['application_date', 'last_updated', 'first_name', 'last_name']
    
    def perform_create(self, serializer):
        # Generate application reference if not provided
        application_ref = f"OAS-{datetime.now().year}-{uuid.uuid4().hex[:6].upper()}"
        serializer.save(application_ref=application_ref, status='pending')
    
    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        """Custom action to update application status"""
        application = self.get_object()
        new_status = request.data.get('status')
        
        if new_status in dict(AdmissionApplication.STATUS_CHOICES):
            application.status = new_status
            application.save()
            
            # Create notification
            ApplicationNotification.objects.create(
                application=application,
                notification_type='status_change',
                message=f'Application status changed to {application.get_status_display()}'
            )
            
            return Response({'success': True, 'status': application.status})
        
        return Response({'success': False, 'message': 'Invalid status'}, status=400)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get application statistics"""
        total = self.queryset.count()
        pending = self.queryset.filter(status='pending').count()
        approved = self.queryset.filter(status='approved').count()
        reviewed = self.queryset.filter(status='review').count()
        rejected = self.queryset.filter(status='rejected').count()
        
        today = datetime.now().date()
        today_apps = self.queryset.filter(application_date__date=today).count()
        
        return Response({
            'total': total,
            'pending': pending,
            'approved': approved,
            'reviewed': reviewed,
            'rejected': rejected,
            'today': today_apps
        })

class FeeStructureViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing fee structures.
    """
    queryset = FeeStructure.objects.filter(is_active=True)
    serializer_class = FeeStructureSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['campus', 'program', 'class_level', 'academic_year', 'is_active']
    search_fields = ['campus', 'program', 'class_level']

class AdmissionRequirementViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing admission requirements.
    """
    queryset = AdmissionRequirement.objects.all()
    serializer_class = AdmissionRequirementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['campus', 'program']
    search_fields = ['program', 'requirement']

class InquiryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing inquiries.
    """
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['inquiry_type', 'is_read']
    search_fields = ['name', 'email', 'message']
    
    def perform_create(self, serializer):
        serializer.save()
    
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        """Mark inquiry as read"""
        inquiry = self.get_object()
        inquiry.is_read = True
        inquiry.save()
        return Response({'success': True})

# ==================== FUNCTION-BASED VIEWS ====================

# admissions/views.py
import traceback
# admissions/views.py - Replace your submit_application function with this:

# admissions/views.py - Update the submit_application function

@api_view(['POST'])
def submit_application(request):
    try:
        print("=" * 50)
        print("Received application submission")
        print("Request data keys:", list(request.data.keys()))
        print("Request FILES keys:", list(request.FILES.keys()))
        print("=" * 50)
        
        # Generate application reference
        application_ref = f"OAS-{datetime.now().year}-{uuid.uuid4().hex[:6].upper()}"
        
        # Build data dictionary
        data = {}
        
        # Copy all non-file fields from request.data
        for key, value in request.data.items():
            # Handle boolean values properly
            if value == 'true':
                data[key] = True
            elif value == 'false':
                data[key] = False
            else:
                data[key] = value
        
        # Add file fields from request.FILES
        for key, value in request.FILES.items():
            data[key] = value
        
        print("Processed data keys:", list(data.keys()))
        
        # Create application
        serializer = AdmissionApplicationSerializer(data=data)
        if serializer.is_valid():
            print("✅ Serializer is valid")
            print("Validated data:", serializer.validated_data.keys())
            
            application = serializer.save(
                application_ref=application_ref,
                status='pending'
            )
            print(f"✅ Application saved with ref: {application_ref}")
            
            # Create notification for admin
            ApplicationNotification.objects.create(
                application=application,
                notification_type='new_application',
                message=f'New application received from {application.first_name} {application.last_name}'
            )
            
            # Send notifications (with error handling)
            try:
                send_email_notification(application)
            except Exception as e:
                print(f"Email notification failed: {e}")
            
            try:
                send_sms_notification(application)
            except Exception as e:
                print(f"SMS notification failed: {e}")
            
            return Response({
                'success': True,
                'applicationRef': application_ref,
                'message': 'Application submitted successfully'
            }, status=status.HTTP_201_CREATED)
        else:
            print("❌ Serializer errors:", serializer.errors)
            return Response({
                'success': False,
                'message': 'Invalid data',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        print("=" * 50)
        print("ERROR in submit_application:")
        print(str(e))
        import traceback
        traceback.print_exc()
        print("=" * 50)
        
        return Response({
            'success': False,
            'message': f'Server error: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['GET'])
def check_application_status(request):
    """Check application status by reference or email"""
    
    application_ref = request.GET.get('application_ref')
    email = request.GET.get('email')
    
    if not application_ref and not email:
        return Response({
            'success': False,
            'message': 'Please provide either application reference or email'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        if application_ref:
            application = AdmissionApplication.objects.get(application_ref=application_ref)
        else:
            application = AdmissionApplication.objects.filter(email=email).latest('application_date')
        
        serializer = AdmissionApplicationSerializer(application)
        
        # Add display fields
        data = serializer.data
        data['status_display'] = application.get_status_display()
        data['program_display'] = application.get_program_display()
        data['campus_display'] = application.get_campus_display()
        data['full_name'] = application.full_name
        
        return Response({
            'success': True,
            'application': data
        })
        
    except AdmissionApplication.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Application not found. Please check your reference number or email.'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_admissions_data(request):
    """Get combined admissions data for frontend"""
    
    campus = request.GET.get('campus')
    program = request.GET.get('program')
    
    # Filter fees
    fees = FeeStructure.objects.filter(is_active=True)
    if campus:
        fees = fees.filter(campus=campus)
    if program:
        fees = fees.filter(program=program)
    
    # Filter requirements
    requirements = AdmissionRequirement.objects.all()
    if campus and campus != 'all':
        requirements = requirements.filter(campus__in=[campus, 'all'])
    
    return Response({
        'success': True,
        'data': {
            'fees': FeeStructureSerializer(fees, many=True).data,
            'requirements': AdmissionRequirementSerializer(requirements, many=True).data,
            'campuses': [
                {'value': 'main', 'label': 'Main Campus - Abirichi'},
                {'value': 'annex', 'label': 'Annex Campus - Arua'},
                {'value': 'muni', 'label': 'Muni Campus'},
                {'value': 'golden-brain', 'label': 'Golden Brain - Koboko'},
            ],
            'programs': [
                {'value': 'early-childhood', 'label': 'Early Childhood'},
                {'value': 'primary', 'label': 'Primary School'},
                {'value': 'secondary', 'label': 'Secondary School'},
                {'value': 'vocational', 'label': 'Vocational Programs'},
            ]
        }
    })

# ==================== NOTIFICATION FUNCTIONS ====================

def send_email_notification(application):
    """Send email notifications to applicant and admin"""
    
    # Send to applicant
    applicant_subject = f'Application Received - {application.application_ref}'
    applicant_message = f"""
    Dear {application.first_name},
    
    Thank you for applying to Oasis Schools Arua.
    
    Application Details:
    --------------------
    Reference Number: {application.application_ref}
    Full Name: {application.full_name}
    Program: {application.get_program_display()}
    Campus: {application.get_campus_display()}
    Date Submitted: {application.application_date.strftime('%B %d, %Y')}
    
    Next Steps:
    -----------
    1. Your application is now under review
    2. Our admissions team will verify your documents
    3. You will receive an update within 3-5 working days
    
    Best regards,
    Admissions Office
    Oasis Schools Arua
    """
    
    send_mail(
        applicant_subject,
        applicant_message,
        settings.DEFAULT_FROM_EMAIL,
        [application.email],
        fail_silently=False,
    )
    
    # Send to admin
    admin_subject = f'New Application: {application.application_ref}'
    admin_message = f"""
    A new application has been submitted.
    
    Applicant: {application.first_name} {application.last_name}
    Reference: {application.application_ref}
    Program: {application.get_program_display()}
    Campus: {application.get_campus_display()}
    Email: {application.email}
    Phone: {application.phone_number}
    """
    
    send_mail(
        admin_subject,
        admin_message,
        settings.DEFAULT_FROM_EMAIL,
        [settings.ADMIN_EMAIL],
        fail_silently=False,
    )

def send_sms_notification(application):
    """Send SMS notifications if Africa's Talking is configured"""
    
    if not sms_available or not sms:
        logger.warning("SMS service not available")
        return
    
    try:
        # Send to applicant
        applicant_message = f"Oasis Schools: Your application ({application.application_ref}) has been received. We will contact you soon."
        sms.send(applicant_message, [application.phone_number])
        
        # Send to admin
        admin_message = f"New application: {application.first_name} {application.last_name} - {application.application_ref}"
        sms.send(admin_message, [settings.ADMIN_PHONE])
        
    except Exception as e:
        logger.error(f"SMS sending failed: {e}")