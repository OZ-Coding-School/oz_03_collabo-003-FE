import React from 'react';

interface TextBoxGrayProps {
  children: React.ReactNode;
  className?: string;
}
const TextBoxGray: React.FC<TextBoxGrayProps> = ({ children, className = '' }) => {
  return <div className={`container mb-10 bg-white-f9 p-4 shadow-custom-down ${className}`}>{children}</div>;
};

export default TextBoxGray;
