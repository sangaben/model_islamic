const News = () => {
  const news = [
    {
      id: 1,
      title: "New Computer Science Building Opening",
      date: "February 14, 2026",
      category: "Campus Update",
      excerpt: "State-of-the-art facility with modern labs and research centers opening next month."
    },
    {
      id: 2,
      title: "Annual Tech Symposium 2026",
      date: "February 10, 2026",
      category: "Event",
      excerpt: "Join us for the biggest tech event of the year with industry leaders and innovators."
    },
    {
      id: 3,
      title: "Scholarship Applications Now Open",
      date: "February 5, 2026",
      category: "Announcement",
      excerpt: "Merit-based scholarships available for outstanding students. Apply by March 15."
    },
    {
      id: 4,
      title: "Research Grant Awarded",
      date: "February 1, 2026",
      category: "Achievement",
      excerpt: "Our faculty receives prestigious research grant for AI and Machine Learning studies."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">News & Updates</h1>
      
      <div className="space-y-6">
        {news.map(item => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600 font-semibold">{item.category}</span>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.excerpt}</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
