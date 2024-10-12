import { ToastContext } from '@/context/ToastContext'
import { useContext } from 'react'

const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context.showToast
}

export default useToast