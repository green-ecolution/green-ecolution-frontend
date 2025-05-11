interface FormErrorProps {
  show: boolean
  error?: string
}

const FormError = ({ error, show }: FormErrorProps) => {
  return (
    <div className={`text-red font-semibold text-sm mt-10 ${show ? '' : 'hidden'}`}>
      <p className="mb-2">
        Es ist leider ein Problem aufgetreten. Bitte probiere es erneut oder wenden dich an
        einen Systemadministrierenden.
      </p>
      {error && <p>Fehlermeldung: {error}</p>}
    </div>
  )
}

export default FormError
