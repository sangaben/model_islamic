import { Link } from 'react-router-dom';
import { useCampus } from '../context/CampusContext';

const Campuses = () => {
  const { campuses } = useCampus();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Campuses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campuses.map((campus) => (
          <Link 
            key={campus.id} 
            to={`/campuses/${campus.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img 
              src={`https://via.placeholder.com/400x300?text=${campus.name}`} 
              alt={campus.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{campus.name}</h2>
              <p className="text-gray-600 mb-4">{campus.location}</p>
              <div className="flex items-center text-blue-600">
                <span>Learn more</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Campuses;
