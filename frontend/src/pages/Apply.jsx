import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Send, ChevronLeft, ChevronRight, X, Loader, CheckCircle,
  FileText, Users, Calendar, Clock, Award, Star, Phone,
  Mail, MapPin, Globe, BookOpen, GraduationCap, Heart,
  Target, Shield, AlertCircle, Upload, Download
} from 'lucide-react';

const ApplyPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  
  // Application form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: '',
    city: '',
    postalCode: '',
    
    // Academic Information
    previousSchool: '',
    lastGrade: '',
    applyingFor: '',
    academicYear: '2026',
    averageGrade: '',
    extracurricular: '',
    
    // Documents (store file names for demo)
    birthCertificate: null,
    previousReports: null,
    photo: null,
    recommendationLetter: null
  });

  const programs = [
    'Pre-Primary (Ages 3-5)',
    'Primary (Grades 1-7)',
    'Lower Secondary (S1-S4)',
    'Upper Secondary (S5-S6)',
    'International Baccalaureate'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [field]: 0 }));
      
      // Simulate upload
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [field]: progress }));
        if (progress >= 100) {
          clearInterval(interval);
          setFormData(prev => ({ ...prev, [field]: file.name }));
        }
      }, 200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setCurrentStep(1);
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
          gender: '', nationality: '', address: '', city: '', postalCode: '',
          previousSchool: '', lastGrade: '', applyingFor: '', academicYear: '2026',
          averageGrade: '', extracurricular: '', birthCertificate: null,
          previousReports: null, photo: null, recommendationLetter: null
        });
      }, 3000);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStepStatus = (step) => {
    if (currentStep === step) return 'current';
    if (currentStep > step) return 'completed';
    return 'pending';
  };

  const StepIcon = ({ step }) => {
    const status = getStepStatus(step);
    if (status === 'completed') {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    if (status === 'current') {
      return <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{step}</div>;
    }
    return <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">{step}</div>;
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for applying to Oasis Schools. We have received your application and will review it shortly.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Application Number: <span className="font-mono font-bold">APP{Math.floor(Math.random() * 10000)}</span>
          </p>
          <Link
            to="/admissions"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Return to Admissions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-3xl shadow-xl p-6 md:p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                Online Application
              </h1>
              <p className="text-gray-600">Join Oasis Schools - Apply for 2026 Academic Year</p>
            </div>
            <Link
              to="/admissions"
              className="text-gray-400 hover:text-gray-600 transition p-2"
            >
              <X className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white px-6 md:px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            {['Personal Info', 'Academic', 'Documents', 'Review'].map((label, index) => {
              const step = index + 1;
              const status = getStepStatus(step);
              return (
                <div key={label} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    <div className="relative flex-1">
                      <div className={`h-1 ${status === 'completed' ? 'bg-green-500' : status === 'current' ? 'bg-blue-500' : 'bg-gray-200'}`} />
                    </div>
                    <StepIcon step={step} />
                    <div className="relative flex-1">
                      <div className={`h-1 ${step === 4 ? 'hidden' : status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`} />
                    </div>
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    status === 'completed' ? 'text-green-600' :
                    status === 'current' ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="text-center text-sm text-gray-500">
            Step {currentStep} of 4: {
              currentStep === 1 ? 'Personal Information' :
              currentStep === 2 ? 'Academic Information' :
              currentStep === 3 ? 'Upload Documents' : 'Review & Submit'
            }
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-b-3xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="+256 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g., Ugandan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Academic Information
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous School <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    required
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Name of previous school"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Grade Completed <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastGrade"
                      required
                      value={formData.lastGrade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="e.g., Grade 7"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Grade
                    </label>
                    <input
                      type="text"
                      name="averageGrade"
                      value={formData.averageGrade}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="e.g., A, 80%"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Applying For <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="applyingFor"
                    required
                    value={formData.applyingFor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select Program</option>
                    {programs.map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="academicYear"
                      required
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extracurricular Activities
                    </label>
                    <input
                      type="text"
                      name="extracurricular"
                      value={formData.extracurricular}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Sports, music, clubs, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Upload Documents
                </h2>
                
                <div className="space-y-4">
                  {/* Birth Certificate */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'birthCertificate')}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {uploadProgress.birthCertificate && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress.birthCertificate}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress.birthCertificate}%</p>
                      </div>
                    )}
                    {formData.birthCertificate && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Uploaded: {formData.birthCertificate}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Accepted: PDF, JPG, PNG (Max 5MB)</p>
                  </div>

                  {/* Previous Reports */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous School Reports <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'previousReports')}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {uploadProgress.previousReports && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress.previousReports}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress.previousReports}%</p>
                      </div>
                    )}
                    {formData.previousReports && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Uploaded: {formData.previousReports}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Upload last 2 years of reports</p>
                  </div>

                  {/* Passport Photo */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Photo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'photo')}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {uploadProgress.photo && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress.photo}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress.photo}%</p>
                      </div>
                    )}
                    {formData.photo && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Uploaded: {formData.photo}
                      </p>
                    )}
                  </div>

                  {/* Recommendation Letter (Optional) */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recommendation Letter (Optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'recommendationLetter')}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {uploadProgress.recommendationLetter && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress.recommendationLetter}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress.recommendationLetter}%</p>
                      </div>
                    )}
                    {formData.recommendationLetter && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Uploaded: {formData.recommendationLetter}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Ensure all documents are clear and legible. Max file size: 5MB per file.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  Review Your Application
                </h2>
                
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Personal Information
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-gray-500">Full Name</dt>
                      <dd className="font-medium">{formData.firstName} {formData.lastName}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Email</dt>
                      <dd className="font-medium">{formData.email}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Phone</dt>
                      <dd className="font-medium">{formData.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Date of Birth</dt>
                      <dd className="font-medium">{formData.dateOfBirth}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Gender</dt>
                      <dd className="font-medium capitalize">{formData.gender}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Nationality</dt>
                      <dd className="font-medium">{formData.nationality}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    Academic Information
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-gray-500">Previous School</dt>
                      <dd className="font-medium">{formData.previousSchool}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Last Grade</dt>
                      <dd className="font-medium">{formData.lastGrade}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Program</dt>
                      <dd className="font-medium">{formData.applyingFor}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Academic Year</dt>
                      <dd className="font-medium">{formData.academicYear}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-600" />
                    Documents
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Birth Certificate: {formData.birthCertificate ? 'Uploaded' : 'Missing'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>School Reports: {formData.previousReports ? 'Uploaded' : 'Missing'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Passport Photo: {formData.photo ? 'Uploaded' : 'Missing'}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    By submitting, you confirm that all information provided is accurate and complete.
                  </p>
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    I confirm that the information provided is true and complete <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-800">
            Need help? Contact our admissions office at{' '}
            <a href="tel:+256772123456" className="font-semibold hover:underline">+256 (0) 772 123 456</a>{' '}
            or email{' '}
            <a href="mailto:admissions@oasisschools.ac.ug" className="font-semibold hover:underline">
              admissions@oasisschools.ac.ug
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ApplyPage;