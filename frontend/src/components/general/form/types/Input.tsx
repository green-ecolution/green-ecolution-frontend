import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label: string;
  hideLabel?: boolean;
  error?: string;
  small?: boolean,
}

const Input = forwardRef(
  (props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div>
        {props.label && (
          <label
            htmlFor={props.name}
            className={`block font-semibold text-dark-800 mb-2.5 ${props.hideLabel ? "sr-only" : ""}`}
          >
            {props.label}{" "}
            {props.required ? <span className="text-red">*</span> : null}
          </label>
        )}

        <input
          ref={ref}
          id={props.name}
          className={`w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark ${props.small ? 'max-w-32' : ''}`}
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
