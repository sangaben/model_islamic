// src/components/Gallery.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  // API Base URL - Same as news component
  const API_BASE_URL = 'http://127.0.0.1:8000/api/website';

  // Fetch gallery images
  const fetchGalleryImages = async () => {
    setLoading(true);
    setDebug({ ...debug, fetching: true, url: `${API_BASE_URL}/gallery/` });
    
    try {
      console.log('Fetching gallery from:', `${API_BASE_URL}/gallery/`);
      
      const response = await axios.get(`${API_BASE_URL}/gallery/`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Gallery response:', response.data);
      setDebug({ 
        ...debug, 
        success: true, 
        data: response.data,
        status: response.status 
      });
      
      // Handle different response structures
      let images = [];
      if (response.data.results) {
        images = response.data.results;
      } else if (Array.isArray(response.data)) {
        images = response.data;
      } else {
        images = [];
      }
      
      setGalleryImages(images);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(images.map(img => img.category))];
      setCategories(uniqueCategories);
      
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
      
      setError(`Failed to load gallery: ${err.message}. Please check if Django server is running.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Get category display name
  const getCategoryDisplay = (category) => {
    const display = {
      'academics': 'Academics',
      'sports': 'Sports',
      'arts': 'Arts & Culture',
      'events': 'Events',
    };
    return display[category] || category || 'General';
  };

  // Filter images by category
  const filteredImages = currentCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === currentCategory);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <p className="text-blue-600">Loading gallery from: {API_BASE_URL}/gallery/</p>
        </div>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Debug error state
  if (error || debug.error) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
          <h2 className="text-red-800 font-bold mb-2">Error Loading Gallery</h2>
          <p className="text-red-700 mb-2">{error}</p>
          
          {/* Debug Information */}
          <div className="bg-white rounded p-4 mt-4">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(debug, null, 2)}
            </pre>
          </div>
          
          <button 
            onClick={fetchGalleryImages}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>

        {/* Show mock data for testing */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Test with Mock Data:</h3>
          <button 
            onClick={() => {
              setGalleryImages([
                {
                  id: 1,
                  title: "Test Image 1",
                  category: "events",
                  image: "https://via.placeholder.com/400x300",
                  thumbnail: "https://via.placeholder.com/400x300",
                  campus_name: "Main Campus"
                },
                {
                  id: 2,
                  title: "Test Image 2",
                  category: "academics",
                  image: "https://via.placeholder.com/400x300",
                  thumbnail: "https://via.placeholder.com/400x300",
                  campus_name: "Main Campus"
                }
              ]);
              setError(null);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Load Mock Data
          </button>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Success banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm">
        <p className="text-green-700">✅ Gallery API Connected: {API_BASE_URL}/gallery/</p>
        <p className="text-green-700">📸 Found {galleryImages.length} images</p>
        <p className="text-green-700">🏷️ Categories: {categories.join(', ') || 'None'}</p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Our Gallery</h1>
        
        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCurrentCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Photos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCurrentCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                currentCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getCategoryDisplay(cat)}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Display */}
      {filteredImages.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-12 text-center">
          <p className="text-yellow-800 text-lg mb-2">No images found</p>
          <p className="text-yellow-600">
            {galleryImages.length === 0 
              ? 'Please add images in Django admin panel: /admin/website/galleryimage/add/'
              : 'No images in this category'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
              onClick={() => {
                setSelectedImage(image);
                setModalOpen(true);
              }}
            >
              <img
                src={image.image || image.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
                <h3 className="text-white font-semibold">{image.title}</h3>
                <span className="text-xs text-gray-200">{getCategoryDisplay(image.category)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer flex"
              onClick={() => {
                setSelectedImage(image);
                setModalOpen(true);
              }}
            >
              <img
                src={image.image || image.thumbnail || 'https://via.placeholder.com/150x150?text=No+Image'}
                alt={image.title}
                className="w-32 h-32 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                }}
              />
              <div className="p-4 flex-1">
                <h3 className="font-semibold text-gray-900">{image.title}</h3>
                <span className="text-xs text-gray-600">{getCategoryDisplay(image.category)}</span>
                {image.campus_name && (
                  <p className="text-sm text-gray-500 mt-1">{image.campus_name}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal (same as before) */}
      {modalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-90" onClick={() => setModalOpen(false)}></div>
            <div className="relative bg-white rounded-lg max-w-4xl w-full">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <img
                src={selectedImage.image || selectedImage.thumbnail}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
              <div className="p-4 bg-gray-50">
                <p className="text-gray-700">{selectedImage.title}</p>
                {selectedImage.campus_name && (
                  <p className="text-sm text-gray-600 mt-1">📍 {selectedImage.campus_name}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;