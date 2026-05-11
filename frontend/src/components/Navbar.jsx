// components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronDown, GraduationCap, Phone, Mail, MapPin,
  BookOpen, Users, Newspaper, Images, Download, Info,
  Home, School, Award, Shield, LogIn, Calendar, ChevronRight,
  Search, User, ExternalLink, Bell, Sun, Moon, Star,
  Heart, Target, Eye, Sparkles, Clock, MapPin as MapPinIcon,
  BookMarked, Compass, Sunrise, Sunset, Droplet, Quote
} from 'lucide-react';
import '../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [prayerTime, setPrayerTime] = useState('Dhuhr: 1:15 PM');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const dropdownRef = useRef(null);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const navbarRef = useRef(null);
  const timeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const schoolDetails = {
    name: "MODEL ISLAMIC KINDERGARTEN & PRIMARY SCHOOL - ARUA",
    location: "At former TAWAKAL PRIMARY SCHOOL, Pangsha Ward",
    type: "Mixed Private Day School offering Day Care",
    phones: ["+256 394 817964", "+256 784 415103"],
    motto: "Excellence is our pride",
    vision: "To have a Spiritual/morally upright, productive and prosperous Muslim Community.",
    mission: "To improve sustainable Islamic environment, quality of moral life of all Muslims in the district and to promote and sustain socio-economic development, good governance and culture of tolerance.",
    coreValues: ["Honesty", "Reliability", "Excellence", "Teamwork and communication", "Innovative thinking"]
  };

  // Handle scroll with debounce to prevent shaking
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Update scrolled state for navbar styling
          setScrolled(currentScrollY > 50);
          
          // Update scroll progress bar
          const winScroll = document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const scrolledProgress = (winScroll / height) * 100;
          const progressBar = document.querySelector('.scroll-progress');
          if (progressBar) {
            progressBar.style.width = scrolledProgress + '%';
          }
          
          // Hide/show navbar on scroll (prevents shaking)
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          scrollTimeoutRef.current = setTimeout(() => {
            if (currentScrollY > lastScrollY && currentScrollY > 100 && !isOpen) {
              setIsVisible(false);
            } else {
              setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
          }, 50);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [lastScrollY, isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Update prayer time based on time of day
  useEffect(() => {
    const updatePrayerTime = () => {
      const hours = new Date().getHours();
      if (hours < 5) setPrayerTime('Fajr: 5:30 AM');
      else if (hours < 12) setPrayerTime('Dhuhr: 1:15 PM');
      else if (hours < 15) setPrayerTime('Asr: 4:30 PM');
      else if (hours < 18) setPrayerTime('Maghrib: 6:45 PM');
      else setPrayerTime('Isha: 8:00 PM');
    };
    updatePrayerTime();
    const interval = setInterval(updatePrayerTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const navItems = [
    { name: 'Home', path: '/', exact: true, icon: Home },
    {
      name: 'About Us',
      path: '/about',
      icon: Info,
      dropdown: [
        { name: 'Our History', path: '/about/history', icon: Clock },
        { name: 'Mission & Vision', path: '/about/mission', icon: Target },
        { name: 'Core Values', path: '/about/values', icon: Heart },
        { name: 'Leadership', path: '/about/leadership', icon: Users },
      ]
    },
    {
      name: 'Academics',
      path: '/academics',
      icon: BookOpen,
      dropdown: [
        { name: 'Day Care', path: '/academics#daycare', icon: Heart },
        { name: 'Kindergarten', path: '/academics#kindergarten', icon: Star },
        { name: 'Primary School', path: '/academics#primary', icon: School },
        { name: 'Academic Calendar', path: '/academics#calendar', icon: Calendar },
      ]
    },
    {
      name: 'Admissions',
      path: '/admissions',
      icon: LogIn,
      dropdown: [
        { name: 'How to Apply', path: '/admissions#apply', icon: ChevronRight },
        { name: 'Entry Requirements', path: '/admissions#requirements', icon: Target },
        { name: 'Tuition & Fees', path: '/admissions#fees', icon: Shield },
        { name: 'Scholarships', path: '/admissions#scholarships', icon: Award },
      ]
    },
    { name: 'News & Events', path: '/news', icon: Newspaper },
    { name: 'Gallery', path: '/gallery', icon: Images },
    { name: 'Downloads', path: '/downloads', icon: Download },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    const pathWithoutHash = location.pathname;
    const targetPath = path.split('#')[0];
    return pathWithoutHash === targetPath || pathWithoutHash.startsWith(targetPath + '/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchInputRef.current?.value;
    if (query && query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <>
      {/* Motto Bar - Hidden on mobile */}
      <div className={`motto-bar ${scrolled ? 'hidden' : ''}`}>
        <div className="container">
          <div className="motto-content">
            <Quote size={14} />
            <span>{schoolDetails.motto}</span>
          </div>
        </div>
      </div>

      {/* Islamic Greeting Bar - Hidden on mobile */}
      <div className={`islamic-greeting-bar ${scrolled ? 'hidden' : ''}`}>
        <div className="container">
          <div className="greeting-content">
            <div className="greeting-right">
              <span className="arabic-text">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</span>
              <span className="separator">|</span>
              <span className="english-text">In the Name of Allah, the Most Gracious, the Most Merciful</span>
            </div>
            <div className="greeting-left">
              <div className="prayer-time-display">
                <Sunrise size={14} />
                <span>Next Prayer: {prayerTime}</span>
              </div>
              <span className="separator">|</span>
              <span className="hijri-date">1447 AH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Bar - Contact Info */}
      <div className={`top-bar ${scrolled ? 'hidden' : ''}`}>
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <a href="tel:+256394817964" className="top-bar-link">
                <Phone size={14} />
                <span>{schoolDetails.phones[0]}</span>
              </a>
              <span className="separator">|</span>
              <a href="tel:+256784415103" className="top-bar-link">
                <Phone size={14} />
                <span>{schoolDetails.phones[1]}</span>
              </a>
              <span className="separator">|</span>
              <a href="mailto:info@modelislamic.education" className="top-bar-link">
                <Mail size={14} />
                <span>info@modelislamic.education</span>
              </a>
            </div>
            <div className="top-bar-right">
              <span className="top-bar-link location-link">
                <MapPinIcon size={14} />
                <span>{schoolDetails.location.substring(0, 30)}...</span>
              </span>
              <span className="separator">|</span>
              <div className="notification-badge" onClick={() => setNotificationCount(0)}>
                <Bell size={16} />
                {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
              </div>
              <button className={`search-toggle ${searchOpen ? 'active' : ''}`} onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`search-bar ${searchOpen ? 'active' : ''}`}>
        <div className="container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <Search size={20} className="search-icon" />
            <input ref={searchInputRef} type="text" placeholder="Search for programs, news, information..." className="search-input" />
            <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>
              <X size={20} />
            </button>
          </form>
          <div className="search-suggestions">
            <span>Popular: </span>
            <Link to="/admissions#apply" onClick={() => setSearchOpen(false)}>Admissions</Link>
            <Link to="/academics#daycare" onClick={() => setSearchOpen(false)}>Day Care</Link>
            <Link to="/academics#kindergarten" onClick={() => setSearchOpen(false)}>Kindergarten</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav ref={navbarRef} className={`navbar ${scrolled ? 'scrolled' : ''} ${!isVisible ? 'hidden-nav' : ''}`}>
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-logo">
              {!logoError ? (
                <img src="/images/model-islamic-logo.png" alt={schoolDetails.name} className="logo-image" onError={() => setLogoError(true)} />
              ) : (
                <div className="logo-icon-wrapper">
                  <GraduationCap size={36} className="logo-icon" />
                </div>
              )}
              <div className="logo-text">
                <span className="logo-name">MODEL ISLAMIC</span>
                <span className="logo-location">KINDERGARTEN & PRIMARY SCHOOL</span>
                <span className="logo-location-small">ARUA · DAY CARE · MIXED</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="navbar-desktop" ref={dropdownRef}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.path} className="nav-item">
                    {item.dropdown ? (
                      <div className="dropdown-container" onMouseEnter={() => handleMouseEnter(item.name)} onMouseLeave={handleMouseLeave}>
                        <button className={`nav-link ${isActive(item.path) ? 'active' : ''}`} aria-expanded={activeDropdown === item.name}>
                          <Icon size={16} className="nav-icon" />
                          <span>{item.name}</span>
                          <ChevronDown size={14} className={`chevron ${activeDropdown === item.name ? 'rotated' : ''}`} />
                        </button>
                        {activeDropdown === item.name && (
                          <div className="dropdown-menu" onMouseEnter={() => handleMouseEnter(item.name)} onMouseLeave={handleMouseLeave}>
                            {item.dropdown.map((dropItem) => {
                              const DropIcon = dropItem.icon || ChevronRight;
                              return (
                                <Link key={dropItem.path} to={dropItem.path} className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                                  <DropIcon size={16} className="dropdown-item-icon" />
                                  <div className="dropdown-item-content">
                                    <span className="dropdown-item-name">{dropItem.name}</span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link to={item.path} className={`nav-link ${isActive(item.path, item.exact) ? 'active' : ''}`}>
                        <Icon size={16} className="nav-icon" />
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="navbar-actions">
              <Link to="/contact" className="location-button" title="View Location">
                <MapPin size={18} />
              </Link>
              <Link to="/admissions#apply" className="apply-button">
                <Sparkles size={18} />
                <span>Apply Now</span>
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-progress"></div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`} ref={mobileMenuRef}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            {!logoError ? (
              <img src="/images/model-islamic-logo.png" alt="Model Islamic School" className="mobile-logo-image" onError={() => setLogoError(true)} />
            ) : (
              <div className="mobile-logo-icon">
                <GraduationCap size={28} />
              </div>
            )}
            <div className="mobile-logo-text">
              <span className="mobile-school-name">MODEL ISLAMIC</span>
              <span className="mobile-location">ARUA</span>
            </div>
          </div>
          <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="mobile-menu-content">
          <div className="mobile-school-info">
            <div className="info-item">
              <MapPin size={16} />
              <span>{schoolDetails.location}</span>
            </div>
            <div className="info-item">
              <School size={16} />
              <span>{schoolDetails.type}</span>
            </div>
            <div className="info-item motto">
              <Quote size={16} />
              <span>{schoolDetails.motto}</span>
            </div>
          </div>

          <div className="mobile-islamic-greeting">
            <span className="mobile-arabic">السلام عليكم</span>
            <span className="mobile-english">Peace be upon you</span>
          </div>

          <div className="mobile-prayer-time">
            <Sunrise size={16} />
            <span>Next Prayer: {prayerTime}</span>
          </div>

          <div className="mobile-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.path} className="mobile-nav-item">
                  {item.dropdown ? (
                    <details className="mobile-dropdown">
                      <summary className="mobile-dropdown-toggle">
                        <Icon size={18} className="mobile-nav-icon" />
                        <span>{item.name}</span>
                        <ChevronDown size={16} className="dropdown-arrow" />
                      </summary>
                      <div className="mobile-dropdown-content">
                        {item.dropdown.map((dropItem) => {
                          const DropIcon = dropItem.icon || ChevronRight;
                          return (
                            <Link key={dropItem.path} to={dropItem.path} className="mobile-dropdown-link" onClick={() => setIsOpen(false)}>
                              <DropIcon size={16} className="mobile-dropdown-icon" />
                              <span>{dropItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </details>
                  ) : (
                    <Link to={item.path} className={`mobile-nav-link ${isActive(item.path, item.exact) ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
                      <Icon size={18} className="mobile-nav-icon" />
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mobile-contact">
            <div className="mobile-contact-title">Contact Us</div>
            <a href="tel:+256394817964" className="mobile-contact-item">
              <Phone size={16} />
              <span>{schoolDetails.phones[0]}</span>
            </a>
            <a href="tel:+256784415103" className="mobile-contact-item">
              <Phone size={16} />
              <span>{schoolDetails.phones[1]}</span>
            </a>
            <a href="mailto:info@modelislamic.education" className="mobile-contact-item">
              <Mail size={16} />
              <span>info@modelislamic.education</span>
            </a>
            <div className="mobile-contact-item">
              <MapPinIcon size={16} />
              <span>{schoolDetails.location}</span>
            </div>
          </div>

          <div className="mobile-core-values">
            <div className="core-values-title">Our Core Values</div>
            <div className="core-values-list">
              {schoolDetails.coreValues.map((value, index) => (
                <span key={index} className="core-value-tag">{value}</span>
              ))}
            </div>
          </div>

          <div className="mobile-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mobile-social-link">FB</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mobile-social-link">TW</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mobile-social-link">IG</a>
          </div>

          <div className="mobile-footer">
            <div className="mobile-accreditation">
              <Award size={14} />
              <span>Mixed Private Day School</span>
            </div>
            <div className="mobile-hijri">
              <Calendar size={14} />
              <span>1447 AH · 2026 CE</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;