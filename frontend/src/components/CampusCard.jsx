import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';

const CampusCard = ({ id, name, location, image, description }) => {
  return (
    <div className="campus-card">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="campus-image"
        />
        <div className="campus-overlay"></div>
        <div className="campus-info">
          <Link 
            to={`/campuses/${id}`}
            className="btn-primary text-sm py-2 px-4 w-full"
          >
            View Campus
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 flex items-center mb-3">
          <MapPin className="w-4 h-4 mr-1 text-blue-600" />
          {location}
        </p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CampusCard;