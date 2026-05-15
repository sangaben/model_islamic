import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Youtube,
  Mail, Phone, MapPin, Clock, ChevronRight,
  GraduationCap, Heart, Award, Map,
  BookOpen, Users, Calendar, Download, Sun, Moon,
  School, Home, TreePine, Star, Quote, Target, Eye,
  Sparkles, CheckCircle, Compass
} from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'smooth' for smooth scrolling, or 'auto' for instant
    });
  };

  // UPDATED: School details from WhatsApp images
  const schoolDetails = {
    name: "Model Islamic Kindergarten & Primary School - Arua",
    shortName: "Model Islamic School",
    location: "At former TAWAKAL PRIMARY SCHOOL, Pangsha Ward",
    type: "Mixed Private Day School offering Day Care",
    education: "Secular and Theology Education",
    motto: "Excellence is our pride",
    vision: "To have a Spiritual/morally upright, productive and prosperous Muslim Community.",
    mission: "To improve sustainable Islamic environment, quality of moral life of all Muslims in the district and to promote and sustain socio-economic development, good governance and culture of tolerance.",
    phones: ["+256 394 817964", "+256 784 415103"],
    email: "info@modelislamic.education",
    established: "2020",
    coreValues: [
      "Honesty",
      "Reliability", 
      "Excellence",
      "Teamwork and communication",
      "Innovative thinking"
    ]
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'News & Events', path: '/news' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const resources = [
    { name: 'Student Portal', path: '/portal/student', icon: Users },
    { name: 'Parent Portal', path: '/portal/parent', icon: Heart },
    { name: 'Staff Portal', path: '/portal/staff', icon: Award },
    { name: 'Downloads', path: '/downloads', icon: Download },
    { name: 'Academic Calendar', path: '/calendar', icon: Calendar },
    { name: 'Prayer Times', path: '/prayer-times', icon: Compass },
  ];

  // UPDATED: Single campus information (former TAWAKAL PRIMARY SCHOOL)
  const campus = {
    name: 'Main Campus',
    location: schoolDetails.location,
    programs: 'Day Care, Kindergarten & Primary (P.1-P.7)',
    type: 'Day School with Day Care',
    icon: School,
    color: '#2d5e3b'
  };

  const contactInfo = [
    { 
      icon: Phone, 
      info: schoolDetails.phones[0], 
      label: 'Admissions', 
      value: 'Call for inquiries' 
    },
    { 
      icon: Phone, 
      info: schoolDetails.phones[1], 
      label: 'General', 
      value: 'Alternative line' 
    },
    { 
      icon: Mail, 
      info: schoolDetails.email, 
      label: 'Email us', 
      value: '24/7 Support' 
    },
    { 
      icon: MapPin, 
      info: schoolDetails.location, 
      label: 'Location', 
      value: 'Pangsha Ward, Arua' 
    },
    { 
      icon: Clock, 
      info: '8:00 AM - 5:00 PM', 
      label: 'Office hours', 
      value: 'Monday - Friday' 
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/modelislamicaru', label: 'Facebook', color: '#1877f2' },
    { icon: Twitter, href: 'https://twitter.com/modelislamicaru', label: 'Twitter', color: '#1da1f2' },
    { icon: Instagram, href: 'https://instagram.com/modelislamicaru', label: 'Instagram', color: '#e4405f' },
    { icon: Youtube, href: 'https://youtube.com/modelislamicaru', label: 'YouTube', color: '#ff0000' },
  ];

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            
            {/* Brand Column - UPDATED with correct school info */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon-wrapper">
                  <GraduationCap className="logo-icon" style={{ color: '#b4975a' }} />
                </div>
                <div className="logo-text">
                  <span className="logo-main">MODEL ISLAMIC</span>
                  <span className="logo-sub">Kindergarten & Primary School</span>
                  <span className="logo-tagline">Est. {schoolDetails.established} · Arua</span>
                </div>
              </div>
              
              <div className="motto-badge">
                <Quote size={14} />
                <span>{schoolDetails.motto}</span>
              </div>
              
              <p className="brand-description">
                {schoolDetails.type}. {schoolDetails.education}. Located at {schoolDetails.location}.
                Nurturing young minds with both secular knowledge and Islamic values.
              </p>
              
              <div className="accreditation-badge">
                <Award className="badge-icon" />
                <span>Mixed Private Day School · Ministry of Education</span>
              </div>
              
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{ '--social-color': social.color }}
                  >
                    <social.icon className="social-icon" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="link-list">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="link-item" onClick={scrollToTop}>
                      <ChevronRight className="link-icon" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-links">
              <h3 className="footer-title">Resources</h3>
              <ul className="link-list">
                {resources.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.path}>
                      <Link to={link.path} className="link-item" onClick={scrollToTop}>
                        <Icon className="link-icon" />
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact Information - UPDATED with correct contact details */}
            <div className="footer-contact">
              <h3 className="footer-title">Contact Us</h3>
              <div className="contact-info">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-item">
                    <div className="contact-icon-wrapper">
                      <item.icon className="contact-icon" />
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">{item.label}</span>
                      <span className="contact-value">{item.info}</span>
                      <span className="contact-sub">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Campus Section - UPDATED with single campus */}
          <div className="campus-section">
            <h3 className="footer-title campuses-title">Our Location</h3>
            <div className="campus-grid">
              <div className="campus-card featured">
                <div className="campus-icon" style={{ backgroundColor: `${campus.color}20` }}>
                  <campus.icon className="campus-icon-svg" style={{ color: campus.color }} />
                </div>
                <div className="campus-info">
                  <h4 className="campus-name">{campus.name}</h4>
                  <p className="campus-location">
                    <MapPin size={12} />
                    {campus.location}
                  </p>
                  <p className="campus-programs">{campus.programs}</p>
                  <div className="campus-type">
                    <span className="type-badge day">
                      <Sun size={12} />
                      Day School
                    </span>
                    <span className="type-badge day">
                      <Sparkles size={12} />
                      Day Care
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section - NEW from WhatsApp details */}
          <div className="core-values-section">
            <h3 className="footer-title values-title">Our Core Values</h3>
            <div className="values-grid">
              {schoolDetails.coreValues.map((value, index) => (
                <div key={index} className="value-item">
                  <CheckCircle size={14} className="value-icon" />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision & Mission Preview - NEW from WhatsApp details */}
          <div className="vision-mission-preview">
            <div className="vision-preview">
              <Eye size={16} className="preview-icon" />
              <div>
                <strong>Our Vision</strong>
                <p>{schoolDetails.vision.substring(0, 80)}...</p>
              </div>
            </div>
            <div className="mission-preview">
              <Target size={16} className="preview-icon" />
              <div>
                <strong>Our Mission</strong>
                <p>{schoolDetails.mission.substring(0, 80)}...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - UPDATED with correct school name and motto */}
      <div className="footer-bottom">
        <div className="container">
          <div className="bottom-bar-content">
            <div className="copyright">
              <span>© {currentYear} Model Islamic Kindergarten & Primary School - Arua. All rights reserved.</span>
              <span className="separator">|</span>
              <span>Established {schoolDetails.established}</span>
            </div>
            
            <div className="footer-legal">
              <Link to="/privacy" className="legal-link" onClick={scrollToTop}>
                Privacy Policy
              </Link>
              <Link to="/terms" className="legal-link" onClick={scrollToTop}>
                Terms of Use
              </Link>
              <Link to="/sitemap" className="legal-link" onClick={scrollToTop}>
                Sitemap
              </Link>
            </div>

            <div className="footer-credit">
              <span>{schoolDetails.motto}</span>
              <Heart className="heart-icon" style={{ color: '#b4975a' }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;