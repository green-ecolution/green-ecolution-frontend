import { Path, UseFormRegister, FieldValues } from "react-hook-form";

interface TextareaProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  label: string;
  register: UseFormRegister<T>;
}

const Textarea = <T extends FieldValues>({ name, required = false, label, placeholder = '', register }: TextareaProps<T>) => {
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
      </div>
    );
}

export default Textarea;
