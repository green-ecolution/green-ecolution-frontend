import { useState } from "react";

interface OptionProps {
  name: string;
  label: string;
  children?: React.ReactNode;
  filterHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Option: React.FC<OptionProps> = ({ name, label, children, filterHandler }) => {
  const [active, setActive] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(!active);
    filterHandler(event);
  };

  return (
    <label 
      className={`cursor-pointer mr-2 mb-2 inline-flex items-center gap-x-2 border w-max pr-5 pl-3 py-2 rounded-full border-green-light transition-all ease-in-out duration-300 hover:border-green-dark focus-within:border-green-dark
        ${active ? 'bg-green-light-200' : ''}`}
    >
      <input 
        type="checkbox" 
        name={name} 
        checked={active}
        value={label}
        onChange={handleCheckboxChange} 
        className="opacity-0 w-0 h-0" 
      />
      {children && <div>{children}</div>}
      <span>{label}</span>
    </label>
  );
}

export default Option;
