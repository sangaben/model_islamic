
import React, { createContext, useState, useContext } from 'react';

const CampusContext = createContext();

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};

export const CampusProvider = ({ children }) => {
  const [currentCampus, setCurrentCampus] = useState(null);
  const [campuses, setCampuses] = useState([
    { id: 1, name: 'Main Campus', location: 'City Center' },
    { id: 2, name: 'North Campus', location: 'North District' },
    { id: 3, name: 'South Campus', location: 'South District' },
  ]);

  return (
    <CampusContext.Provider value={{
      currentCampus,
      setCurrentCampus,
      campuses
    }}>
      {children}
    </CampusContext.Provider>
  );
};