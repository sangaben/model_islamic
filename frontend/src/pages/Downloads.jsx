const Downloads = () => {
  const downloads = [
    { id: 1, name: "Prospectus 2026", type: "PDF", size: "2.5 MB", category: "Admissions" },
    { id: 2, name: "Application Form", type: "PDF", size: "1.2 MB", category: "Forms" },
    { id: 3, name: "Academic Calendar", type: "PDF", size: "0.8 MB", category: "Academics" },
    { id: 4, name: "Student Handbook", type: "PDF", size: "3.1 MB", category: "Student Life" },
    { id: 5, name: "Fee Structure", type: "Excel", size: "0.5 MB", category: "Admissions" },
    { id: 6, name: "Course Catalog", type: "PDF", size: "4.2 MB", category: "Academics" }
  ];

  const categories = [...new Set(downloads.map(item => item.category))];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Downloads</h1>
      
      {categories.map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category}</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {downloads
                  .filter(item => item.category === category)
                  .map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <button className="hover:text-blue-800">Download</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Downloads;
