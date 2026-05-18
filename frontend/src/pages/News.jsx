// src/components/News.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Eye, Clock, User, Tag, ArrowRight, RefreshCw, Newspaper } from 'lucide-react';
import '../styles//News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const API_BASE_URL = 'http://127.0.0.1:8000/api/website';

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/news/`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      let newsData = [];
      if (response.data.results) {
        newsData = response.data.results;
      } else if (Array.isArray(response.data)) {
        newsData = response.data;
      }
      
      setNews(newsData);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load news. Please check if Django server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsDetail = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/news/${id}/`);
      setSelectedNews(response.data);
      setModalOpen(true);
    } catch (err) {
      console.error('Error fetching news details:', err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  };

  const getCategoryClass = (category) => {
    const classes = {
      'announcement': 'category-announcement',
      'event': 'category-event',
      'campus_update': 'category-campus',
      'achievement': 'category-achievement',
      'notice': 'category-notice',
      'academic': 'category-academic',
      'sports': 'category-sports',
      'arts': 'category-arts',
    };
    return classes[category] || 'category-default';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'announcement': return '📢';
      case 'event': return '🎉';
      case 'campus_update': return '🏫';
      case 'achievement': return '🏆';
      case 'notice': return '📋';
      case 'academic': return '📚';
      case 'sports': return '⚽';
      case 'arts': return '🎨';
      default: return '📰';
    }
  };

  if (loading) {
    return (
      <div className="news-container">
        <div className="news-loading">
          <div className="loading-spinner"></div>
          <p>Loading latest news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <div className="news-error">
          <Newspaper size={48} />
          <h2>Unable to Load News</h2>
          <p>{error}</p>
          <button onClick={fetchNews}>
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-wrapper">
      {/* Hero Section */}
      <div className="news-hero">
        <div className="news-hero-overlay"></div>
        <div className="news-hero-content">
          <div className="hero-icon">
            <Newspaper size={40} />
          </div>
          <h1>News & Updates</h1>
          <p>Stay informed about the latest happenings at Model Islamic School</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">{news.length}</span>
              <span className="stat-label">Total Articles</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">{new Date().getFullYear()}</span>
              <span className="stat-label">Current Year</span>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 64L60 69.3C120 75 240 85 360 80C480 75 600 53 720 48C840 43 960 53 1080 58.7C1200 64 1320 64 1380 64L1440 64L1440 120L1380 120C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120L0 120Z" fill="#f8fafc"/>
          </svg>
        </div>
      </div>

      <div className="news-main">
        {news.length === 0 ? (
          <div className="empty-news">
            <Newspaper size={64} />
            <h3>No News Articles Found</h3>
            <p>Please add some news articles in the Django admin panel.</p>
            <p className="admin-link">Go to: /admin/website/news/add/</p>
          </div>
        ) : (
          <div className="news-grid">
            {news.map((item, index) => (
              <article 
                key={item.id} 
                className={`news-card ${getCategoryClass(item.category)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="news-card-inner">
                  <div className="news-category">
                    <span className="category-icon">{getCategoryIcon(item.category)}</span>
                    <span className={`category-name ${getCategoryClass(item.category)}`}>
                      {item.category_display || item.category}
                    </span>
                  </div>
                  
                  <h2 className="news-title">{item.title}</h2>
                  
                  <p className="news-excerpt">{item.excerpt}</p>
                  
                  <div className="news-meta">
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{formatDate(item.published_date || item.date)}</span>
                    </div>
                    {item.views !== undefined && (
                      <div className="meta-item">
                        <Eye size={14} />
                        <span>{item.views} views</span>
                      </div>
                    )}
                    {item.author && (
                      <div className="meta-item">
                        <User size={14} />
                        <span>{item.author}</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className="read-more-btn"
                    onClick={() => fetchNewsDetail(item.id)}
                  >
                    Read Full Article
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal for full article */}
      {modalOpen && selectedNews && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-header ${getCategoryClass(selectedNews.category)}`}>
              <div>
                <span className="modal-category-badge">
                  {getCategoryIcon(selectedNews.category)} {selectedNews.category_display || selectedNews.category}
                </span>
                <h2>{selectedNews.title}</h2>
              </div>
              <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            
            <div className="modal-body">
              {selectedNews.featured_image && (
                <div className="modal-image">
                  <img src={selectedNews.featured_image} alt={selectedNews.title} />
                </div>
              )}
              
              <div className="modal-meta">
                <div className="meta-item">
                  <Calendar size={14} />
                  <span>{formatDate(selectedNews.published_date || selectedNews.date)}</span>
                </div>
                {selectedNews.author && (
                  <div className="meta-item">
                    <User size={14} />
                    <span>By {selectedNews.author}</span>
                  </div>
                )}
                {selectedNews.views !== undefined && (
                  <div className="meta-item">
                    <Eye size={14} />
                    <span>{selectedNews.views} views</span>
                  </div>
                )}
                <div className="meta-item">
                  <Clock size={14} />
                  <span>{Math.ceil((selectedNews.content || selectedNews.excerpt).length / 1000)} min read</span>
                </div>
              </div>
              
              <div className="modal-content">
                <p>{selectedNews.content || selectedNews.excerpt}</p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;