import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { 
  MapPin, Phone, Mail, Users, BookOpen, Award, Calendar,
  ChevronRight, Clock, GraduationCap, Heart, Target, Eye,
  Building2, Wifi, Coffee, Bus, Shield, Trophy, Library,
  FlaskConical, Computer, BookMarked, Dumbbell, Utensils,
  School, Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react';
import '../styles/CampusDetail.css';

const CampusDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Complete campus data for all four Oasis Schools campuses
  const campusData = {
    'main': {
      id: 'main',
      name: 'Main Campus',
      location: 'Abirichi, Arua',
      established: '2013',
      students: '450+',
      programs: 'Nursery & Primary',
      type: 'Day & Boarding',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Our flagship campus in Abirichi offers comprehensive education from nursery through primary levels. With both day and boarding options, we provide a nurturing environment where young minds flourish through quality education and strong moral values.',
      longDescription: 'The Main Campus stands as the cornerstone of Oasis Schools, featuring modern classrooms, well-equipped science laboratories, and dedicated play areas for early childhood development. Our boarding facilities provide a home away from home, with caring matrons and a structured environment that promotes independence and character development.',
      facilities: [
        { name: 'Modern Classrooms', icon: School, description: '12 spacious, well-lit classrooms with smart boards' },
        { name: 'Science Laboratory', icon: FlaskConical, description: 'Fully equipped for practical science education' },
        { name: 'Computer Lab', icon: Computer, description: '30 computers with internet access' },
        { name: 'Library', icon: Library, description: '2,500+ books and reading materials' },
        { name: 'Playground', icon: Dumbbell, description: 'Safe outdoor play equipment' },
        { name: 'Dining Hall', icon: Utensils, description: 'Nutritious meals served daily' },
        { name: 'Dormitories', icon: Building2, description: 'Comfortable boarding facilities' },
        { name: 'Sports Field', icon: Trophy, description: 'Football and athletics track' },
      ],
      programs: [
        { name: 'Nursery', ages: '3-5 years', description: 'Early childhood development with play-based learning' },
        { name: 'Primary', grades: 'P.1 - P.7', description: 'Comprehensive primary education following national curriculum' },
      ],
      contact: {
        phone: '+256 (0) 772 123 456',
        email: 'main.campus@oasisschools.ac.ug',
        address: 'P.O. Box 123, Abirichi, Arua, Uganda',
        hours: 'Mon - Fri: 8:00 AM - 5:00 PM'
      },
      achievements: [
        'Top performer in district exams 2023',
        'Best boarding facility award 2022',
        '100% PLE pass rate for 5 consecutive years',
      ],
    },
    'muni': {
      id: 'muni',
      name: 'Muni Campus',
      location: 'Muni, Arua',
      established: '2015',
      students: '300+',
      programs: 'Primary P.1 - P.7',
      type: 'Boarding Only',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      description: 'A dedicated boarding campus for primary students from P.1 to P.7. Focused on academic excellence and character development in a structured boarding environment.',
      longDescription: 'Muni Campus specializes in holistic boarding education, providing a home away from home for primary students. Our experienced staff ensure academic excellence while nurturing independence, responsibility, and strong moral values. The serene environment is ideal for focused learning and personal growth.',
      facilities: [
        { name: 'Classrooms', icon: School, description: '10 spacious classrooms' },
        { name: 'Dormitories', icon: Building2, description: 'Comfortable boys and girls hostels' },
        { name: 'Study Hall', icon: BookMarked, description: 'Supervised evening studies' },
        { name: 'Sports Field', icon: Trophy, description: 'Football and athletics facilities' },
        { name: 'Dining Hall', icon: Utensils, description: 'Balanced meals three times daily' },
        { name: 'Library', icon: Library, description: '1,500+ books for reference' },
      ],
      programs: [
        { name: 'Primary', grades: 'P.1 - P.7', description: 'Full boarding primary education' },
      ],
      contact: {
        phone: '+256 (0) 773 456 789',
        email: 'muni.campus@oasisschools.ac.ug',
        address: 'Muni Hill, Arua, Uganda',
        hours: 'Mon - Fri: 8:00 AM - 5:00 PM'
      },
      achievements: [
        'Best boarding school in West Nile 2023',
        '95% first grade in PLE 2023',
        'Excellent discipline record',
      ],
    },
    'annex': {
      id: 'annex',
      name: 'Annex Campus',
      location: 'Obolokofuku/Oli, Arua',
      established: '2016',
      students: '250+',
      programs: 'Nursery & Primary',
      type: 'Day Only',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Conveniently located day campus serving nursery and primary students. Perfect for families seeking quality education with the flexibility of day schooling.',
      longDescription: 'Annex Campus offers the perfect solution for families who prefer day schooling. Located in a accessible area, our campus provides quality education with the convenience of daily commute. We maintain strong parent-teacher partnerships to ensure each child receives personalized attention.',
      facilities: [
        { name: 'Classrooms', icon: School, description: '8 modern, ventilated classrooms' },
        { name: 'Play Areas', icon: Dumbbell, description: 'Safe outdoor play equipment' },
        { name: 'Library', icon: Library, description: 'Reading resources for all ages' },
        { name: 'Computer Lab', icon: Computer, description: 'Basic computer literacy' },
        { name: 'Sports Facilities', icon: Trophy, description: 'Basketball court and playground' },
      ],
      programs: [
        { name: 'Nursery', ages: '3-5 years', description: 'Early childhood development' },
        { name: 'Primary', grades: 'P.1 - P.7', description: 'Day primary education' },
      ],
      contact: {
        phone: '+256 (0) 774 567 890',
        email: 'annex.campus@oasisschools.ac.ug',
        address: 'Obolokofuku/Oli, Arua, Uganda',
        hours: 'Mon - Fri: 7:30 AM - 4:30 PM'
      },
      achievements: [
        'Outstanding parent satisfaction rating',
        'Best day school in Arua 2023',
        'Strong co-curricular program',
      ],
    },
    'golden-brain': {
      id: 'golden-brain',
      name: 'Golden Brain Campus',
      location: 'Koboko',
      established: '2018',
      students: '200+',
      programs: 'Nursery - P.7',
      type: 'Day & Boarding',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      description: 'A complete educational campus offering nursery through primary P.7 with both day and boarding options. Comprehensive facilities for holistic development.',
      longDescription: 'Golden Brain Campus combines modern education with traditional values. Our facility caters to students from nursery through primary seven, offering both day and boarding options. We focus on developing well-rounded individuals through academics, sports, and character education.',
      facilities: [
        { name: 'Classrooms', icon: School, description: '10 smart classrooms' },
        { name: 'Dormitories', icon: Building2, description: 'Modern boarding facilities' },
        { name: 'Library', icon: Library, description: '1,000+ books and resources' },
        { name: 'Sports Ground', icon: Trophy, description: 'Football field and courts' },
        { name: 'Science Lab', icon: FlaskConical, description: 'Basic science equipment' },
        { name: 'Computer Lab', icon: Computer, description: 'ICT training center' },
        { name: 'Dining Hall', icon: Utensils, description: 'Nutritious meals' },
      ],
      programs: [
        { name: 'Nursery', ages: '3-5 years', description: 'Early childhood education' },
        { name: 'Primary', grades: 'P.1 - P.7', description: 'Comprehensive primary' },
      ],
      contact: {
        phone: '+256 (0) 775 678 901',
        email: 'goldenbrain@oasisschools.ac.ug',
        address: 'Koboko Town, Uganda',
        hours: 'Mon - Fri: 8:00 AM - 5:00 PM'
      },
      achievements: [
        'Fastest growing campus',
        'Innovation in education award 2023',
        'Strong community partnerships',
      ],
    },
  };

  const campus = campusData[id] || campusData['main'];

  return (
    <div className="campus-detail-page">
      {/* Hero Section */}
      <section className="campus-hero">
        <div className="hero-backdrop">
          <img src={campus.image} alt={campus.name} className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="container">
            <div className="hero-breadcrumb">
              <span>Home</span>
              <ChevronRight size={14} />
              <span>Campuses</span>
              <ChevronRight size={14} />
              <span className="current">{campus.name}</span>
            </div>
            
            <div className="hero-text">
              <div className="campus-type-badge">
                <GraduationCap size={16} />
                <span>Est. {campus.established}</span>
              </div>
              
              <h1 className="hero-title">{campus.name}</h1>
              
              <div className="hero-meta">
                <div className="meta-item">
                  <MapPin size={18} />
                  <span>{campus.location}</span>
                </div>
                <div className="meta-item">
                  <Users size={18} />
                  <span>{campus.students} Students</span>
                </div>
                <div className="meta-item">
                  <BookOpen size={18} />
                  <span>{campus.programs}</span>
                </div>
              </div>
              
              <div className="hero-tags">
                {campus.type.split(' & ').map((type, index) => (
                  <span key={index} className={`tag ${type.toLowerCase()}`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <Calendar className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">{campus.established}</span>
                <span className="stat-label">Established</span>
              </div>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">{campus.students}</span>
                <span className="stat-label">Students</span>
              </div>
            </div>
            <div className="stat-card">
              <BookOpen className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">{campus.programs}</span>
                <span className="stat-label">Programs</span>
              </div>
            </div>
            <div className="stat-card">
              <Building2 className="stat-icon" />
              <div className="stat-info">
                <span className="stat-value">{campus.facilities.length}</span>
                <span className="stat-label">Facilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content-section">
        <div className="container">
          <div className="content-grid">
            {/* Left Column - Main Content */}
            <div className="main-content">
              {/* Navigation Tabs */}
              <div className="content-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'facilities' ? 'active' : ''}`}
                  onClick={() => setActiveTab('facilities')}
                >
                  Facilities
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('programs')}
                >
                  Programs
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  Gallery
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'overview' && (
                  <div className="overview-tab">
                    <h2 className="section-title">About {campus.name}</h2>
                    <p className="description-text">{campus.description}</p>
                    <p className="description-text">{campus.longDescription}</p>
                    
                    <div className="highlights-grid">
                      <div className="highlight-card">
                        <Target className="highlight-icon" />
                        <h3>Our Mission</h3>
                        <p>To provide quality education that nurtures holistic development and strong moral values.</p>
                      </div>
                      <div className="highlight-card">
                        <Eye className="highlight-icon" />
                        <h3>Our Vision</h3>
                        <p>To be a centre of excellence in education producing well-rounded future leaders.</p>
                      </div>
                    </div>

                    <h3 className="sub-title">Achievements</h3>
                    <ul className="achievements-list">
                      {campus.achievements.map((achievement, index) => (
                        <li key={index}>
                          <Award size={18} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'facilities' && (
                  <div className="facilities-tab">
                    <h2 className="section-title">Our Facilities</h2>
                    <div className="facilities-grid">
                      {campus.facilities.map((facility, index) => {
                        const Icon = facility.icon;
                        return (
                          <div key={index} className="facility-card">
                            <div className="facility-icon-wrapper">
                              <Icon size={24} />
                            </div>
                            <h3>{facility.name}</h3>
                            <p>{facility.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'programs' && (
                  <div className="programs-tab">
                    <h2 className="section-title">Academic Programs</h2>
                    <div className="programs-list">
                      {campus.programs.map((program, index) => (
                        <div key={index} className="program-card">
                          <div className="program-header">
                            <h3>{program.name}</h3>
                            {program.ages && <span className="program-badge">{program.ages}</span>}
                            {program.grades && <span className="program-badge">{program.grades}</span>}
                          </div>
                          <p>{program.description}</p>
                          <div className="program-features">
                            <span className="feature">
                              <CheckCircle2 size={16} />
                              Qualified Teachers
                            </span>
                            <span className="feature">
                              <CheckCircle2 size={16} />
                              Modern Curriculum
                            </span>
                          </div>
                          <Link to="/admissions" className="program-link">
                            Apply Now
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="gallery-tab">
                    <h2 className="section-title">Campus Gallery</h2>
                    <div className="gallery-grid">
                      {campus.gallery.map((image, index) => (
                        <div key={index} className="gallery-item">
                          <img src={image} alt={`${campus.name} ${index + 1}`} />
                          <div className="gallery-overlay">
                            <Sparkles size={24} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="sidebar">
              {/* Contact Card */}
              <div className="contact-card">
                <h3>Contact Information</h3>
                <div className="contact-items">
                  <div className="contact-item">
                    <Phone size={18} />
                    <div>
                      <span className="label">Phone</span>
                      <span className="value">{campus.contact.phone}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <Mail size={18} />
                    <div>
                      <span className="label">Email</span>
                      <span className="value">{campus.contact.email}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <MapPin size={18} />
                    <div>
                      <span className="label">Address</span>
                      <span className="value">{campus.contact.address}</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <Clock size={18} />
                    <div>
                      <span className="label">Office Hours</span>
                      <span className="value">{campus.contact.hours}</span>
                    </div>
                  </div>
                </div>
                
                <div className="contact-actions">
                  <Link to="/contact" className="btn-primary">
                    Send Message
                  </Link>
                  <Link to="/admissions/apply" className="btn-secondary">
                    Apply Now
                  </Link>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="quick-facts">
                <h3>Quick Facts</h3>
                <ul>
                  <li>
                    <Shield size={16} />
                    <span>Accredited by Ministry of Education</span>
                  </li>
                  <li>
                    <Users size={16} />
                    <span>Student-Teacher Ratio: 25:1</span>
                  </li>
                  <li>
                    <Wifi size={16} />
                    <span>Wi-Fi Enabled Campus</span>
                  </li>
                  <li>
                    <Bus size={16} />
                    <span>School Transport Available</span>
                  </li>
                  <li>
                    <Coffee size={16} />
                    <span>Nutritious Meal Program</span>
                  </li>
                </ul>
              </div>

              {/* CTA Card */}
              <div className="cta-card">
                <h3>Visit Our Campus</h3>
                <p>Schedule a tour and see our facilities firsthand</p>
                <Link to="/visit" className="cta-link">
                  Schedule a Visit
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Oasis Schools?</h2>
            <p>Take the first step towards quality education for your child</p>
            <div className="cta-buttons">
              <Link to="/admissions/apply" className="cta-btn-primary">
                Apply Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="cta-btn-secondary">
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampusDetail;