# admissions/models.py
from django.db import models
from django.contrib.auth.models import User
import uuid

class AdmissionApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('review', 'Under Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('waitlisted', 'Waitlisted'),
    ]
    
    CAMPUS_CHOICES = [
        ('main', 'Main Campus - Abirichi'),
        ('annex', 'Annex Campus - Arua'),
        ('muni', 'Muni Campus'),
        ('golden-brain', 'Golden Brain - Koboko'),
    ]
    
    PROGRAM_CHOICES = [
        ('early-childhood', 'Early Childhood'),
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School'),
        ('vocational', 'Vocational Programs'),
    ]
    
    # Application Reference
    application_ref = models.CharField(max_length=20, unique=True)
    
    # Personal Information
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    nationality = models.CharField(max_length=50, default='Ugandan')
    religion = models.CharField(max_length=50, blank=True)
    
    # Contact Information
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    alternative_phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    district = models.CharField(max_length=50, default='Arua')
    
    # Parent/Guardian Information
    father_name = models.CharField(max_length=200, blank=True)
    father_occupation = models.CharField(max_length=100, blank=True)
    father_phone = models.CharField(max_length=15, blank=True)
    father_email = models.EmailField(blank=True)
    
    mother_name = models.CharField(max_length=200, blank=True)
    mother_occupation = models.CharField(max_length=100, blank=True)
    mother_phone = models.CharField(max_length=15, blank=True)
    mother_email = models.EmailField(blank=True)
    
    guardian_name = models.CharField(max_length=200, blank=True)
    guardian_relation = models.CharField(max_length=50, blank=True)
    guardian_phone = models.CharField(max_length=15, blank=True)
    guardian_email = models.EmailField(blank=True)
    
    # Emergency Contact
    emergency_name = models.CharField(max_length=200)
    emergency_relation = models.CharField(max_length=50)
    emergency_phone = models.CharField(max_length=15)
    
    # Academic Information
    campus = models.CharField(max_length=20, choices=CAMPUS_CHOICES)
    program = models.CharField(max_length=20, choices=PROGRAM_CHOICES)
    applying_for = models.CharField(max_length=50)
    intake = models.CharField(max_length=20)
    term = models.CharField(max_length=10, default='term1')
    boarding_status = models.CharField(max_length=10, default='day')
    
    previous_school = models.CharField(max_length=200, blank=True)
    previous_school_address = models.TextField(blank=True)
    last_class = models.CharField(max_length=50, blank=True)
    last_class_grade = models.CharField(max_length=50, blank=True)
    reason_for_transfer = models.TextField(blank=True)
    
    # Health Information
    has_special_needs = models.BooleanField(default=False)
    special_needs_details = models.TextField(blank=True)
    medical_conditions = models.TextField(blank=True)
    
    # Additional Information
    how_did_you_hear = models.CharField(max_length=50, blank=True)
    additional_notes = models.TextField(blank=True)
    agree_to_terms = models.BooleanField(default=False, help_text="Applicant agreed to terms and conditions")
    
    # Documents
    birth_certificate = models.FileField(upload_to='applications/documents/', blank=True, null=True)
    passport_photo = models.FileField(upload_to='applications/photos/', blank=True, null=True)
    last_report_card = models.FileField(upload_to='applications/reports/', blank=True, null=True)
    transfer_letter = models.FileField(upload_to='applications/transfers/', blank=True, null=True)
    medical_report = models.FileField(upload_to='applications/medical/', blank=True, null=True)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reviewed_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    review_notes = models.TextField(blank=True)
    
    # Timestamps
    application_date = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-application_date']
    
    def __str__(self):
        return f"{self.application_ref} - {self.first_name} {self.last_name}"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.middle_name} {self.last_name}".strip()


# Add the missing ApplicationNotification model
class ApplicationNotification(models.Model):
    NOTIFICATION_TYPES = [
        ('new_application', 'New Application'),
        ('status_change', 'Status Change'),
        ('document_upload', 'Document Upload'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('payment_received', 'Payment Received'),
    ]
    
    application = models.ForeignKey(
        AdmissionApplication, 
        on_delete=models.CASCADE, 
        related_name='notifications'
    )
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_notification_type_display()} - {self.application.application_ref}"


# Optional: Add these additional models if you need them
class FeeStructure(models.Model):
    CAMPUS_CHOICES = [
        ('main', 'Main Campus - Abirichi'),
        ('annex', 'Annex Campus - Arua'),
        ('muni', 'Muni Campus'),
        ('golden-brain', 'Golden Brain - Koboko'),
    ]
    
    PROGRAM_CHOICES = [
        ('early-childhood', 'Early Childhood'),
        ('primary', 'Primary School'),
        ('secondary', 'Secondary School'),
        ('vocational', 'Vocational Programs'),
    ]
    
    campus = models.CharField(max_length=20, choices=CAMPUS_CHOICES)
    program = models.CharField(max_length=20, choices=PROGRAM_CHOICES)
    class_level = models.CharField(max_length=50)
    tuition_fee = models.DecimalField(max_digits=10, decimal_places=2)
    boarding_fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    other_fees = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_fees = models.DecimalField(max_digits=10, decimal_places=2)
    academic_year = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['campus', 'program', 'class_level', 'academic_year']
    
    def __str__(self):
        return f"{self.get_campus_display()} - {self.get_program_display()} - {self.class_level}"


class AdmissionRequirement(models.Model):
    CAMPUS_CHOICES = [
        ('main', 'Main Campus - Abirichi'),
        ('annex', 'Annex Campus - Arua'),
        ('muni', 'Muni Campus'),
        ('golden-brain', 'Golden Brain - Koboko'),
        ('all', 'All Campuses'),
    ]
    
    campus = models.CharField(max_length=20, choices=CAMPUS_CHOICES, default='all')
    program = models.CharField(max_length=50)
    requirement = models.TextField()
    documents_required = models.TextField(help_text="List of required documents")
    age_requirement = models.CharField(max_length=100, blank=True)
    academic_requirement = models.TextField(blank=True)
    additional_notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.get_campus_display()} - {self.program}"


class Inquiry(models.Model):
    INQUIRY_TYPES = [
        ('general', 'General Inquiry'),
        ('admission', 'Admission Inquiry'),
        ('fee', 'Fee Structure'),
        ('program', 'Program Information'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    response = models.TextField(blank=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    responded_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.get_inquiry_type_display()}"