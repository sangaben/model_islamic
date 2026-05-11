import { useCampus } from '../context/CampusContext';

const CampusSwitcher = () => {
  const { currentCampus, setCurrentCampus, campuses } = useCampus();

  return (
    <select
      value={currentCampus?.id || ''}
      onChange={(e) => {
        const campus = campuses.find(c => c.id === parseInt(e.target.value));
        setCurrentCampus(campus);
      }}
      className="px-3 py-2 border rounded-md text-sm"
    >
      <option value="">Select Campus</option>
      {campuses.map(campus => (
        <option key={campus.id} value={campus.id}>
          {campus.name}
        </option>
      ))}
    </select>
  );
};

export default CampusSwitcher;
