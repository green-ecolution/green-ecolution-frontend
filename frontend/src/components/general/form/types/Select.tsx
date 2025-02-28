import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  placeholder?: string
  options: { value: string; label: string }[]
  error?: string
  description?: string
}

const Select = forwardRef(
  (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    return (
      <div className="relative">
        <figure aria-hidden="true" className={`absolute right-4 ${props.multiple ? 'top-[4.5rem]' : 'top-[3.25rem]'}`}>
          <ChevronDown className="w-4 h-4 text-dark-800" />
        </figure>
        <label
          htmlFor={props.name}
          className="block font-semibold text-dark-800 mb-2.5"
        >
          {props.label}{' '}
          {props.required ? <span className="text-red">*</span> : null}
        </label>
        {props.description && <p className="-mt-2 text-sm text-dark-600 mb-2.5">{props.description}</p>}
        <select
          ref={ref}
          id={props.name}
          multiple={props.multiple}
          className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark"
          {...props}
        >
          {props.placeholder && (
            <option value="" disabled>
              {props.placeholder}
            </option>
          )}
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {props.error && (
          <span className="block text-red mt-2 font-semibold text-sm">
            {props.error}
          </span>
        )}
      </div>
    )
  }
)

export default Select
