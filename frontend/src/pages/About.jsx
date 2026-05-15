// pages/About.jsx - Debug Version
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Eye, Target, Heart, Award, Users, BookOpen, 
  Calendar, MapPin, Quote, Star, Shield, 
  ChevronRight, Mail, Phone, Linkedin, 
  Twitter, Facebook, Instagram, Clock,
  GraduationCap, Globe, Sparkles, Trophy,
  CheckCircle, ArrowRight, Building2, Coffee
} from 'lucide-react';
import '../styles/About.css';

// Icon mapping
const iconMap = {
  'Users': Users,
  'Award': Award,
  'Trophy': Trophy,
  'Shield': Shield,
  'Sparkles': Sparkles,
  'Heart': Heart,
  'Target': Target,
  'Eye': Eye,
  'Calendar': Calendar,
  'GraduationCap': GraduationCap,
  'Building2': Building2,
  'MapPin': MapPin,
  'Quote': Quote,
};

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({});

  // API Base URL - Same as news component
  const API_BASE_URL = 'http://127.0.0.1:8000/api/website';

  // Fetch about page data
  const fetchAboutData = async () => {
    setLoading(true);
    setDebug({ ...debug, fetching: true, url: `${API_BASE_URL}/about-data/` });
    
    try {
      console.log('Fetching about data from:', `${API_BASE_URL}/about-data/`);
      
      const response = await axios.get(`${API_BASE_URL}/about-data/`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('About data response:', response.data);
      setDebug({ 
        ...debug, 
        success: true, 
        data: response.data,
        status: response.status 
      });
      
      setAboutData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error details:', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);
      
      setDebug({
        ...debug,
        error: true,
        errorMessage: err.message,
        errorResponse: err.response?.data,
        errorStatus: err.response?.status
      });
      
      setError(`Failed to load about page: ${err.message}`);
      
      // Set mock data as fallback
      setAboutData(getMockAboutData());
    } finally {
      setLoading(false);
    }
  };

  // Mock data for fallback
  const getMockAboutData = () => {
    return {
      settings: {
        hero_title: 'About Our School',
        hero_subtitle: 'Model Islamic & City Model Schools - Excellence in Education',
        hero_badge_text: 'بسم الله الرحمن الرحيم',
        info_card_1_title: 'Our Location',
        info_card_1_text: 'Former TAWAKAL PRIMARY SCHOOL, Pangsha Ward, Arua',
        info_card_2_title: 'Established',
        info_card_2_text: '2008',
        info_card_3_title: 'Our Motto',
        info_card_3_text: 'Excellence is our pride',
        cta_title: 'Join Our Learning Community',
        cta_text: 'Give your child the gift of quality Islamic education',
        cta_button_text: 'Apply for Admission',
        cta_button_link: '/admissions/apply',
        cta_secondary_button_text: 'Contact Us',
        cta_secondary_button_link: '/contact',
      },
      history_milestones: [
        { year: '2008', title: 'Foundation', description: 'School was established with 25 students' },
        { year: '2015', title: 'Expansion', description: 'Added primary section and new campus' },
        { year: '2024', title: 'Present Day', description: 'Serving over 500 students across multiple campuses' }
      ],
      core_values: [
        { name: 'Honesty', arabic_name: 'الصدق', icon: 'Shield', color: '#10B981', description: 'We uphold truthfulness and integrity' },
        { name: 'Excellence', arabic_name: 'التميز', icon: 'Trophy', color: '#F59E0B', description: 'We strive for the highest standards' },
        { name: 'Teamwork', arabic_name: 'العمل الجماعي', icon: 'Users', color: '#8B5CF6', description: 'We work together for success' }
      ],
      leadership: [
        {
          id: 1,
          name: 'Dr. Ahmed Hassan',
          position: 'Founder & Director',
          qualification: 'PhD in Islamic Education',
          experience: '25+ years',
          bio: 'Experienced educational leader',
          image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format',
          email: 'ahmed@example.com'
        }
      ],
      statistics: [
        { value: '15+', label: 'Years of Excellence', icon: 'Calendar' },
        { value: '500+', label: 'Students', icon: 'Users' },
        { value: '45+', label: 'Dedicated Staff', icon: 'GraduationCap' }
      ],
      mission: {
        title: 'Our Mission',
        description: 'To provide quality education rooted in Islamic values',
        points: ['Point 1', 'Point 2', 'Point 3'],
        icon: 'Target'
      },
      vision: {
        title: 'Our Vision',
        description: 'To be a center of excellence',
        points: ['Point 1', 'Point 2', 'Point 3'],
        icon: 'Eye'
      }
    };
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="about-page">
        <div className="container py-5">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
            <p className="text-blue-600">Loading about page from: {API_BASE_URL}/about-data/</p>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading about page content...</p>
          </div>
        </div>
      </div>
    );
  }

  // Debug error state
  if (error && !aboutData) {
    return (
      <div className="about-page">
        <div className="container py-5">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
            <h2 className="text-red-800 font-bold mb-2">Error Loading About Page</h2>
            <p className="text-red-700 mb-2">{error}</p>
            
            {/* Debug Information */}
            <div className="bg-white rounded p-4 mt-4">
              <h3 className="font-bold mb-2">Debug Information:</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(debug, null, 2)}
              </pre>
            </div>
            
            <button 
              onClick={fetchAboutData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>

          {/* Show mock data button */}
          <div className="mt-4">
            <button 
              onClick={() => {
                setAboutData(getMockAboutData());
                setError(null);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Load Mock Data for Testing
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="about-page">
        <div className="container py-5">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p>No data available. Click the button above to load mock data.</p>
          </div>
        </div>
      </div>
    );
  }

  const settings = aboutData.settings || {};
  const historyMilestones = aboutData.history_milestones || [];
  const coreValues = aboutData.core_values || [];
  const leadership = aboutData.leadership || [];
  const statistics = aboutData.statistics || [];
  const mission = aboutData.mission || {};
  const vision = aboutData.vision || {};

  const getIcon = (iconName, size = 24) => {
    const IconComponent = iconMap[iconName] || Shield;
    return <IconComponent size={size} />;
  };

  return (
    <div className="about-page">
      {/* Success Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm mx-4 mt-4">
        <p className="text-green-700">✅ About Page API Connected: {API_BASE_URL}/about-data/</p>
        <p className="text-green-700">📊 Found {statistics.length} statistics, {leadership.length} leaders, {coreValues.length} values</p>
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="about-hero-content">
            {settings.hero_badge_text && (
              <div className="hero-badge">
                <span className="arabic-text">{settings.hero_badge_text}</span>
              </div>
            )}
            <h1>{settings.hero_title || 'About Our School'}</h1>
            <p>{settings.hero_subtitle || 'Model Islamic & City Model Schools - Excellence in Education'}</p>
            <div className="hero-stats">
              {statistics.map((stat, idx) => {
                const StatIcon = iconMap[stat.icon] || Users;
                return (
                  <div key={idx} className="hero-stat">
                    <StatIcon size={24} />
                    <div className="hero-stat-info">
                      <span className="hero-stat-value">{stat.value}</span>
                      <span className="hero-stat-label">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hero-wave-bottom">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 64L60 69.3C120 75 240 85 360 80C480 75 600 53 720 48C840 43 960 53 1080 58.7C1200 64 1320 64 1380 64L1440 64L1440 120L1380 120C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120L0 120Z" fill="white"/>
          </svg>
        </div>
      </section>

      <div className="container">
        {/* Quick Info Cards */}
        <div className="quick-info-cards">
          <div className="info-card">
            <MapPin size={28} />
            <h3>{settings.info_card_1_title || 'Our Location'}</h3>
            <p>{settings.info_card_1_text || 'Former TAWAKAL PRIMARY SCHOOL, Pangsha Ward, Arua'}</p>
          </div>
          <div className="info-card">
            <Calendar size={28} />
            <h3>{settings.info_card_2_title || 'Established'}</h3>
            <p>{settings.info_card_2_text || '2008'}</p>
          </div>
          <div className="info-card">
            <Quote size={28} />
            <h3>{settings.info_card_3_title || 'Our Motto'}</h3>
            <p>{settings.info_card_3_text || 'Excellence is our pride'}</p>
          </div>
        </div>

        {/* History Section */}
        {historyMilestones.length > 0 && (
          <section className="history-section">
            <div className="section-header">
              <span className="section-badge">Our Journey</span>
              <h2>History of Excellence</h2>
              <div className="section-line"></div>
            </div>
            
            <div className="history-grid">
              <div className="history-content">
                {historyMilestones.map((milestone, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-year">{milestone.year}</div>
                    <div className="timeline-content">
                      <h3>{milestone.title}</h3>
                      <p>{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="history-image">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format" 
                  alt="School History"
                />
                <div className="image-caption">
                  <Quote size={20} />
                  <span>{settings.info_card_3_text || 'Excellence is our pride'}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mission & Vision Tabs */}
        <section className="mission-vision-section">
          <div className="section-header">
            <span className="section-badge">Our Purpose</span>
            <h2>Mission & Vision</h2>
            <div className="section-line"></div>
          </div>

          <div className="mv-tabs">
            <div className="tab-headers">
              <button 
                className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
                onClick={() => setActiveTab('mission')}
              >
                <Target size={20} />
                Our Mission
              </button>
              <button 
                className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
                onClick={() => setActiveTab('vision')}
              >
                <Eye size={20} />
                Our Vision
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'mission' && mission && (
                <div className="mission-content">
                  <div className="mv-card">
                    <div className="mv-icon">
                      {getIcon(mission.icon || 'Target', 48)}
                    </div>
                    <h3>{mission.title || 'Our Mission'}</h3>
                    <p className="mv-description">{mission.description}</p>
                    {mission.points && mission.points.length > 0 && (
                      <div className="mv-points">
                        {mission.points.map((point, idx) => (
                          <div key={idx} className="mv-point">
                            <CheckCircle size={18} />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'vision' && vision && (
                <div className="vision-content">
                  <div className="mv-card">
                    <div className="mv-icon">
                      {getIcon(vision.icon || 'Eye', 48)}
                    </div>
                    <h3>{vision.title || 'Our Vision'}</h3>
                    <p className="mv-description">{vision.description}</p>
                    {vision.points && vision.points.length > 0 && (
                      <div className="mv-points">
                        {vision.points.map((point, idx) => (
                          <div key={idx} className="mv-point">
                            <CheckCircle size={18} />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        {coreValues.length > 0 && (
          <section className="core-values-section">
            <div className="section-header">
              <span className="section-badge">Our Foundations</span>
              <h2>Core Islamic Values</h2>
              <p>The principles that guide everything we do</p>
              <div className="section-line"></div>
            </div>

            <div className="values-grid">
              {coreValues.map((value, idx) => {
                const Icon = iconMap[value.icon] || Shield;
                return (
                  <div key={idx} className="value-card">
                    <div className="value-icon" style={{ backgroundColor: value.color + '20', color: value.color }}>
                      <Icon size={32} />
                    </div>
                    <div className="value-content">
                      <h3>
                        {value.name}
                        {value.arabic_name && (
                          <span className="value-arabic">{value.arabic_name}</span>
                        )}
                      </h3>
                      <p>{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Leadership Section */}
        {leadership.length > 0 && (
          <section className="leadership-section">
            <div className="section-header">
              <span className="section-badge">Our Leaders</span>
              <h2>Meet Our Leadership Team</h2>
              <p>Dedicated professionals committed to your child's success</p>
              <div className="section-line"></div>
            </div>

            <div className="leadership-grid">
              {leadership.map((leader) => (
                <div key={leader.id} className="leader-card">
                  <div className="leader-image">
                    <img src={leader.image} alt={leader.name} />
                    <div className="leader-social">
                      {leader.linkedin && (
                        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin size={16} />
                        </a>
                      )}
                      {leader.twitter && (
                        <a href={leader.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter size={16} />
                        </a>
                      )}
                      {leader.email && (
                        <a href={`mailto:${leader.email}`}>
                          <Mail size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="leader-info">
                    <h3>{leader.name}</h3>
                    <p className="leader-position">{leader.position}</p>
                    <div className="leader-details">
                      {leader.qualification && (
                        <span className="leader-qualification">
                          <GraduationCap size={14} />
                          {leader.qualification}
                        </span>
                      )}
                      {leader.experience && (
                        <span className="leader-experience">
                          <Clock size={14} />
                          {leader.experience}
                        </span>
                      )}
                    </div>
                    <p className="leader-bio">{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>{settings.cta_title || 'Join Our Learning Community'}</h2>
            <p>{settings.cta_text || 'Give your child the gift of quality Islamic education'}</p>
            <div className="cta-buttons">
              <Link to={settings.cta_button_link || '/admissions/apply'} className="btn-primary">
                {settings.cta_button_text || 'Apply for Admission'}
                <ArrowRight size={18} />
              </Link>
              <Link to={settings.cta_secondary_button_link || '/contact'} className="btn-secondary">
                {settings.cta_secondary_button_text || 'Contact Us'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;