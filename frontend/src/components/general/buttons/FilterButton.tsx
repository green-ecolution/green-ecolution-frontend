import React, { useState } from 'react';

interface FilterButtonProps {
  ariaLabel: string;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ ariaLabel, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    onClick();
  };

  return (
    <button 
      aria-label={ariaLabel}
      aria-selected={isActive}
      className={`border border-green-light px-5 py-2 font-medium rounded-full flex items-center gap-x-2 transition-colors ease-in-out duration-300 ${isActive ? 'bg-green-light-200' : ''} hover:bg-green-light-200`}
      onClick={handleClick}
    >
      Filter
      <span className="block bg-green-dark/20 w-6 h-6 rounded-full">0</span>
    </button>
  );
};

export default FilterButton;
