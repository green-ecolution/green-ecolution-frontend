import { Path, UseFormRegister, FieldValues } from "react-hook-form";

interface TextareaProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  label: string;
  register: UseFormRegister<T>;
  error?: string,
}

const Textarea = <T extends FieldValues>({ name, required = false, label, placeholder = '', register, error }: TextareaProps<T>) => {
    return (
      <div>
        <label htmlFor={name} className="block font-semibold text-dark-800 mb-2.5">
          {label} {required ? <span className="text-red">*</span> : null}
        </label>
        <textarea 
          placeholder={placeholder} 
          rows={4} cols={40}
          required={required}
          {...register(name, { required })}
          className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark" />
          {error && <span className="text-red mt-2 font-semibold text-sm">{error}</span>}
      </div>
    );
}

export default Textarea;
