interface FormErrorProps {
  show: boolean;
  error: string;
}

const FormError = ({ error, show }: FormErrorProps) => {
  return (
      <p
        className={`text-red font-medium mt-10 ${show ? "" : "hidden"}`}
      >
        {error}
      </p>
  )
}

export default FormError;
