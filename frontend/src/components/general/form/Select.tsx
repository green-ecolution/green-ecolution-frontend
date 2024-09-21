import { ChevronDown } from 'lucide-react';
import React from 'react';

interface SelectProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  label: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ name, required = false, label, placeholder = '', options, value = '', onChange }) => {
  return (
    <div className="relative">
      <figure aria-hidden="true" className="absolute right-4 top-[3.25rem]">
        <ChevronDown className="w-4 h-4 text-dark-800" />
      </figure>
      <label htmlFor={name} className="block font-semibold text-dark-800 mb-2.5">
        {label} {required ? <span className="text-red">*</span> : null}
      </label>
      <select
        name={name}
        id={name}
        className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark"
        value={value}
        onChange={onChange}
        required={required}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
