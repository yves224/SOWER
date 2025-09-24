import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    // FIX: Replaced bg-surface with bg-white and text-text-primary with text-gray-800
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {title && <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
