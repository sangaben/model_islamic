const Gallery = () => {
  const images = [
    { id: 1, url: "https://via.placeholder.com/400x300", title: "Campus View", category: "Campus" },
    { id: 2, url: "https://via.placeholder.com/400x300", title: "Library", category: "Facilities" },
    { id: 3, url: "https://via.placeholder.com/400x300", title: "Sports Day", category: "Events" },
    { id: 4, url: "https://via.placeholder.com/400x300", title: "Graduation", category: "Events" },
    { id: 5, url: "https://via.placeholder.com/400x300", title: "Lab Session", category: "Academics" },
    { id: 6, url: "https://via.placeholder.com/400x300", title: "Student Life", category: "Campus" }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map(image => (
          <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white font-semibold">{image.title}</h3>
              <p className="text-gray-200 text-sm">{image.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
