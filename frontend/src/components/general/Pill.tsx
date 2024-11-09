import React from 'react';

interface PillProps {
  label: string;
  theme?: 'red' | 'dark-400' | 'green-light' | 'active',
}

const Pill: React.FC<PillProps> = ({ label, theme = 'active' }) => {
  const themeClasses = {
    'red': 'border-red text-red bg-white',
    'dark-400': 'border-dark-600 text-dark-600 bg-white',
    'green-light': 'border-green-dark text-green-dark bg-white',
    'active': 'text-green-dark border-green-light bg-green-light-200',
  }
  return (
    <span className={`text-sm font-medium w-fit border rounded-full px-4 py-1 ${themeClasses[theme]}`}>
      {label}
    </span>
  )
};

export default Pill;
