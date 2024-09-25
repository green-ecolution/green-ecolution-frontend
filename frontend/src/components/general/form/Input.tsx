import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  type?: string;
  label: string;
  register: UseFormRegister<T>;
  error?: string,
}

const Input = <T extends FieldValues>({ name, label, type = 'text', placeholder = '', register, required = false, error }: InputProps<T>) => {
  return (
    <div>
      <label htmlFor={name} className="block font-semibold text-dark-800 mb-2.5">
        {label} {required ? <span className="text-red">*</span> : null}
      </label>
      <input
        type={type}
        id={name}
        required={required}
        placeholder={placeholder}
        {...register(name, { required })}
        className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark"
      />
      {error && <span className="text-red mt-2 font-semibold text-sm">{error}</span>}
    </div>
  );
}

export default Input;
