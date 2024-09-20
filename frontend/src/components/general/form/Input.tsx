import React from 'react';

interface InputProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ name, required = false, label, type = 'text', placeholder = '', value = '', onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="block font-semibold text-dark-800 mb-2.5">
        {label} {required ? <span className="text-red">*</span> : null}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark"
      />
    </div>
  );
}

export default Input;
