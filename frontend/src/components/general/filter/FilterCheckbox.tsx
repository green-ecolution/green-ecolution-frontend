import React, { useState } from 'react';

interface FilterCheckboxProps {
  name: string;
  label: string;
  children?: React.ReactNode;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ name, label, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label 
      className={`cursor-pointer mr-2 mb-2 inline-flex items-center gap-x-2 border w-max pr-5 pl-3 py-2 rounded-full border-green-light ${isChecked ? 'bg-green-light-200' : ''}`}
    >
      <input 
        type="checkbox" 
        name={name} 
        checked={isChecked}
        onChange={handleCheckboxChange} 
        className="opacity-0 w-0 h-0" 
      />
      {children && <div>{children}</div>}
      <span>{label}</span>
    </label>
  );
}

export default FilterCheckbox;
