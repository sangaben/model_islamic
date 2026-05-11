import React from 'react';

const StatsGrid = ({ stats, columns = 4 }) => {
  const gridClass = {
    2: 'grid grid-cols-2 gap-6',
    3: 'grid grid-cols-1 md:grid-cols-3 gap-6',
    4: 'grid grid-cols-2 md:grid-cols-4 gap-6',
  }[columns];

  return (
    <div className={gridClass}>
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          {stat.icon && (
            <div className="icon-circle w-12 h-12 mx-auto mb-3">
              <stat.icon className="w-5 h-5" />
            </div>
          )}
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;