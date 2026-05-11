# admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import AdmissionApplication, ApplicationNotification

class ApplicationNotificationInline(admin.TabularInline):
    model = ApplicationNotification
    extra = 0
    readonly_fields = ['notification_type', 'message', 'created_at']
    can_delete = False

@admin.register(AdmissionApplication)
class AdmissionApplicationAdmin(admin.ModelAdmin):
    list_display = ['application_ref', 'full_name', 'program', 'campus', 'status', 'application_date']  # Changed from submitted_date
    list_filter = ['status', 'program', 'campus', 'boarding_status']
    search_fields = ['application_ref', 'first_name', 'last_name', 'email', 'phone_number']
    readonly_fields = ['application_ref', 'application_date', 'last_updated']  # Changed from submitted_date
    inlines = [ApplicationNotificationInline]
    
    fieldsets = (
        ('Application Reference', {
            'fields': ('application_ref', 'status', 'reviewed_by', 'review_notes')
        }),
        ('Personal Information', {
            'fields': ('first_name', 'middle_name', 'last_name', 'date_of_birth', 'gender', 'nationality', 'religion')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone_number', 'alternative_phone', 'address', 'district')
        }),
        ('Parent/Guardian Information', {
            'fields': ('father_name', 'father_occupation', 'father_phone', 'father_email',
                      'mother_name', 'mother_occupation', 'mother_phone', 'mother_email',
                      'guardian_name', 'guardian_relation', 'guardian_phone', 'guardian_email')
        }),
        ('Emergency Contact', {
            'fields': ('emergency_name', 'emergency_relation', 'emergency_phone')
        }),
        ('Program Selection', {
            'fields': ('campus', 'program', 'applying_for', 'intake', 'term', 'boarding_status')
        }),
        ('Academic History', {
            'fields': ('previous_school', 'previous_school_address', 'last_class', 'last_class_grade', 'reason_for_transfer')
        }),
        ('Health Information', {
            'fields': ('has_special_needs', 'special_needs_details', 'medical_conditions')
        }),
        ('Documents', {
            'fields': ('birth_certificate', 'passport_photo', 'last_report_card', 'transfer_letter', 'medical_report')
        }),
        ('Additional Information', {
            'fields': ('how_did_you_hear', 'additional_notes')
        }),
        ('Timestamps', {
            'fields': ('application_date', 'last_updated')  # Changed from submitted_date
        }),
    )
    
    actions = ['mark_as_reviewed', 'mark_as_approved', 'mark_as_rejected']
    
    def mark_as_reviewed(self, request, queryset):
        queryset.update(status='review')
    mark_as_reviewed.short_description = "Mark selected as Under Review"
    
    def mark_as_approved(self, request, queryset):
        queryset.update(status='approved')
    mark_as_approved.short_description = "Mark selected as Approved"
    
    def mark_as_rejected(self, request, queryset):
        queryset.update(status='rejected')
    mark_as_rejected.short_description = "Mark selected as Rejected"
    
    def save_model(self, request, obj, form, change):
        if change and 'status' in form.changed_data:
            # Create notification for status change
            ApplicationNotification.objects.create(
                application=obj,
                notification_type='status_change',
                message=f'Application status changed to {obj.get_status_display()}'
            )
        super().save_model(request, obj, form, change)
    
    # Optional: Add a method to display full name properly
    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    full_name.short_description = 'Full Name'

@admin.register(ApplicationNotification)
class ApplicationNotificationAdmin(admin.ModelAdmin):
    list_display = ['application', 'notification_type', 'message', 'is_read', 'created_at']
    list_filter = ['notification_type', 'is_read']
    search_fields = ['application__application_ref', 'message']
    readonly_fields = ['created_at']