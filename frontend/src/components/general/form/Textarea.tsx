import React from 'react';

interface TextareaProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ name, required = false, label, placeholder = '', value = '', onChange }) => {
    return (
      <div>
        <label htmlFor={name} className="block font-semibold text-dark-800 mb-2.5">
          {label} {required ? <span className="text-red">*</span> : null}
        </label>
        <textarea 
          name={name} 
          placeholder={placeholder} 
          rows={4} cols={40}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark" />
      </div>
    );
}

export default Textarea;
