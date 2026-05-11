// pages/AdmissionStatus.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, FileText, CheckCircle, Clock, XCircle,
  AlertCircle, Phone, Mail, Calendar, Download,
  ArrowRight, RefreshCw
} from 'lucide-react';
import axios from 'axios';

const AdmissionStatus = () => {
  const navigate = useNavigate();
  const [applicationRef, setApplicationRef] = useState('');
  const [email, setEmail] = useState('');
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkStatus = async (e) => {
    e.preventDefault();
    
    if (!applicationRef && !email) {
      setError('Please enter either Application Reference or Email');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/admissions/status/', {
        params: {
          application_ref: applicationRef,
          email: email
        }
      });

      if (response.data.success) {
        setApplication(response.data.application);
      } else {
        setError('Application not found');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle size={24} className="status-icon approved" />;
      case 'pending': return <Clock size={24} className="status-icon pending" />;
      case 'rejected': return <XCircle size={24} className="status-icon rejected" />;
      case 'review': return <Search size={24} className="status-icon review" />;
      default: return <FileText size={24} className="status-icon" />;
    }
  };

  const getStatusMessage = (status) => {
    const messages = {
      'approved': 'Congratulations! Your application has been approved.',
      'pending': 'Your application is being processed.',
      'rejected': 'We regret to inform you that your application was not successful.',
      'review': 'Your application is under review.',
    };
    return messages[status] || 'Status unknown';
  };

  return (
    <div className="status-page">
      <div className="status-header">
        <div className="container">
          <h1>Check Admission Status</h1>
          <p>Track your application progress</p>
        </div>
      </div>

      <div className="container">
        {!application ? (
          <div className="status-search">
            <div className="search-card">
              <h2>Enter your details</h2>
              
              <form onSubmit={checkStatus} className="search-form">
                <div className="form-group">
                  <label>Application Reference Number</label>
                  <input
                    type="text"
                    value={applicationRef}
                    onChange={(e) => setApplicationRef(e.target.value)}
                    placeholder="e.g., OAS-2024-001"
                  />
                </div>
                
                <div className="form-divider">
                  <span>OR</span>
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>

                {error && (
                  <div className="error-message">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <RefreshCw size={20} className="spinning" /> : <Search size={20} />}
                  {loading ? 'Searching...' : 'Check Status'}
                </button>
              </form>

              <div className="search-help">
                <p>Don't have an application reference?</p>
                <button onClick={() => navigate('/admissions/apply')} className="btn-link">
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="status-result">
            <div className="result-header">
              {getStatusIcon(application.status)}
              <div className="result-title">
                <h2>Application Status</h2>
                <p className={`status-text status-${application.status}`}>
                  {getStatusMessage(application.status)}
                </p>
              </div>
            </div>

            <div className="application-details-card">
              <h3>Application Details</h3>
              
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Application Ref:</strong>
                  <span>{application.application_ref}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Applicant Name:</strong>
                  <span>{application.full_name}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Program:</strong>
                  <span>{application.program}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Campus:</strong>
                  <span>{application.campus}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Date Submitted:</strong>
                  <span>{new Date(application.submitted_date).toLocaleDateString()}</span>
                </div>
                
                <div className="detail-item">
                  <strong>Last Updated:</strong>
                  <span>{new Date(application.last_updated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {application.status === 'approved' && (
              <div className="approval-actions">
                <h3>Next Steps</h3>
                <div className="actions-grid">
                  <button className="action-card">
                    <FileText size={24} />
                    <span>Download Admission Letter</span>
                  </button>
                  
                  <button className="action-card">
                    <Calendar size={24} />
                    <span>Schedule Registration</span>
                  </button>
                  
                  <button className="action-card">
                    <Download size={24} />
                    <span>Download Fee Structure</span>
                  </button>
                </div>
              </div>
            )}

            {application.status === 'pending' && (
              <div className="pending-info">
                <div className="info-box">
                  <Clock size={20} />
                  <p>Your application is being processed. You will receive an update within 3-5 working days.</p>
                </div>
              </div>
            )}

            {application.status === 'review' && (
              <div className="review-info">
                <div className="info-box">
                  <Search size={20} />
                  <p>Your application is currently under review. We may contact you for additional information.</p>
                </div>
              </div>
            )}

            <div className="status-contact">
              <h3>Need Help?</h3>
              <div className="contact-options">
                <a href="tel:+256772123456" className="contact-option">
                  <Phone size={18} />
                  Call Admissions Office
                </a>
                
                <a href="mailto:admissions@oasisschools.ac.ug" className="contact-option">
                  <Mail size={18} />
                  Send Email
                </a>
              </div>
            </div>

            <button onClick={() => setApplication(null)} className="btn btn-secondary">
              Check Another Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionStatus;