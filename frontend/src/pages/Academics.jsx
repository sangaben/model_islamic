const Academics = () => {
  const programs = [
    {
      level: "Undergraduate Programs",
      courses: ["B.Sc Computer Science", "B.A English Literature", "B.Com Commerce", "BBA Business Administration"]
    },
    {
      level: "Postgraduate Programs",
      courses: ["M.Sc Computer Science", "M.A English Literature", "M.Com Commerce", "MBA Business Administration"]
    },
    {
      level: "Doctoral Programs",
      courses: ["Ph.D Computer Science", "Ph.D English", "Ph.D Commerce", "Ph.D Management"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Academics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">{program.level}</h2>
            <ul className="space-y-2">
              {program.courses.map((course, idx) => (
                <li key={idx} className="text-gray-600 hover:text-blue-500 cursor-pointer">
                  • {course}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Academic Calendar 2026</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Spring Semester</h3>
            <p className="text-gray-600">January - May 2026</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Fall Semester</h3>
            <p className="text-gray-600">August - December 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;
