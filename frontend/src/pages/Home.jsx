// pages/Home.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, ChevronRight, Calendar, Award, Users, 
  BookOpen, Sparkles, Play, X,
  Heart, Camera, Trophy,
  GraduationCap, Clock, Quote, Target, Eye,
  Star, Loader, Shield, Download,
  ArrowRight, CheckCircle2, Building2, Coffee, Library, Trees
} from 'lucide-react';
import '../styles/home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    hero_slides: [],
    statistics: [],
    core_values: [],
    offers: [],
    campuses: [],
    gallery: [],
    testimonials: [],
    events: [],
    welcome: null,
    cta: null,
    settings: null
  });
  
  const [activeFeature, setActiveFeature] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [counters, setCounters] = useState([]);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const statsRef = useRef(null);

  const API_BASE_URL = 'http://127.0.0.1:8000';

  // Complete static data as fallback
  const staticData = {
    hero_slides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1566288623394-377af472d81b?w=1920&auto=format',
        title: 'Welcome to Model Islamic School',
        description: 'Quality Islamic & Secular Education in Arua, Uganda',
        location: 'Former TAWAKAL PRIMARY SCHOOL, Pangsha Ward, Arua',
        overlay_color: 'linear-gradient(135deg, rgba(16,185,129,0.85), rgba(5,150,105,0.9))'
      }
    ],
    statistics: [
      { id: 1, value: 500, label: 'Students', suffix: '+', icon: 'Users', color: '#10B981' },
      { id: 2, value: 45, label: 'Teachers', suffix: '+', icon: 'GraduationCap', color: '#3B82F6' },
      { id: 3, value: 15, label: 'Years of Excellence', suffix: '+', icon: 'Award', color: '#F59E0B' },
      { id: 4, value: 25, label: 'Activities', suffix: '+', icon: 'Sparkles', color: '#8B5CF6' }
    ],
    core_values: [
      { name: 'Honesty', description: 'Truthfulness in all our dealings', icon: '🤝' },
      { name: 'Excellence', description: 'Striving for the best in everything', icon: '🏆' },
      { name: 'Respect', description: 'Treating others with dignity', icon: '❤️' },
      { name: 'Integrity', description: 'Doing what is right always', icon: '⭐' },
      { name: 'Teamwork', description: 'Working together for success', icon: '👥' }
    ],
    offers: [
      { title: 'Qur\'an & Islamic Studies', description: 'Authentic Quranic education with Tajweed', icon: '📖' },
      { title: 'National Curriculum', description: 'Complete UPE curriculum', icon: '📚' },
      { title: 'Day Care Program', description: 'Safe environment for young children', icon: '🧸' },
      { title: 'Character Building', description: 'Moral and spiritual development', icon: '💚' },
      { title: 'Extracurricular', description: 'Sports and cultural activities', icon: '⚽' }
    ],
    gallery: [
      { id: 1, title: 'Qur\'an Class', category: 'Islamic Studies', thumbnail: 'https://images.unsplash.com/photo-1566288623394-377af472d81b?w=600&auto=format' },
      { id: 2, title: 'Kindergarten', category: 'Early Years', thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format' },
      { id: 3, title: 'Classroom', category: 'Academics', thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format' },
      { id: 4, title: 'Playground', category: 'Sports', thumbnail: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&auto=format' }
    ],
    testimonials: [
      { name: 'Amina Hassan', role: 'Parent', quote: 'The transformation in my daughter\'s character is remarkable.', rating: 5 },
      { name: 'Ibrahim Ssettuba', role: 'Parent', quote: 'Excellent balance of Islamic values and modern education.', rating: 5 },
      { name: 'Fatuma Nambi', role: 'Community Member', quote: 'A shining example of quality Islamic education in Arua.', rating: 5 }
    ],
    events: [
      { title: 'Annual Quran Competition', date_display: 'Coming Soon', description: 'Students showcase memorization', time: '9:00 AM', location: 'School Hall' },
      { title: 'Parents Meeting', date_display: 'Next Week', description: 'Discuss student progress', time: '2:00 PM', location: 'School Hall' }
    ],
    welcome: {
      title: 'Model Islamic Kindergarten & Primary School - Arua',
      subtitle: 'Welcome to Our School',
      description_paragraphs: [
        'We are a mixed private day school offering Day Care, providing both secular and theology Education to the Community. Our commitment is to nurture children with academic excellence and strong Islamic values.'
      ],
      vision_text: 'To have a spiritually upright, productive and prosperous Muslim community.',
      mission_text: 'To improve sustainable Islamic environment and quality of moral life in the community.',
      learn_more_link: '/about'
    },
    cta: {
      title: 'Begin Your Child\'s Journey Today',
      text: 'Limited spaces available for the upcoming academic year',
      primary_button_text: 'Apply Now',
      primary_button_link: '/admissions/apply',
      secondary_button_text: 'Contact Us',
      secondary_button_link: '/contact'
    },
    settings: {
      auto_rotate_speed: 5000,
      enable_parallax: false
    }
  };

  // School contact info
  const schoolInfo = {
    name: "Model Islamic Kindergarten & Primary School - Arua",
    location: "Former TAWAKAL PRIMARY SCHOOL, Pangsha Ward, Arua",
    established: "2008",
    motto: "Excellence is our pride",
    phones: ["+256 394 817964", "+256 784 415103"],
    email: "info@modelislamic.ac.ug",
    
    programs: [
      { level: "Day Care", age: "2-3 years", timing: "8:00 AM - 12:00 PM", features: ["Safe environment", "Islamic songs", "Play-based learning"] },
      { level: "Kindergarten", age: "3-5 years", timing: "8:00 AM - 2:00 PM", features: ["Qur'an basics", "Islamic manners", "Early academics"] },
      { level: "Primary School", age: "6-12 years", timing: "8:00 AM - 3:00 PM", features: ["Full curriculum", "Qur'an memorization", "Arabic language"] }
    ],
    
    facilities: [
      { icon: Library, name: "Islamic Library", description: "Rich collection of Islamic books" },
      { icon: Building2, name: "Prayer Hall", description: "Spacious musalla for prayers" },
      { icon: Coffee, name: "Halal Kitchen", description: "Nutritious halal meals" },
      { icon: Trees, name: "Playground", description: "Safe outdoor play area" }
    ],
    
    faqs: [
      { q: "What age groups do you accept?", a: "We accept children from age 2 years for Day Care, 3-5 years for Kindergarten, and 6-12 years for Primary School." },
      { q: "Is Arabic taught at the school?", a: "Yes, Arabic is taught as a subject from Kindergarten level with focus on Quranic Arabic." },
      { q: "Do you offer boarding facilities?", a: "Currently, we are a day school only. However, we have extended hours programs for working parents." },
      { q: "What is the student-teacher ratio?", a: "We maintain an average ratio of 15:1 to ensure personalized attention for each child." }
    ]
  };

  // Fetch data from API with fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/website/homepage-data/`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Merge API data with static data (API takes priority)
        setData({
          hero_slides: result.hero_slides?.length > 0 ? result.hero_slides : staticData.hero_slides,
          statistics: result.statistics?.length > 0 ? result.statistics : staticData.statistics,
          core_values: result.core_values?.length > 0 ? result.core_values : staticData.core_values,
          offers: result.offers?.length > 0 ? result.offers : staticData.offers,
          campuses: result.campuses || [],
          gallery: result.gallery?.length > 0 ? result.gallery : staticData.gallery,
          testimonials: result.testimonials?.length > 0 ? result.testimonials : staticData.testimonials,
          events: result.events?.length > 0 ? result.events : staticData.events,
          welcome: result.welcome || staticData.welcome,
          cta: result.cta || staticData.cta,
          settings: result.settings || staticData.settings
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        // Use static data when API fails
        setData({
          hero_slides: staticData.hero_slides,
          statistics: staticData.statistics,
          core_values: staticData.core_values,
          offers: staticData.offers,
          campuses: [],
          gallery: staticData.gallery,
          testimonials: staticData.testimonials,
          events: staticData.events,
          welcome: staticData.welcome,
          cta: staticData.cta,
          settings: staticData.settings
        });
        setError('Using offline data. API connection failed.');
      } finally {
        // Short delay to show loading animation
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchData();
  }, []);

  // Auto-rotate hero slides
  useEffect(() => {
    if (!data.hero_slides?.length) return;
    const speed = data.settings?.auto_rotate_speed || 5000;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % data.hero_slides.length);
    }, speed);
    return () => clearInterval(interval);
  }, [data.hero_slides?.length, data.settings?.auto_rotate_speed]);

  // Counter animation
  useEffect(() => {
    if (data.statistics.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsAnimated) {
        setStatsAnimated(true);
        setCounters(new Array(data.statistics.length).fill(0));
        
        data.statistics.forEach((stat, index) => {
          let start = 0;
          const end = stat.value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = end;
                return newCounters;
              });
              clearInterval(timer);
            } else {
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(start);
                return newCounters;
              });
            }
          }, 16);
        });
      }
    }, { threshold: 0.5 });
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, [data.statistics, statsAnimated]);

  // Helper function for images
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('https')) return path;
    return path;
  };

  if (loading) {
    return (
      <div className="modern-loading">
        <div className="modern-loader">
          <div className="loader-ring"></div>
          <div className="loader-text">
            <span className="arabic">بسم الله</span>
            <p>Loading Model Islamic School...</p>
          </div>
        </div>
      </div>
    );
  }

  const heroSlides = data.hero_slides || staticData.hero_slides;
  const currentSlideInfo = heroSlides[currentSlide] || heroSlides[0] || {};

  // Helper to get icon component
  const getIconComponent = (iconName) => {
    const icons = {
      'Users': Users,
      'Award': Award,
      'GraduationCap': GraduationCap,
      'BookOpen': BookOpen,
      'Sparkles': Sparkles,
      'Heart': Heart,
      'Target': Target,
      'Eye': Eye,
      'Star': Star
    };
    return icons[iconName] || Users;
  };

  return (
    <div className="modern-home">
      {/* API Error Notice (if any) */}
      {error && (
        <div className="api-notice">
          <span>{error}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="modern-hero">
        <div className="hero-backdrop">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id || index}
                className={`hero-slide ${isActive ? 'active' : ''}`}
                style={{
                  backgroundImage: slide.image ? `url(${getImageUrl(slide.image)})` : 'none',
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1
                }}
              >
                <div 
                  className="slide-overlay" 
                  style={{ 
                    background: slide.overlay_color || 'linear-gradient(135deg, rgba(16,185,129,0.85), rgba(5,150,105,0.95))' 
                  }}
                />
              </div>
            );
          })}
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Since {schoolInfo.established}
              </div>
              
              <h1 className="hero-title">
                {data.welcome?.title || 'Model Islamic'} <span className="highlight">School</span>
              </h1>
              
              <p className="hero-description">
                {currentSlideInfo.description || schoolInfo.location}
              </p>
              
              <div className="hero-buttons">
                <Link to="/admissions/apply" className="btn-primary">
                  Start Application
                  <ArrowRight size={18} />
                </Link>
                <button className="btn-secondary" onClick={() => setShowContactModal(true)}>
                  <Phone size={18} />
                  Contact Us
                </button>
              </div>
              
              {/* Statistics */}
              {data.statistics?.length > 0 && (
                <div className="hero-stats" ref={statsRef}>
                  {data.statistics.map((stat, idx) => {
                    const currentNumber = counters[idx] || 0;
                    const Icon = getIconComponent(stat.icon);
                    return (
                      <div key={stat.id || idx} className="stat-block">
                        <Icon size={20} color={stat.color || '#10B981'} />
                        <div className="stat-info">
                          <span className="stat-value">{currentNumber}{stat.suffix || '+'}</span>
                          <span className="stat-label">{stat.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="hero-visual">
              <div className="visual-card">
                <div className="quran-verse">
                  <span className="arabic">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</span>
                  <p>"Read! In the name of your Lord who created" - Quran 96:1</p>
                </div>
                <div className="feature-carousel">
                  <div className="feature-slide">
                    <BookOpen size={32} />
                    <h4>Quality Education</h4>
                    <p>Integrating Islamic values with modern academics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome / About Section */}
      {data.welcome && (
        <section className="modern-about">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">About Us</span>
              <h2>{data.welcome.title || 'Welcome to Model Islamic School'}</h2>
              <p>{schoolInfo.location}</p>
            </div>
            
            <div className="about-grid">
              <div className="about-content">
                {data.welcome.description_paragraphs?.map((paragraph, idx) => (
                  <p key={idx} className="about-text">{paragraph}</p>
                ))}
                
                <div className="vision-mission">
                  <div className="vision">
                    <Eye size={24} />
                    <h4>Our Vision</h4>
                    <p>{data.welcome.vision_text || 'To have a spiritually upright, productive and prosperous Muslim community.'}</p>
                  </div>
                  <div className="mission">
                    <Target size={24} />
                    <h4>Our Mission</h4>
                    <p>{data.welcome.mission_text || 'To improve sustainable Islamic environment and quality of moral life in the community.'}</p>
                  </div>
                </div>
              </div>
              
              <div className="about-stats">
                <div className="stat-grid">
                  <div className="stat-circle">
                    <div className="circle-bg"></div>
                    <div className="circle-content">
                      <span className="number">15+</span>
                      <span className="label">Years</span>
                    </div>
                  </div>
                  <div className="stat-circle">
                    <div className="circle-bg"></div>
                    <div className="circle-content">
                      <span className="number">500+</span>
                      <span className="label">Students</span>
                    </div>
                  </div>
                  <div className="stat-circle">
                    <div className="circle-bg"></div>
                    <div className="circle-content">
                      <span className="number">45+</span>
                      <span className="label">Teachers</span>
                    </div>
                  </div>
                </div>
                <div className="motto-block">
                  <Quote size={24} />
                  <p>{schoolInfo.motto}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Values Section */}
      {data.core_values?.length > 0 && (
        <section className="modern-values">
          <div className="container">
            <div className="section-header centered">
              <span className="section-badge">Our Core Values</span>
              <h2>What Guides Us</h2>
              <p>The principles that shape everything we do</p>
            </div>
            
            <div className="values-grid-modern">
              {data.core_values.map((value, idx) => (
                <div key={idx} className="value-card-modern">
                  <div className="value-icon">{value.icon || '⭐'}</div>
                  <h3>{value.name}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs Section */}
      <section className="modern-programs">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Programs</span>
            <h2>Educational Pathways</h2>
            <p>Tailored programs for every stage of your child's development</p>
          </div>
          
          <div className="programs-grid">
            {schoolInfo.programs.map((program, idx) => (
              <div key={idx} className="program-modern">
                <div className="program-header">
                  <h3>{program.level}</h3>
                  <span className="program-age">{program.age}</span>
                </div>
                <div className="program-timing">
                  <Clock size={16} />
                  <span>{program.timing}</span>
                </div>
                <ul className="program-features">
                  {program.features.map((feature, fIdx) => (
                    <li key={fIdx}>
                      <CheckCircle2 size={14} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/admissions/apply" className="program-link">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      {data.offers?.length > 0 && (
        <section className="modern-features">
          <div className="container">
            <div className="section-header centered">
              <span className="section-badge">What We Offer</span>
              <h2>A Complete Educational Experience</h2>
              <p>Comprehensive programs designed for holistic development</p>
            </div>
            
            <div className="features-grid">
              {data.offers.slice(0, 6).map((offer, idx) => (
                <div key={idx} className="feature-modern">
                  <div className="feature-icon">
                    <span className="offer-emoji">{offer.icon || '📚'}</span>
                  </div>
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {data.gallery?.length > 0 && (
        <section className="modern-gallery">
          <div className="container">
            <div className="section-header centered">
              <span className="section-badge">Gallery</span>
              <h2>Moments at Our School</h2>
              <p>Glimpses of daily life and learning</p>
            </div>
            
            <div className="gallery-grid-modern">
              {data.gallery.slice(0, 4).map((image, idx) => (
                <div key={image.id || idx} className="gallery-item-modern">
                  <img src={getImageUrl(image.thumbnail || image.image)} alt={image.title} />
                  <div className="gallery-overlay-modern">
                    <h4>{image.title}</h4>
                    <p>{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {data.testimonials?.length > 0 && (
        <section className="modern-testimonials">
          <div className="container">
            <div className="section-header centered">
              <span className="section-badge">Testimonials</span>
              <h2>What Parents Say</h2>
              <p>Real experiences from our school community</p>
            </div>
            
            <div className="testimonials-grid">
              {data.testimonials.slice(0, 3).map((testimonial, idx) => (
                <div key={idx} className="testimonial-modern">
                  <Quote className="quote-icon" size={32} />
                  <p className="testimonial-text">"{testimonial.quote}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                  <div className="testimonial-stars">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="modern-faq">
        <div className="container">
          <div className="faq-wrapper">
            <div className="faq-header">
              <span className="section-badge">FAQ</span>
              <h2>Frequently Asked Questions</h2>
              <p>Find quick answers to common inquiries</p>
            </div>
            
            <div className="faq-grid">
              {schoolInfo.faqs.map((faq, idx) => (
                <details key={idx} className="faq-item-modern">
                  <summary>
                    {faq.q}
                    <ChevronRight size={18} className="faq-arrow" />
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {data.cta && (
        <section className="modern-cta">
          <div className="container">
            <div className="cta-card">
              <div className="cta-content">
                <h2>{data.cta.title || 'Begin Your Child\'s Journey'}</h2>
                <p>{data.cta.text || 'Limited spaces available for the upcoming academic year.'}</p>
                <div className="cta-buttons">
                  <Link to={data.cta.primary_button_link || '/admissions/apply'} className="btn-primary-large">
                    {data.cta.primary_button_text || 'Apply for Admission'}
                    <ArrowRight size={20} />
                  </Link>
                  <div className="contact-quick">
                    <Phone size={16} />
                    <span>Call us: {schoolInfo.phones[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="contact-modal-modern" onClick={() => setShowContactModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContactModal(false)}>
              <X size={20} />
            </button>
            <h3>Contact Us</h3>
            <div className="modal-contact-info">
              <div className="modal-contact-item">
                <Phone size={18} />
                <div>
                  <strong>Call Us</strong>
                  <a href="tel:+256394817964">{schoolInfo.phones[0]}</a>
                  <a href="tel:+256784415103">{schoolInfo.phones[1]}</a>
                </div>
              </div>
              <div className="modal-contact-item">
                <MapPin size={18} />
                <div>
                  <strong>Visit Us</strong>
                  <p>{schoolInfo.location}</p>
                </div>
              </div>
              <div className="modal-contact-item">
                <Mail size={18} />
                <div>
                  <strong>Email Us</strong>
                  <a href="mailto:info@modelislamic.ac.ug">{schoolInfo.email}</a>
                </div>
              </div>
            </div>
            <button className="modal-action" onClick={() => window.location.href = 'tel:+256394817964'}>
              Call Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;