// pages/ApplicationSuccess.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, Download, Printer, Mail, Phone, MapPin, 
  Calendar, ArrowLeft, Share2, FileText, Award, Clock,
  AlertCircle, Copy, Check
} from 'lucide-react';
import '../styles/ApplicationSuccess.css';

const ApplicationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [applicationRef, setApplicationRef] = useState('');
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Get data from location state or localStorage
  useEffect(() => {
    const ref = location.state?.applicationRef || localStorage.getItem('applicationRef');
    const userEmail = location.state?.email || localStorage.getItem('applicantEmail');
    
    if (ref) {
      setApplicationRef(ref);
    } else {
      // If no reference found, redirect to home after 5 seconds
      setTimeout(() => navigate('/'), 5000);
    }
    
    if (userEmail) {
      setEmail(userEmail);
    }
    
    // Clear localStorage after retrieving
    // localStorage.removeItem('applicationRef');
    // localStorage.removeItem('applicantEmail');
  }, [location, navigate]);

  // Countdown timer for auto-redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(applicationRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    // This would generate and download a PDF of the application
    alert('Download functionality will be available soon!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Oasis Schools Application',
          text: `My application reference is ${applicationRef}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      alert('Share feature not supported on this browser');
    }
  };

  if (!applicationRef) {
    return (
      <div className="success-page error-state">
        <div className="success-container">
          <div className="error-icon">
            <AlertCircle size={64} />
          </div>
          <h1>No Application Found</h1>
          <p>We couldn't find your application reference.</p>
          <p>You will be redirected to the home page in {countdown} seconds.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      {/* Confetti effect placeholder */}
      <div className="confetti"></div>
      
      <div className="success-container">
        {/* Header with success animation */}
        <div className="success-header">
          <div className="success-icon-wrapper">
            <div className="success-icon-circle">
              <CheckCircle size={64} className="success-icon" />
            </div>
          </div>
          <h1>Application Submitted Successfully!</h1>
          <p className="success-subtitle">Thank you for choosing Oasis Schools Arua</p>
        </div>

        {/* Main content */}
        <div className="success-content">
          {/* Application Reference Card */}
          <div className="reference-card">
            <div className="reference-label">Your Application Reference Number</div>
            <div className="reference-number-wrapper">
              <span className="reference-number">{applicationRef}</span>
              <button 
                onClick={handleCopyReference}
                className="copy-button"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <p className="reference-note">Please save this number for future reference</p>
          </div>

          {/* Status Timeline */}
          <div className="timeline-section">
            <h2>What Happens Next?</h2>
            
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-marker">
                  <CheckCircle size={20} />
                </div>
                <div className="timeline-content">
                  <h3>Application Received</h3>
                  <p>Your application has been successfully submitted</p>
                  <span className="timeline-date">Just now</span>
                </div>
              </div>

              <div className="timeline-item active">
                <div className="timeline-marker">
                  <Clock size={20} />
                </div>
                <div className="timeline-content">
                  <h3>Under Review</h3>
                  <p>Our admissions team is reviewing your application</p>
                  <span className="timeline-date">1-2 business days</span>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">
                  <FileText size={20} />
                </div>
                <div className="timeline-content">
                  <h3>Document Verification</h3>
                  <p>We'll verify your uploaded documents</p>
                  <span className="timeline-date">2-3 business days</span>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">
                  <Mail size={20} />
                </div>
                <div className="timeline-content">
                  <h3>Admission Decision</h3>
                  <p>You'll receive our decision via email and SMS</p>
                  <span className="timeline-date">3-5 business days</span>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker">
                  <Award size={20} />
                </div>
                <div className="timeline-content">
                  <h3>Registration</h3>
                  <p>Complete registration to secure your place</p>
                  <span className="timeline-date">Upon approval</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Details */}
          <div className="confirmation-details">
            <div className="detail-grid">
              <div className="detail-item">
                <Mail size={18} className="detail-icon" />
                <div>
                  <strong>Confirmation Email</strong>
                  <p>A confirmation has been sent to {email || 'your email'}</p>
                </div>
              </div>

              <div className="detail-item">
                <Phone size={18} className="detail-icon" />
                <div>
                  <strong>SMS Notification</strong>
                  <p>You'll receive SMS updates on your phone</p>
                </div>
              </div>

              <div className="detail-item">
                <Calendar size={18} className="detail-icon" />
                <div>
                  <strong>Processing Time</strong>
                  <p>3-5 business days for initial review</p>
                </div>
              </div>

              <div className="detail-item">
                <MapPin size={18} className="detail-icon" />
                <div>
                  <strong>Visit Us</strong>
                  <p>Main Campus, Abirichi - Arua</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={handleDownload} className="btn-secondary">
              <Download size={18} />
              Download Summary
            </button>
            
            <button onClick={handlePrint} className="btn-secondary">
              <Printer size={18} />
              Print
            </button>
            
            <button onClick={handleShare} className="btn-secondary">
              <Share2 size={18} />
              Share
            </button>
          </div>

          {/* Next Steps Card */}
          <div className="next-steps-card">
            <h3>📋 Next Steps</h3>
            <ul className="next-steps-list">
              <li>Check your email for a confirmation message</li>
              <li>Save your application reference number</li>
              <li>Prepare for any entrance assessments if applicable</li>
              <li>Check your application status online using your reference number</li>
              <li>Contact us if you don't hear from us within 5 business days</li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="important-notes">
            <h4>Important Notes:</h4>
            <ul>
              <li>Please check your spam folder if you don't see our email</li>
              <li>Keep your application reference number safe</li>
              <li>Incomplete applications may take longer to process</li>
              <li>You can check your status at any time using the reference number</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="contact-section">
            <h3>Need Help?</h3>
            <div className="contact-grid">
              <a href="tel:+256772123456" className="contact-card">
                <Phone size={20} />
                <div>
                  <strong>Call Us</strong>
                  <p>+256 (0) 772 123 456</p>
                </div>
              </a>
              
              <a href="mailto:admissions@oasisschools.ac.ug" className="contact-card">
                <Mail size={20} />
                <div>
                  <strong>Email Us</strong>
                  <p>admissions@oasisschools.ac.ug</p>
                </div>
              </a>
              
              <div className="contact-card">
                <MapPin size={20} />
                <div>
                  <strong>Visit Us</strong>
                  <p>Main Campus, Abirichi - Arua</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button onClick={() => navigate('/')} className="btn-outline">
              <ArrowLeft size={18} />
              Back to Home
            </button>
            
            <button 
              onClick={() => navigate('/admissions/status')} 
              className="btn-primary"
            >
              Check Application Status
            </button>
          </div>

          {/* Auto-redirect message */}
          <p className="redirect-message">
            You will be redirected to the home page in {countdown} seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccess;