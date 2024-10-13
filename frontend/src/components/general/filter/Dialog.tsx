import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import FilterButton from '../buttons/FilterButton'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import { X } from 'lucide-react'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useNavigate } from '@tanstack/react-router'
import useFilter from '@/hooks/useFilter'
import { Filters } from '@/context/FilterContext'

interface DialogProps {
  headline: string
  fullUrlPath: string
  children?: React.ReactNode
  isOnMap?: boolean
  onApplyFilters: () => void
  onResetFilters: () => void
}

const Dialog = forwardRef(
  (
    {
      headline,
      fullUrlPath,
      onApplyFilters,
      onResetFilters,
      children,
      isOnMap = false,
    }: DialogProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [oldValues, setOldValues] = useState<Filters>({
      statusTags: [],
      regionTags: [],
      hasCluster: undefined,
      plantingYears: [],
    })
    const [count, setCount] = useState(0);
    const navigate = useNavigate({ from: fullUrlPath })
    useImperativeHandle(ref, () => dialogRef.current)

    const dialogRef = useOutsideClick(() => {
      if (!isOpen) return
      handleClose()
    })

    const { filters, resetFilters, applyOldStateToTags } = useFilter()

    const handleSubmit = () => {
      onApplyFilters()
      setIsOpen(false)
      setIsOpen(false)

      navigate({
        search: () => ({
          status:
            filters.statusTags.length > 0 ? filters.statusTags : undefined,
          region:
            filters.regionTags.length > 0 ? filters.regionTags : undefined,
          hasCluster:
            filters.hasCluster ?? undefined,
          plantingYears:
            filters.plantingYears.length > 0 ? filters.plantingYears : undefined
        }),
      })
    }

    const handleReset = () => {
      onResetFilters()
      applyOldStateToTags({ statusTags: [], regionTags: [], hasCluster: undefined, plantingYears: [] })
      resetFilters()
      setIsOpen(false)
      navigate({ search: () => ({}) })
    }

    const handleClose = () => {
      setIsOpen(false)
      applyOldStateToTags(oldValues)
    }

    const openFilter = () => {
      setOldValues(filters)
      setIsOpen(true)
    }

    useEffect(() => {
      setCount(filters.statusTags.length
        + filters.regionTags.length
        + (filters.hasCluster !== undefined ? 1 : 0)
        + filters.plantingYears.length);
    }, [filters])

    return (
      <div className="font-nunito-sans text-base">
        <div
          className={`bg-dark-900/90 fixed inset-0 z-[1020] ${isOpen ? 'block' : 'hidden'}`}
        ></div>

        <FilterButton
          activeCount={count}
          ariaLabel={headline}
          isOnMap={isOnMap}
          onClick={() => {
            isOpen ? setIsOpen(false) : openFilter()
          }}
        />

        <section
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          className={`fixed max-h-[80dvh] overflow-y-auto z-[1030] inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-5 rounded-xl mx-auto max-w-[30rem] ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="flex items-center justify-between gap-x-5 mb-5">
            <h2 className="text-xl font-lato font-semibold">{headline}</h2>
            <button
              aria-label="Close Dialog"
              className="text-dark-400 hover:text-dark-600 stroke-1"
              onClick={handleClose}
            >
              <X />
            </button>
          </div>

          {children}

          <div className="flex flex-wrap gap-5 mt-6">
            <PrimaryButton
              label="Anwenden"
              type="button"
              onClick={handleSubmit}
            />
            <SecondaryButton label="Zurücksetzen" onClick={handleReset} />
          </div>
        </section>
      </div>
    )
  }
)

export default Dialog
