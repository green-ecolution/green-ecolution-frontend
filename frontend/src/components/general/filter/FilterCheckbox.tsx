import React, { useState, useEffect } from 'react';

interface FilterCheckboxProps {
  name: string;
  label: string;
  children?: React.ReactNode;
  onClick: (name: string) => void;
  isChecked?: boolean;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ name, label, children, onClick, isChecked = false }) => {
  const [active, setActive] = useState(isChecked);

  const handleCheckboxChange = () => {
    const newCheckedState = !active;
    setActive(newCheckedState);
    onClick(name);
  };

  useEffect(() => {
    setActive(isChecked);
  }, [isChecked]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter') {
      handleCheckboxChange();
      event.preventDefault();
    }
  };

  return (
    <label 
      onKeyDown={handleKeyDown}
      className={`cursor-pointer mr-2 mb-2 inline-flex items-center gap-x-2 border w-max pr-5 pl-3 py-2 rounded-full border-green-light transition-all ease-in-out duration-300 hover:bg-green-light-200 hover:border-transparent focus-within:bg-green-light-200 focus-within:border-transparent
        ${active ? 'bg-green-light-200' : ''}`}
    >
      <input 
        type="checkbox" 
        name={name} 
        checked={active}
        onChange={handleCheckboxChange} 
        className="opacity-0 w-0 h-0" 
      />
      {children && <div>{children}</div>}
      <span>{label}</span>
    </label>
  );
}

export default FilterCheckbox;
