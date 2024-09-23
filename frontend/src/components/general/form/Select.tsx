import { ChevronDown } from 'lucide-react';
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  type?: string;
  options: Array<{ value: string; label: string }>;
  label: string;
  register: UseFormRegister<T>;
  error?: string,
}

const Select = <T extends FieldValues>({ name, required = false, label, placeholder = '', options, register, error }: SelectProps<T>) => {
  return (
    <div className="relative">
      <figure aria-hidden="true" className="absolute right-4 top-[3.25rem]">
        <ChevronDown className="w-4 h-4 text-dark-800" />
      </figure>
      <label htmlFor={name} className="block font-semibold text-dark-800 mb-2.5">
        {label} {required ? <span className="text-red">*</span> : null}
      </label>
      <select
        id={name}
        className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark"
        required={required}
        {...register(name, { required })}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red mt-2 font-semibold text-sm">{error}</span>}
    </div>
  );
};

export default Select;
