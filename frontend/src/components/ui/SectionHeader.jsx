import React from 'react';

const SectionHeader = ({ tag, title, subtitle, className = '' }) => {
  return (
    <div className={`section-header ${className}`}>
      {tag && <span className="section-tag">{tag}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;