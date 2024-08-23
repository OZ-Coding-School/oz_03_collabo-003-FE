import React from 'react';

const LoadingSkeleton: React.FC<{ className: string }> = ({ className }) => {
  return <div className={`animate-pulse rounded-sm bg-gray-db ${className}`}></div>;
};

export default LoadingSkeleton;
