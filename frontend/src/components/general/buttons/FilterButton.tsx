import React from 'react';

interface FilterButton {
  ariaLabel: string;
}

const FilterButton: React.FC<FilterButton> = ({ ariaLabel }) => {

    const isActive = false;
    
    return (
      <button 
        aria-label={ariaLabel}
        aria-selected={isActive}
        className="border border-green-light px-5 py-2 font-medium rounded-full flex items-center gap-x-2 transition-colors ease-in-out duration-300 hover:bg-green-light-200"
      >
        Filter
        <span className="block bg-green-dark/20 w-6 h-6 rounded-full">0</span>
      </button>
    );
}

export default FilterButton;
