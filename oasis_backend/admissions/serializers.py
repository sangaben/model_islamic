# admissions/serializers.py
from rest_framework import serializers
from .models import AdmissionApplication, FeeStructure, AdmissionRequirement, Inquiry, ApplicationNotification

class FeeStructureSerializer(serializers.ModelSerializer):
    campus_display = serializers.CharField(source='get_campus_display', read_only=True)
    program_display = serializers.CharField(source='get_program_display', read_only=True)
    
    class Meta:
        model = FeeStructure
        fields = '__all__'


class AdmissionRequirementSerializer(serializers.ModelSerializer):
    campus_display = serializers.CharField(source='get_campus_display', read_only=True)
    
    class Meta:
        model = AdmissionRequirement
        fields = '__all__'


class InquirySerializer(serializers.ModelSerializer):
    inquiry_type_display = serializers.CharField(source='get_inquiry_type_display', read_only=True)
    
    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ['created_at', 'is_read']


class ApplicationNotificationSerializer(serializers.ModelSerializer):
    notification_type_display = serializers.CharField(source='get_notification_type_display', read_only=True)
    application_ref = serializers.CharField(source='application.application_ref', read_only=True)
    
    class Meta:
        model = ApplicationNotification
        fields = '__all__'


class AdmissionApplicationSerializer(serializers.ModelSerializer):
    # Map frontend field names to model field names using source
    # Only use source when the field name is different from the model field name
    
    # Fields that have the same name in frontend and model
    gender = serializers.CharField(required=True)
    nationality = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=True)
    campus = serializers.CharField(required=True)
    program = serializers.CharField(required=True)
    intake = serializers.CharField(required=False, allow_blank=True)
    term = serializers.CharField(required=False, allow_blank=True)
    
    # Fields where frontend name differs from model name
    firstName = serializers.CharField(source='first_name', required=True)
    middleName = serializers.CharField(source='middle_name', required=False, allow_blank=True)
    lastName = serializers.CharField(source='last_name', required=True)
    dateOfBirth = serializers.DateField(source='date_of_birth', required=True)
    phoneNumber = serializers.CharField(source='phone_number', required=True)
    alternativePhone = serializers.CharField(source='alternative_phone', required=False, allow_blank=True)
    
    # Parent fields
    fatherName = serializers.CharField(source='father_name', required=False, allow_blank=True)
    fatherOccupation = serializers.CharField(source='father_occupation', required=False, allow_blank=True)
    fatherPhone = serializers.CharField(source='father_phone', required=False, allow_blank=True)
    fatherEmail = serializers.EmailField(source='father_email', required=False, allow_blank=True)
    
    motherName = serializers.CharField(source='mother_name', required=False, allow_blank=True)
    motherOccupation = serializers.CharField(source='mother_occupation', required=False, allow_blank=True)
    motherPhone = serializers.CharField(source='mother_phone', required=False, allow_blank=True)
    motherEmail = serializers.EmailField(source='mother_email', required=False, allow_blank=True)
    
    guardianName = serializers.CharField(source='guardian_name', required=False, allow_blank=True)
    guardianRelation = serializers.CharField(source='guardian_relation', required=False, allow_blank=True)
    guardianPhone = serializers.CharField(source='guardian_phone', required=False, allow_blank=True)
    guardianEmail = serializers.EmailField(source='guardian_email', required=False, allow_blank=True)
    
    # Emergency contact
    emergencyName = serializers.CharField(source='emergency_name', required=True)
    emergencyRelation = serializers.CharField(source='emergency_relation', required=True)
    emergencyPhone = serializers.CharField(source='emergency_phone', required=True)
    
    # Academic fields
    applyingFor = serializers.CharField(source='applying_for', required=True)
    boardingStatus = serializers.CharField(source='boarding_status', required=False, allow_blank=True)
    previousSchool = serializers.CharField(source='previous_school', required=False, allow_blank=True)
    previousSchoolAddress = serializers.CharField(source='previous_school_address', required=False, allow_blank=True)
    lastClass = serializers.CharField(source='last_class', required=False, allow_blank=True)
    lastClassGrade = serializers.CharField(source='last_class_grade', required=False, allow_blank=True)
    reasonForTransfer = serializers.CharField(source='reason_for_transfer', required=False, allow_blank=True)
    
    # Health fields
    hasSpecialNeeds = serializers.BooleanField(source='has_special_needs', required=False)
    specialNeedsDetails = serializers.CharField(source='special_needs_details', required=False, allow_blank=True)
    medicalConditions = serializers.CharField(source='medical_conditions', required=False, allow_blank=True)
    
    # Additional fields
    howDidYouHear = serializers.CharField(source='how_did_you_hear', required=False, allow_blank=True)
    additionalNotes = serializers.CharField(source='additional_notes', required=False, allow_blank=True)
    # agreeToTerms is handled in the create method
    
    # File fields
    passportPhoto = serializers.FileField(source='passport_photo', required=False, allow_null=True)
    birthCertificate = serializers.FileField(source='birth_certificate', required=False, allow_null=True)
    lastReportCard = serializers.FileField(source='last_report_card', required=False, allow_null=True)
    transferLetter = serializers.FileField(source='transfer_letter', required=False, allow_null=True)
    medicalReport = serializers.FileField(source='medical_report', required=False, allow_null=True)
    
    class Meta:
        model = AdmissionApplication
        fields = [
            'firstName', 'middleName', 'lastName', 'dateOfBirth', 'gender', 
            'nationality', 'religion', 'email', 'phoneNumber', 'alternativePhone',
            'address', 'district', 'fatherName', 'fatherOccupation', 'fatherPhone',
            'fatherEmail', 'motherName', 'motherOccupation', 'motherPhone', 'motherEmail',
            'guardianName', 'guardianRelation', 'guardianPhone', 'guardianEmail',
            'emergencyName', 'emergencyRelation', 'emergencyPhone', 'campus', 'program',
            'applyingFor', 'intake', 'term', 'boardingStatus', 'previousSchool',
            'previousSchoolAddress', 'lastClass', 'lastClassGrade', 'reasonForTransfer',
            'hasSpecialNeeds', 'specialNeedsDetails', 'medicalConditions', 'howDidYouHear',
            'additionalNotes', 'passportPhoto', 'birthCertificate',
            'lastReportCard', 'transferLetter', 'medicalReport'
        ]
        read_only_fields = ['application_ref']
    
    def create(self, validated_data):
        print("Creating application with validated data:", list(validated_data.keys()))
        
        # The agree_to_terms field might be in the original data but not in validated_data
        # since we didn't define it as a field. If it was sent, we can access it from self.initial_data
        if 'agreeToTerms' in self.initial_data:
            print(f"Terms agreed: {self.initial_data.get('agreeToTerms')}")
            # You could store this in a session or log it if needed
        
        # Handle file fields separately
        file_fields = ['passport_photo', 'birth_certificate', 'last_report_card', 'transfer_letter', 'medical_report']
        files = {}
        
        for field in file_fields:
            if field in validated_data:
                files[field] = validated_data.pop(field)
        
        # Create the instance without files first
        instance = AdmissionApplication.objects.create(**validated_data)
        
        # Now save the files
        for field, file in files.items():
            if file:
                getattr(instance, field).save(file.name, file, save=True)
        
        return instance