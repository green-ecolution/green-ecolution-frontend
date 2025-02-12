import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  error?: string;
}
//input feld muss key haben
//input muss id haben

const Input = forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div>
        {props.label && (
          <label
            htmlFor={props.name}
            className="block font-semibold text-dark-800 mb-2.5"
          >
            {props.label}{" "}
            {props.required ? <span className="text-red">*</span> : null}
          </label>
        )}

        <input
          ref={ref}
          id={props.name}
          className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark"
          {...props}
        />
        {props.error && (
          <span className="block text-red mt-2 font-semibold text-sm">
            {props.error}
          </span>
        )}
      </div>
    );
  },
);

export default Input;
