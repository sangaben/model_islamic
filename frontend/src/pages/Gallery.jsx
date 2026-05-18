// src/components/Gallery.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ChevronLeft, ChevronRight, Grid, List, Camera, Image as ImageIcon, Calendar, MapPin, ZoomIn, Heart, Share2 } from 'lucide-react';
import '../styles/Gallery.css';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  const API_BASE_URL = 'http://127.0.0.1:8000/api/website';

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/gallery/`);
      
      let images = [];
      if (response.data.results) {
        images = response.data.results;
      } else if (Array.isArray(response.data)) {
        images = response.data;
      }
      
      setGalleryImages(images);
      const uniqueCategories = [...new Set(images.map(img => img.category).filter(Boolean))];
      setCategories(uniqueCategories);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load gallery. Please make sure Django server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const getCategoryDisplay = (category) => {
    const display = {
      'academics': 'Academics',
      'sports': 'Sports',
      'arts': 'Arts & Culture',
      'events': 'Events',
    };
    return display[category] || category || 'General';
  };

  const filteredImages = currentCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === currentCategory);

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="gallery-loading">
          <div className="loading-spinner"></div>
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <div className="gallery-error">
          <Camera size={48} />
          <h2>Unable to Load Gallery</h2>
          <p>{error}</p>
          <button onClick={fetchGalleryImages}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-wrapper">
      {/* Hero Section */}
      <div className="gallery-hero">
        <div className="gallery-hero-overlay"></div>
        <div className="gallery-hero-content">
          <div className="hero-icon">
            <Camera size={40} />
          </div>
          <h1>Our Gallery</h1>
          <p>Capturing moments of learning, growth, and joy at Model Islamic School</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">{galleryImages.length}</span>
              <span className="stat-label">Memories Captured</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">{categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 64L60 69.3C120 75 240 85 360 80C480 75 600 53 720 48C840 43 960 53 1080 58.7C1200 64 1320 64 1380 64L1440 64L1440 120L1380 120C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120L0 120Z" fill="#f8fafc"/>
          </svg>
        </div>
      </div>

      <div className="gallery-main">
        {/* Controls */}
        <div className="gallery-controls">
          <div className="category-filters">
            <button 
              className={`filter-btn ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={() => setCurrentCategory('all')}
            >
              All Photos
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${currentCategory === cat ? 'active' : ''} ${cat}`}
                onClick={() => setCurrentCategory(cat)}
              >
                {getCategoryDisplay(cat)}
              </button>
            ))}
          </div>
          
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-number">{filteredImages.length}</span>
            <span className="stat-text">Showing Photos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{categories.length}</span>
            <span className="stat-text">Categories</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">500+</span>
            <span className="stat-text">Happy Students</span>
          </div>
        </div>

        {/* Gallery Display */}
        {filteredImages.length === 0 ? (
          <div className="empty-gallery">
            <ImageIcon size={64} />
            <h3>No Images Found</h3>
            <p>No images have been added to the gallery yet.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="gallery-card"
                onClick={() => {
                  setSelectedImage(image);
                  setModalOpen(true);
                }}
              >
                <div className="card-image">
                  <img 
                    src={image.image || image.thumbnail} 
                    alt={image.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  <div className="card-overlay">
                    <div className="overlay-content">
                      <h3>{image.title}</h3>
                      <span className={`category-badge ${image.category}`}>
                        {getCategoryDisplay(image.category)}
                      </span>
                    </div>
                  </div>
                  <div className="zoom-icon">
                    <ZoomIn size={16} />
                  </div>
                </div>
                <div className="card-info">
                  <h4>{image.title}</h4>
                  <span className={`category-tag ${image.category}`}>
                    {getCategoryDisplay(image.category)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery-list">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="list-item"
                onClick={() => {
                  setSelectedImage(image);
                  setModalOpen(true);
                }}
              >
                <div className="list-item-image">
                  <img 
                    src={image.image || image.thumbnail} 
                    alt={image.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                    }}
                  />
                </div>
                <div className="list-item-content">
                  <h3>{image.title}</h3>
                  <span className={`category-tag ${image.category}`}>
                    {getCategoryDisplay(image.category)}
                  </span>
                  {image.campus_name && (
                    <p className="campus-info">
                      <MapPin size={14} />
                      {image.campus_name}
                    </p>
                  )}
                  <div className="list-actions">
                    <button className="view-btn">View Details →</button>
                    <button className="like-btn"><Heart size={16} /></button>
                    <button className="share-btn"><Share2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedImage && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-header ${selectedImage.category}`}>
              <div>
                <h2>{selectedImage.title}</h2>
                <span className="modal-category">{getCategoryDisplay(selectedImage.category)}</span>
              </div>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <img 
                src={selectedImage.image || selectedImage.thumbnail} 
                alt={selectedImage.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
              {filteredImages.length > 1 && (
                <>
                  <button className="modal-nav prev" onClick={prevImage}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className="modal-nav next" onClick={nextImage}>
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              <div className="modal-counter">
                {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
              </div>
            </div>
            <div className="modal-footer">
              {selectedImage.campus_name && (
                <p><MapPin size={14} /> {selectedImage.campus_name}</p>
              )}
              {selectedImage.photographer && (
                <p>📸 {selectedImage.photographer}</p>
              )}
              {selectedImage.uploaded_at && (
                <p className="upload-date">
                  <Calendar size={12} />
                  Added on {new Date(selectedImage.uploaded_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;