import React from 'react';

interface PillProps {
  label: string;
  theme?: 'red' | 'grey' | 'green-dark' | 'green-light',
}

const Pill: React.FC<PillProps> = ({ label, theme = 'grey' }) => {
  const themeClasses = {
    'red': 'border-red text-red',
    'grey': 'border-dark-600 text-dark-600',
    'green-dark': 'border-green-dark text-green-dark',
    'green-light': 'text-green-dark border-green-light bg-green-light-200',
  }
  return (
    <span className={`text-sm font-medium w-fit border rounded-full px-4 py-1 ${themeClasses[theme]}`}>
      {label}
    </span>
  )
};

export default Pill;
