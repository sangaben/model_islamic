// src/components/News.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({});

  // API Base URL - Try different options
  const API_BASE_URL = 'http://127.0.0.1:8000/api/website';
  // const API_BASE_URL = 'http://localhost:8000/api/website';
  // const API_BASE_URL = 'http://192.168.1.100:8000/api/website'; // Use your actual IP

  // Fetch news from API
  const fetchNews = async () => {
    setLoading(true);
    setDebug({ ...debug, fetching: true, url: `${API_BASE_URL}/news/` });
    
    try {
      console.log('Fetching news from:', `${API_BASE_URL}/news/`);
      
      const response = await axios.get(`${API_BASE_URL}/news/`, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Response received:', response.data);
      setDebug({ 
        ...debug, 
        success: true, 
        data: response.data,
        status: response.status 
      });
      
      // Handle different response structures
      let newsData = [];
      if (response.data.results) {
        newsData = response.data.results;
      } else if (Array.isArray(response.data)) {
        newsData = response.data;
      } else {
        newsData = [];
      }
      
      setNews(newsData);
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
      
      setError(`Failed to load news: ${err.message}. Please check if Django server is running.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <p className="text-blue-600">Loading news from: {API_BASE_URL}/news/</p>
        </div>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between mb-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Debug info (remove in production)
  if (debug.error) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
          <h2 className="text-red-800 font-bold mb-2">Error Loading News</h2>
          <p className="text-red-700 mb-2">{error}</p>
          <div className="bg-white rounded p-4 mt-4">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(debug, null, 2)}
            </pre>
          </div>
          <button 
            onClick={fetchNews}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Debug banner - remove in production */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm">
        <p className="text-green-700">✅ API Connected: {API_BASE_URL}/news/</p>
        <p className="text-green-700">📊 Found {news.length} news articles</p>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-8">News & Updates</h1>
      
      {news.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-12 text-center">
          <p className="text-yellow-800 text-lg mb-2">No news articles found</p>
          <p className="text-yellow-600">Please add some news articles in Django admin panel.</p>
          <p className="text-yellow-600 text-sm mt-2">
            Go to: http://127.0.0.1:8000/admin/website/news/add/
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 font-semibold">
                  {item.category_display || item.category}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(item.published_date || item.date)}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.excerpt}</p>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => window.open(`/news/${item.id}`, '_blank')}
              >
                Read More →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;