import { Check } from 'lucide-react'
import { createContext, useEffect, useRef, useState } from 'react'

interface ToastContext {
  showToast: (message: string) => void
}

export const ToastContext = createContext<ToastContext | undefined>(undefined)

interface ToastProviderProps extends React.PropsWithChildren {}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [label, setLabel] = useState('')
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const showToast = (message: string) => {
    setLabel(message)
    setIsVisible(true)
    timerRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div
        className={`fixed inset-x-4 mx-auto bottom-10 bg-dark text-white rounded-[1.875rem] grid grid-cols-[1.5fr,auto] items-center gap-x-4 pr-4 pl-2.5 py-2.5 w-fit transition-all ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } duration-300 ease-in-out`}
      >
        <figure
          aria-hidden="true"
          className="relative bg-green-light w-6 h-6 rounded-full flex items-center justify-center before:w-8 before:h-8 before:absolute before:bg-green-light/50 before:rounded-full before:-z-10"
        >
          <Check className="w-4 h-4" />
        </figure>
        <p className="text-sm font-semibold">{label}</p>
      </div>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
