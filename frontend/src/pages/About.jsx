// pages/About.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye, Target, Heart, Award, Users, BookOpen, 
  Calendar, MapPin, Quote, Star, Shield, 
  ChevronRight, Mail, Phone, Linkedin, 
  Twitter, Facebook, Instagram, Clock,
  GraduationCap, Globe, Sparkles, Trophy,
  CheckCircle, ArrowRight, Building2, Coffee
} from 'lucide-react';
import '../styles/About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          el.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // School Data
  const schoolData = {
    name: "Model Islamic & City Model Schools",
    established: 2008,
    location: "Former TAWAKAL PRIMARY SCHOOL, Pangsha Ward, Arua",
    motto: "Excellence is our pride",
    
    history: {
      founding: "Model Islamic School was established in 2008 with a vision to provide quality Islamic education combined with modern academics in Arua, Uganda. What started as a small kindergarten with just 25 students has grown into a reputable institution with multiple campuses across Arua district.",
      growth: "Over the years, the school expanded to include primary education, and later established City Model School to cater to the growing demand for quality education in the region. Today, we serve over 500 students across our campuses with a dedicated team of 45+ qualified teachers.",
      milestone: "Our journey has been marked by continuous improvement, adoption of modern teaching methodologies, and unwavering commitment to nurturing young minds with Islamic values."
    },
    
    mission: {
      title: "Our Mission",
      description: "To improve sustainable Islamic environment and quality of moral life of all Muslims in the district and to promote and sustain socio-economic development, good governance and culture of tolerance.",
      points: [
        "Provide quality education rooted in Islamic values",
        "Nurture students to become responsible global citizens",
        "Foster academic excellence and character development",
        "Create a supportive learning environment for all students"
      ]
    },
    
    vision: {
      title: "Our Vision",
      description: "To have a Spiritual/morally upright, productive and prosperous Muslim Community.",
      points: [
        "Be a center of excellence in Islamic and secular education",
        "Produce generations of confident, capable Muslim leaders",
        "Contribute positively to community development",
        "Set standards for quality education in the region"
      ]
    },
    
    coreValues: [
      { 
        name: "Honesty", 
        arabic: "الصدق",
        icon: Shield, 
        description: "We uphold truthfulness and integrity in all our dealings",
        color: "#10B981"
      },
      { 
        name: "Reliability", 
        arabic: "الموثوقية",
        icon: Award, 
        description: "We are dependable and consistent in delivering quality education",
        color: "#3B82F6"
      },
      { 
        name: "Excellence", 
        arabic: "التميز",
        icon: Trophy, 
        description: "We strive for the highest standards in everything we do",
        color: "#F59E0B"
      },
      { 
        name: "Teamwork", 
        arabic: "العمل الجماعي",
        icon: Users, 
        description: "We work together for the success of our students",
        color: "#8B5CF6"
      },
      { 
        name: "Innovation", 
        arabic: "الابتكار",
        icon: Sparkles, 
        description: "We embrace creative and modern teaching methods",
        color: "#EC4899"
      },
      { 
        name: "Respect", 
        arabic: "احترام",
        icon: Heart, 
        description: "We treat everyone with dignity and Islamic manners",
        color: "#EF4444"
      }
    ],
    
    leadership: [
      {
        id: 1,
        name: "Dr. Ahmed Hassan",
        position: "Founder & Director",
        qualification: "PhD in Islamic Education",
        experience: "25+ years in education",
        bio: "Dr. Ahmed Hassan founded Model Islamic School with a vision to provide quality Islamic education. He holds a PhD in Islamic Education and has over 25 years of experience in educational leadership.",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format",
        social: { linkedin: "#", twitter: "#", email: "ahmed.hassan@modelislamic.ac.ug" }
      },
      {
        id: 2,
        name: "Mrs. Fatima Ibrahim",
        position: "Head of School",
        qualification: "MA in Educational Leadership",
        experience: "18+ years",
        bio: "Mrs. Fatima Ibrahim leads the academic programs with dedication and expertise. She is committed to maintaining high educational standards and fostering a positive learning environment.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format",
        social: { linkedin: "#", email: "fatima.ibrahim@modelislamic.ac.ug" }
      },
      {
        id: 3,
        name: "Mr. Yusuf Ssettuba",
        position: "Academic Director",
        qualification: "BSc Education, MA Curriculum Development",
        experience: "20+ years",
        bio: "Mr. Yusuf Ssettuba oversees curriculum development and academic standards across all campuses, ensuring alignment with national requirements and Islamic values.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format",
        social: { linkedin: "#", email: "yusuf.ssettuba@modelislamic.ac.ug" }
      },
      {
        id: 4,
        name: "Sheikh Muhammad Ali",
        position: "Head of Islamic Studies",
        qualification: "Bachelor's in Islamic Sharia",
        experience: "15+ years",
        bio: "Sheikh Muhammad Ali leads the Islamic Studies department, ensuring authentic Quranic teachings and proper Islamic education for all students.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format",
        social: { email: "muhammad.ali@modelislamic.ac.ug" }
      },
      {
        id: 5,
        name: "Ms. Aisha Nambi",
        position: "Early Years Coordinator",
        qualification: "Diploma in Early Childhood Education",
        experience: "12+ years",
        bio: "Ms. Aisha Nambi specializes in early childhood development and leads our kindergarten programs with passion and care.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format",
        social: { email: "aisha.nambi@modelislamic.ac.ug" }
      },
      {
        id: 6,
        name: "Mr. James Okello",
        position: "Administrative Manager",
        qualification: "MBA in Management",
        experience: "10+ years",
        bio: "Mr. James Okello manages school operations, ensuring smooth administration and excellent parent service across all campuses.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format",
        social: { email: "james.okello@modelislamic.ac.ug" }
      }
    ],
    
    stats: [
      { value: "15+", label: "Years of Excellence", icon: Calendar },
      { value: "500+", label: "Students", icon: Users },
      { value: "45+", label: "Dedicated Staff", icon: GraduationCap },
      { value: "4", label: "Campuses", icon: Building2 }
    ]
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="about-hero-content">
            <div className="hero-badge">
              <span className="arabic-text">بسم الله الرحمن الرحيم</span>
            </div>
            <h1>About Our School</h1>
            <p>Model Islamic & City Model Schools - Excellence in Education Since {schoolData.established}</p>
            <div className="hero-stats">
              {schoolData.stats.map((stat, idx) => (
                <div key={idx} className="hero-stat">
                  <stat.icon size={24} />
                  <div className="hero-stat-info">
                    <span className="hero-stat-value">{stat.value}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
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
          <div className="info-card animate-on-scroll">
            <MapPin size={28} />
            <h3>Our Location</h3>
            <p>{schoolData.location}</p>
          </div>
          <div className="info-card animate-on-scroll">
            <Calendar size={28} />
            <h3>Established</h3>
            <p>{schoolData.established}</p>
          </div>
          <div className="info-card animate-on-scroll">
            <Quote size={28} />
            <h3>Our Motto</h3>
            <p>{schoolData.motto}</p>
          </div>
        </div>

        {/* History Section */}
        <section className="history-section animate-on-scroll">
          <div className="section-header">
            <span className="section-badge">Our Journey</span>
            <h2>History of Excellence</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="history-grid">
            <div className="history-content">
              <div className="timeline-item">
                <div className="timeline-year">2008</div>
                <div className="timeline-content">
                  <h3>Foundation</h3>
                  <p>{schoolData.history.founding}</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2015</div>
                <div className="timeline-content">
                  <h3>Expansion</h3>
                  <p>{schoolData.history.growth}</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2024</div>
                <div className="timeline-content">
                  <h3>Present Day</h3>
                  <p>{schoolData.history.milestone}</p>
                </div>
              </div>
            </div>
            <div className="history-image">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format" 
                alt="School History"
              />
              <div className="image-caption">
                <Quote size={20} />
                <span>{schoolData.motto}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Tabs */}
        <section className="mission-vision-section animate-on-scroll">
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
              {activeTab === 'mission' && (
                <div className="mission-content">
                  <div className="mv-card">
                    <div className="mv-icon">
                      <Target size={48} />
                    </div>
                    <h3>{schoolData.mission.title}</h3>
                    <p className="mv-description">{schoolData.mission.description}</p>
                    <div className="mv-points">
                      {schoolData.mission.points.map((point, idx) => (
                        <div key={idx} className="mv-point">
                          <CheckCircle size={18} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'vision' && (
                <div className="vision-content">
                  <div className="mv-card">
                    <div className="mv-icon">
                      <Eye size={48} />
                    </div>
                    <h3>{schoolData.vision.title}</h3>
                    <p className="mv-description">{schoolData.vision.description}</p>
                    <div className="mv-points">
                      {schoolData.vision.points.map((point, idx) => (
                        <div key={idx} className="mv-point">
                          <CheckCircle size={18} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="core-values-section animate-on-scroll">
          <div className="section-header">
            <span className="section-badge">Our Foundations</span>
            <h2>Core Islamic Values</h2>
            <p>The principles that guide everything we do</p>
            <div className="section-line"></div>
          </div>

          <div className="values-grid">
            {schoolData.coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="value-card">
                  <div className="value-icon" style={{ backgroundColor: value.color + '20', color: value.color }}>
                    <Icon size={32} />
                  </div>
                  <div className="value-content">
                    <h3>
                      {value.name}
                      <span className="value-arabic">{value.arabic}</span>
                    </h3>
                    <p>{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="leadership-section animate-on-scroll">
          <div className="section-header">
            <span className="section-badge">Our Leaders</span>
            <h2>Meet Our Leadership Team</h2>
            <p>Dedicated professionals committed to your child's success</p>
            <div className="section-line"></div>
          </div>

          <div className="leadership-grid">
            {schoolData.leadership.map((leader) => (
              <div key={leader.id} className="leader-card">
                <div className="leader-image">
                  <img src={leader.image} alt={leader.name} />
                  <div className="leader-social">
                    {leader.social.linkedin && (
                      <a href={leader.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin size={16} />
                      </a>
                    )}
                    {leader.social.twitter && (
                      <a href={leader.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter size={16} />
                      </a>
                    )}
                    <a href={`mailto:${leader.social.email}`}>
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
                <div className="leader-info">
                  <h3>{leader.name}</h3>
                  <p className="leader-position">{leader.position}</p>
                  <div className="leader-details">
                    <span className="leader-qualification">
                      <GraduationCap size={14} />
                      {leader.qualification}
                    </span>
                    <span className="leader-experience">
                      <Clock size={14} />
                      {leader.experience}
                    </span>
                  </div>
                  <p className="leader-bio">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta animate-on-scroll">
          <div className="cta-content">
            <h2>Join Our Learning Community</h2>
            <p>Give your child the gift of quality Islamic education</p>
            <div className="cta-buttons">
              <Link to="/admissions/apply" className="btn-primary">
                Apply for Admission
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;