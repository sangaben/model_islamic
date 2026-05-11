// pages/AdmissionApplication.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, GraduationCap,
  Upload, CheckCircle, AlertCircle, ArrowLeft, ArrowRight,
  BookOpen, Users, Globe, FileText, Download, Info, X,
  Building2, School, Heart, Baby, ToyBrick, Palette
} from 'lucide-react';
import axios from 'axios';
import '../styles/Admissions.css';

const AdmissionApplication = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [fileErrors, setFileErrors] = useState({});
  
  const [formData, setFormData] = useState({
    // Child's Information (Student)
    childFirstName: '',
    childMiddleName: '',
    childLastName: '',
    childDateOfBirth: '',
    childGender: '',
    childPlaceOfBirth: '',
    childNationality: 'Ugandan',
    childReligion: 'Muslim',
    
    // Parent/Guardian Information (Primary Contact)
    parentFullName: '',
    parentRelationship: 'Father',
    parentOccupation: '',
    parentPhone: '',
    parentEmail: '',
    parentAlternativePhone: '',
    parentAddress: '',
    parentDistrict: 'Arua',
    
    // Second Parent/Guardian (Optional)
    secondParentName: '',
    secondParentRelationship: 'Mother',
    secondParentOccupation: '',
    secondParentPhone: '',
    secondParentEmail: '',
    
    // Emergency Contact (Different from parents)
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    
    // Academic Information
    campus: '',
    programType: 'nursery',
    classApplying: 'baby-class',
    intake: '2025-2026',
    term: 'term1',
    
    // Previous School (if any)
    hasPreviousSchool: false,
    previousSchoolName: '',
    previousSchoolAddress: '',
    previousClass: '',
    
    // Health & Special Needs
    hasAllergies: false,
    allergyDetails: '',
    hasMedicalCondition: false,
    medicalConditionDetails: '',
    bloodGroup: '',
    specialNeeds: false,
    specialNeedsDetails: '',
    
    // Additional Information
    howDidYouHear: '',
    additionalNotes: '',
    agreeToTerms: false,
  });

  // Campus options
  const campuses = [
    { 
      value: 'model-islamic-main', 
      label: 'Model Islamic School - Main Campus',
      location: 'Former TAWAKAL PRIMARY SCHOOL, Pangsha Ward, Arua',
      type: 'Islamic',
      icon: '🕌',
      levels: ['baby-class', 'middle-class', 'top-class', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7']
    },
    { 
      value: 'model-islamic-annex', 
      label: 'Model Islamic School - Annex Campus',
      location: 'Arua City Center',
      type: 'Islamic',
      icon: '🕌',
      levels: ['baby-class', 'middle-class', 'top-class', 'p1', 'p2', 'p3', 'p4']
    },
    { 
      value: 'city-model-main', 
      label: 'City Model School - Main Campus',
      location: 'Arua City',
      type: 'Standard',
      icon: '🏫',
      levels: ['baby-class', 'middle-class', 'top-class', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7']
    },
    { 
      value: 'city-model-branch', 
      label: 'City Model School - Branch Campus',
      location: 'Near Arua Airport',
      type: 'Standard',
      icon: '🏫',
      levels: ['baby-class', 'middle-class', 'top-class', 'p1', 'p2', 'p3', 'p4']
    },
  ];

  // Class levels for Nursery and Primary
  const classLevels = {
    nursery: [
      { value: 'baby-class', label: 'Baby Class', age: '2-3 years', timing: '8:00 AM - 12:00 PM' },
      { value: 'middle-class', label: 'Middle Class', age: '3-4 years', timing: '8:00 AM - 2:00 PM' },
      { value: 'top-class', label: 'Top Class', age: '4-5 years', timing: '8:00 AM - 2:00 PM' }
    ],
    primary: [
      { value: 'p1', label: 'Primary One', age: '6-7 years', timing: '8:00 AM - 3:00 PM' },
      { value: 'p2', label: 'Primary Two', age: '7-8 years', timing: '8:00 AM - 3:00 PM' },
      { value: 'p3', label: 'Primary Three', age: '8-9 years', timing: '8:00 AM - 3:00 PM' },
      { value: 'p4', label: 'Primary Four', age: '9-10 years', timing: '8:00 AM - 3:00 PM' },
      { value: 'p5', label: 'Primary Five', age: '10-11 years', timing: '8:00 AM - 3:00 PM' },
      { value: 'p6', label: 'Primary Six', age: '11-12 years', timing: '8:00 AM - 3:00 PM' },
      { value: 'p7', label: 'Primary Seven', age: '12-13 years', timing: '8:00 AM - 3:00 PM' }
    ]
  };

  // Separate state for files
  const [files, setFiles] = useState({
    childPassportPhoto: null,
    birthCertificate: null,
    immunizationCard: null,
    lastReportCard: null,
    transferLetter: null,
    parentId: null,
  });

  const [fileNames, setFileNames] = useState({
    childPassportPhoto: '',
    birthCertificate: '',
    immunizationCard: '',
    lastReportCard: '',
    transferLetter: '',
    parentId: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    const file = fileList[0];
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileErrors(prev => ({
          ...prev,
          [name]: 'File size must be less than 5MB'
        }));
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setFileErrors(prev => ({
          ...prev,
          [name]: 'Only JPG, PNG, and PDF files are allowed'
        }));
        return;
      }

      setFileErrors(prev => ({
        ...prev,
        [name]: null
      }));

      setFiles(prev => ({
        ...prev,
        [name]: file
      }));

      setFileNames(prev => ({
        ...prev,
        [name]: file.name
      }));
    }
  };

  const removeFile = (fieldName) => {
    setFiles(prev => ({
      ...prev,
      [fieldName]: null
    }));
    setFileNames(prev => ({
      ...prev,
      [fieldName]: ''
    }));
    const fileInput = document.querySelector(`input[name="${fieldName}"]`);
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleProgramTypeChange = (e) => {
    const programType = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      programType,
      classApplying: classLevels[programType]?.[0]?.value || 'baby-class'
    }));
  };

  const validateStep = () => {
    switch(currentStep) {
      case 1:
        if (!formData.childFirstName || !formData.childLastName || !formData.childDateOfBirth || !formData.childGender) {
          setError('Please fill in all required child information fields');
          return false;
        }
        break;
      case 2:
        if (!formData.parentFullName || !formData.parentPhone || !formData.parentEmail) {
          setError('Please fill in all required parent/guardian contact fields');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
          setError('Please enter a valid email address');
          return false;
        }
        break;
      case 3:
        if (!formData.emergencyName || !formData.emergencyRelation || !formData.emergencyPhone) {
          setError('Please fill in emergency contact information');
          return false;
        }
        break;
      case 4:
        if (!formData.campus || !formData.programType || !formData.classApplying) {
          setError('Please select campus, program type and class');
          return false;
        }
        break;
      default:
        return true;
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    const hasFileErrors = Object.values(fileErrors).some(error => error !== null);
    if (hasFileErrors) {
      setError('Please fix file upload errors before submitting');
      return;
    }

    // Check required files
    if (!files.childPassportPhoto) {
      setError('Please upload a passport photo of the child');
      return;
    }
    if (!files.birthCertificate) {
      setError('Please upload the child\'s birth certificate');
      return;
    }
    if (!files.immunizationCard) {
      setError('Please upload the child\'s immunization card');
      return;
    }
    if (!files.parentId) {
      setError('Please upload parent/guardian ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key].toString());
        }
      });

      Object.keys(files).forEach(key => {
        if (files[key]) {
          submitData.append(key, files[key]);
        }
      });

      const response = await axios.post('http://localhost:8000/api/admissions/apply/', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        localStorage.setItem('applicationRef', response.data.applicationRef);
        
        sessionStorage.setItem('applicationData', JSON.stringify({
          reference: response.data.applicationRef,
          childName: `${formData.childFirstName} ${formData.childLastName}`,
          parentName: formData.parentFullName,
          email: formData.parentEmail,
          campus: formData.campus,
          class: formData.classApplying,
          date: new Date().toLocaleDateString()
        }));
        
        setTimeout(() => {
          navigate('/admissions/success', { 
            state: { 
              applicationRef: response.data.applicationRef,
              email: formData.parentEmail,
              childName: `${formData.childFirstName} ${formData.childLastName}`,
              parentName: formData.parentFullName,
              campus: formData.campus
            }
          });
        }, 2000);
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Server error. Please try again.');
      } else if (err.request) {
        setError('Cannot connect to server. Please check your connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getSelectedClassInfo = () => {
    const levels = classLevels[formData.programType] || classLevels.nursery;
    return levels.find(c => c.value === formData.classApplying);
  };

  const selectedClass = getSelectedClassInfo();

  if (submitSuccess) {
    return (
      <div className="admission-success">
        <div className="success-container">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Application Submitted Successfully!</h1>
          <p>Thank you for applying to <strong>Model Islamic & City Model Schools</strong>.</p>
          <p>Your application reference number is: <strong>{localStorage.getItem('applicationRef')}</strong></p>
          <p>A confirmation email has been sent to <strong>{formData.parentEmail}</strong></p>
          <div className="success-timeline">
            <h3>What happens next?</h3>
            <div className="timeline-steps">
              <div className="timeline-step">
                <span className="step-number">1</span>
                <div>
                  <strong>Application Under Review</strong>
                  <p>Our admissions team will review your child's application within 3-5 business days</p>
                </div>
              </div>
              <div className="timeline-step">
                <span className="step-number">2</span>
                <div>
                  <strong>Email Notification</strong>
                  <p>You will receive an email notification once your child's application is reviewed</p>
                </div>
              </div>
              <div className="timeline-step">
                <span className="step-number">3</span>
                <div>
                  <strong>Approval & Enrollment</strong>
                  <p>Upon approval, visit the school with your child to complete enrollment and pay fees</p>
                </div>
              </div>
            </div>
          </div>
          <div className="success-actions">
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Return to Home
            </button>
            <button onClick={() => window.print()} className="btn btn-secondary">
              <Download size={16} />
              Download Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admission-page">
      <div className="admission-header">
        <div className="container">
          <div className="header-badge">
            <Baby size={32} />
          </div>
          <h1>Admission Application Form</h1>
          <p>For Nursery & Primary School (Ages 2-12 years)</p>
          <p className="header-note">Please fill this form to apply for your child's admission</p>
        </div>
      </div>

      <div className="container">
        <div className="application-progress">
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Child's Info</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Parent Info</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Emergency</span>
            </div>
            <div className={`step ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}`}>
              <span className="step-number">4</span>
              <span className="step-label">Class Selection</span>
            </div>
            <div className={`step ${currentStep >= 5 ? 'active' : ''}`}>
              <span className="step-number">5</span>
              <span className="step-label">Documents</span>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep - 1) * 25}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          {/* Step 1: Child's Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <div className="step-header-icon">
                <Baby size={28} />
                <h2>Child's Information</h2>
              </div>
              <p className="step-description">Please provide information about the child you are applying for</p>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Child's First Name *</label>
                  <input
                    type="text"
                    name="childFirstName"
                    value={formData.childFirstName}
                    onChange={handleInputChange}
                    placeholder="Enter child's first name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Child's Middle Name</label>
                  <input
                    type="text"
                    name="childMiddleName"
                    value={formData.childMiddleName}
                    onChange={handleInputChange}
                    placeholder="Enter child's middle name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Child's Last Name *</label>
                  <input
                    type="text"
                    name="childLastName"
                    value={formData.childLastName}
                    onChange={handleInputChange}
                    placeholder="Enter child's last name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="childDateOfBirth"
                    value={formData.childDateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender *</label>
                  <select name="childGender" value={formData.childGender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Place of Birth</label>
                  <input
                    type="text"
                    name="childPlaceOfBirth"
                    value={formData.childPlaceOfBirth}
                    onChange={handleInputChange}
                    placeholder="e.g., Arua Regional Referral Hospital"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nationality</label>
                  <select name="childNationality" value={formData.childNationality} onChange={handleInputChange}>
                    <option value="Ugandan">Ugandan</option>
                    <option value="Kenyan">Kenyan</option>
                    <option value="Tanzanian">Tanzanian</option>
                    <option value="Rwandan">Rwandan</option>
                    <option value="South Sudanese">South Sudanese</option>
                    <option value="Congolese">Congolese</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Religion</label>
                  <select name="childReligion" value={formData.childReligion} onChange={handleInputChange}>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="info-box">
                <Info size={20} />
                <p>For Nursery (Baby, Middle, Top Class) and Primary (P1-P7) levels</p>
              </div>
            </div>
          )}

          {/* Step 2: Parent/Guardian Information */}
          {currentStep === 2 && (
            <div className="form-step">
              <div className="step-header-icon">
                <Users size={28} />
                <h2>Parent/Guardian Information</h2>
              </div>
              <p className="step-description">Information about the parent or guardian applying for the child</p>

              <div className="info-box">
                <Info size={20} />
                <p>This will be the primary contact person for all school communications</p>
              </div>

              <h3>Primary Parent/Guardian</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="parentFullName"
                    value={formData.parentFullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Relationship to Child *</label>
                  <select name="parentRelationship" value={formData.parentRelationship} onChange={handleInputChange} required>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Legal Guardian</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Occupation</label>
                  <input
                    type="text"
                    name="parentOccupation"
                    value={formData.parentOccupation}
                    onChange={handleInputChange}
                    placeholder="Enter your occupation"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    placeholder="e.g., 0772123456"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Alternative Phone</label>
                  <input
                    type="tel"
                    name="parentAlternativePhone"
                    value={formData.parentAlternativePhone}
                    onChange={handleInputChange}
                    placeholder="Alternative phone number"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Residential Address</label>
                  <input
                    type="text"
                    name="parentAddress"
                    value={formData.parentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your physical address"
                  />
                </div>
                
                <div className="form-group">
                  <label>District *</label>
                  <select name="parentDistrict" value={formData.parentDistrict} onChange={handleInputChange} required>
                    <option value="">Select District</option>
                    <option value="Arua">Arua</option>
                    <option value="Koboko">Koboko</option>
                    <option value="Yumbe">Yumbe</option>
                    <option value="Moyo">Moyo</option>
                    <option value="Adjumani">Adjumani</option>
                    <option value="Nebbi">Nebbi</option>
                    <option value="Zombo">Zombo</option>
                    <option value="Maracha">Maracha</option>
                    <option value="Terego">Terego</option>
                    <option value="Madi-Okollo">Madi-Okollo</option>
                    <option value="Obongi">Obongi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <h3>Second Parent/Guardian (Optional)</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="secondParentName"
                    value={formData.secondParentName}
                    onChange={handleInputChange}
                    placeholder="Enter second parent's name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Relationship</label>
                  <select name="secondParentRelationship" value={formData.secondParentRelationship} onChange={handleInputChange}>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Guardian">Legal Guardian</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="secondParentPhone"
                    value={formData.secondParentPhone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="secondParentEmail"
                    value={formData.secondParentEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Emergency Contact */}
          {currentStep === 3 && (
            <div className="form-step">
              <div className="step-header-icon">
                <Heart size={28} />
                <h2>Emergency Contact</h2>
              </div>
              <p className="step-description">Person to contact in case of emergency (if parents cannot be reached)</p>

              <div className="info-box">
                <Info size={20} />
                <p>This should be someone different from the parents listed above</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Name *</label>
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    placeholder="Enter emergency contact name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Relationship to Child *</label>
                  <input
                    type="text"
                    name="emergencyRelation"
                    value={formData.emergencyRelation}
                    onChange={handleInputChange}
                    placeholder="e.g., Aunt, Uncle, Grandparent"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Alternative Phone</label>
                  <input
                    type="tel"
                    name="emergencyAlternativePhone"
                    value={formData.emergencyAlternativePhone}
                    onChange={handleInputChange}
                    placeholder="Alternative phone number"
                  />
                </div>
              </div>

              <h3>Health Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group (if known)</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="hasAllergies"
                    checked={formData.hasAllergies}
                    onChange={handleInputChange}
                  />
                  Child has any allergies (food, medicine, environmental)
                </label>
              </div>

              {formData.hasAllergies && (
                <div className="form-group">
                  <label>Please describe allergies</label>
                  <textarea
                    name="allergyDetails"
                    value={formData.allergyDetails}
                    onChange={handleInputChange}
                    placeholder="List all allergies and reactions"
                    rows="2"
                  ></textarea>
                </div>
              )}

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="hasMedicalCondition"
                    checked={formData.hasMedicalCondition}
                    onChange={handleInputChange}
                  />
                  Child has any medical conditions
                </label>
              </div>

              {formData.hasMedicalCondition && (
                <div className="form-group">
                  <label>Please describe medical conditions</label>
                  <textarea
                    name="medicalConditionDetails"
                    value={formData.medicalConditionDetails}
                    onChange={handleInputChange}
                    placeholder="Describe any medical conditions, medications, or treatments"
                    rows="3"
                  ></textarea>
                </div>
              )}

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="specialNeeds"
                    checked={formData.specialNeeds}
                    onChange={handleInputChange}
                  />
                  Child has special educational needs
                </label>
              </div>

              {formData.specialNeeds && (
                <div className="form-group">
                  <label>Please describe special needs</label>
                  <textarea
                    name="specialNeedsDetails"
                    value={formData.specialNeedsDetails}
                    onChange={handleInputChange}
                    placeholder="Describe any special educational needs or accommodations required"
                    rows="3"
                  ></textarea>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Class Selection */}
          {currentStep === 4 && (
            <div className="form-step">
              <div className="step-header-icon">
                <GraduationCap size={28} />
                <h2>Select Campus & Class</h2>
              </div>
              <p className="step-description">Choose the campus and class level for your child</p>
              
              <div className="campuses-grid">
                <h3>Select Campus</h3>
                <div className="campus-options">
                  {campuses.map(campus => (
                    <label key={campus.value} className={`campus-card ${formData.campus === campus.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="campus"
                        value={campus.value}
                        checked={formData.campus === campus.value}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="campus-icon">{campus.icon}</div>
                      <div className="campus-details">
                        <strong>{campus.label}</strong>
                        <small>{campus.location}</small>
                        <span className="campus-type">{campus.type}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Program Type *</label>
                  <select name="programType" value={formData.programType} onChange={handleProgramTypeChange} required>
                    <option value="nursery">Nursery School (Ages 2-5 years)</option>
                    <option value="primary">Primary School (Ages 6-12 years)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Select Class *</label>
                  <select name="classApplying" value={formData.classApplying} onChange={handleInputChange} required>
                    <option value="">Select Class</option>
                    {classLevels[formData.programType]?.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label} - Age: {level.age}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedClass && (
                <div className="class-info-card">
                  <h4>Class Information</h4>
                  <p><strong>Class:</strong> {selectedClass.label}</p>
                  <p><strong>Age Range:</strong> {selectedClass.age}</p>
                  <p><strong>School Hours:</strong> {selectedClass.timing}</p>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Intake Year *</label>
                  <select name="intake" value={formData.intake} onChange={handleInputChange} required>
                    <option value="2025-2026">2025-2026 Academic Year</option>
                    <option value="2026-2027">2026-2027 Academic Year</option>
                    <option value="2027-2028">2027-2028 Academic Year</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Starting Term</label>
                  <select name="term" value={formData.term} onChange={handleInputChange}>
                    <option value="term1">Term 1 (February)</option>
                    <option value="term2">Term 2 (May)</option>
                    <option value="term3">Term 3 (September)</option>
                  </select>
                </div>
              </div>

              <h3>Previous School Information (if applicable)</h3>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="hasPreviousSchool"
                    checked={formData.hasPreviousSchool}
                    onChange={handleInputChange}
                  />
                  Child has attended another school before
                </label>
              </div>

              {formData.hasPreviousSchool && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Previous School Name</label>
                      <input
                        type="text"
                        name="previousSchoolName"
                        value={formData.previousSchoolName}
                        onChange={handleInputChange}
                        placeholder="Enter previous school name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>School Address</label>
                      <input
                        type="text"
                        name="previousSchoolAddress"
                        value={formData.previousSchoolAddress}
                        onChange={handleInputChange}
                        placeholder="Enter school address"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Last Class Completed</label>
                    <input
                      type="text"
                      name="previousClass"
                      value={formData.previousClass}
                      onChange={handleInputChange}
                      placeholder="e.g., Top Class, Primary Two"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 5: Documents */}
          {currentStep === 5 && (
            <div className="form-step">
              <div className="step-header-icon">
                <Upload size={28} />
                <h2>Required Documents</h2>
              </div>
              <p className="step-description">Please upload the following documents for your child's application</p>
              
              <div className="documents-section">
                <h3>Child's Documents</h3>
                <p className="documents-note">Accepted formats: PDF, JPG, PNG (Max 5MB each)</p>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Child's Passport Photo *</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="childPassportPhoto"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                        className="file-input"
                        required
                      />
                      {fileNames.childPassportPhoto && (
                        <div className="file-preview">
                          <span>{fileNames.childPassportPhoto}</span>
                          <button type="button" onClick={() => removeFile('childPassportPhoto')} className="remove-file">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    {fileErrors.childPassportPhoto && (
                      <small className="error-text">{fileErrors.childPassportPhoto}</small>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>Birth Certificate *</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="birthCertificate"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="file-input"
                        required
                      />
                      {fileNames.birthCertificate && (
                        <div className="file-preview">
                          <span>{fileNames.birthCertificate}</span>
                          <button type="button" onClick={() => removeFile('birthCertificate')} className="remove-file">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    {fileErrors.birthCertificate && (
                      <small className="error-text">{fileErrors.birthCertificate}</small>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Immunization/Health Card *</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="immunizationCard"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="file-input"
                        required
                      />
                      {fileNames.immunizationCard && (
                        <div className="file-preview">
                          <span>{fileNames.immunizationCard}</span>
                          <button type="button" onClick={() => removeFile('immunizationCard')} className="remove-file">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    {fileErrors.immunizationCard && (
                      <small className="error-text">{fileErrors.immunizationCard}</small>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label>Last Report Card (if applicable)</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="lastReportCard"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="file-input"
                      />
                      {fileNames.lastReportCard && (
                        <div className="file-preview">
                          <span>{fileNames.lastReportCard}</span>
                          <button type="button" onClick={() => removeFile('lastReportCard')} className="remove-file">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    {fileErrors.lastReportCard && (
                      <small className="error-text">{fileErrors.lastReportCard}</small>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Transfer Letter (if applicable)</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="transferLetter"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="file-input"
                      />
                      {fileNames.transferLetter && (
                        <div className="file-preview">
                          <span>{fileNames.transferLetter}</span>
                          <button type="button" onClick={() => removeFile('transferLetter')} className="remove-file">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    {fileErrors.transferLetter && (
                      <small className="error-text">{fileErrors.transferLetter}</small>
                    )}
                  </div>
                </div>

                <h3>Parent/Guardian Documents</h3>
                <div className="form-group">
                  <label>Parent/Guardian ID (National ID or Passport) *</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      name="parentId"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="file-input"
                      required
                    />
                    {fileNames.parentId && (
                      <div className="file-preview">
                        <span>{fileNames.parentId}</span>
                        <button type="button" onClick={() => removeFile('parentId')} className="remove-file">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  {fileErrors.parentId && (
                    <small className="error-text">{fileErrors.parentId}</small>
                  )}
                </div>
              </div>

              <h3>How did you hear about us?</h3>
              <div className="form-group">
                <select name="howDidYouHear" value={formData.howDidYouHear} onChange={handleInputChange}>
                  <option value="">Select an option</option>
                  <option value="friend">Friend/Family</option>
                  <option value="social">Social Media</option>
                  <option value="newspaper">Newspaper</option>
                  <option value="radio">Radio</option>
                  <option value="website">School Website</option>
                  <option value="open-day">Open Day</option>
                  <option value="walk-in">Walk-in</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Additional Notes or Questions</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any additional information about your child or questions you may have"
                  rows="3"
                ></textarea>
              </div>

              <div className="terms-section">
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                    />
                    I confirm that all information provided is true and accurate. I understand that providing false information may lead to disqualification of the application.
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                    />
                    I agree to the school's policies and terms of enrollment for my child.
                  </label>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={handlePrevious} className="btn btn-secondary">
                <ArrowLeft size={16} />
                Previous
              </button>
            )}
            
            {currentStep < 5 ? (
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Submitting Application...' : 'Submit Application'}
                {!loading && <CheckCircle size={16} />}
              </button>
            )}
          </div>
        </form>

        <div className="application-help">
          <h3>Need Help Completing the Form?</h3>
          <div className="help-contacts">
            <div className="help-item">
              <Phone size={20} />
              <div>
                <strong>Call Admissions Office</strong>
                <p>+256 394 817964</p>
              </div>
            </div>
            <div className="help-item">
              <Mail size={20} />
              <div>
                <strong>Email Us</strong>
                <p>admissions@modelislamic.ac.ug</p>
              </div>
            </div>
            <div className="help-item">
              <MapPin size={20} />
              <div>
                <strong>Visit Our School</strong>
                <p>Former TAWAKAL PRIMARY SCHOOL, Pangsha Ward, Arua</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionApplication;