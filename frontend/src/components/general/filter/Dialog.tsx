import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import FilterButton from '../buttons/FilterButton'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import { X } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import useFilter from '@/hooks/useFilter'
import { Filters } from '@/context/FilterContext'
import useStore from '@/store/store'

interface DialogProps {
  headline: string
  fullUrlPath: string
  children?: React.ReactNode
  isOnMap?: boolean
  onApplyFilters: () => void
  onResetFilters: () => void
  onToggleOpen?: (isOpen: boolean) => void
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
      onToggleOpen,
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
    const [count, setCount] = useState(0)
    const navigate = useNavigate({ from: fullUrlPath })
    const mapPosition = useStore((state) => ({
      lat: state.map.center[0],
      lng: state.map.center[1],
      zoom: state.map.zoom,
    }))

    const { filters, resetFilters, applyOldStateToTags } = useFilter()

    const handleSubmit = () => {
      onApplyFilters()
      setIsOpen(false)
      setIsOpen(false)
      navigate({
        search: () => ({
          lat: isOnMap ? mapPosition.lat : undefined,
          lng: isOnMap ? mapPosition.lng : undefined,
          zoom: isOnMap ? mapPosition.zoom : undefined,
          status:
            filters.statusTags.length > 0 ? filters.statusTags : undefined,
          region:
            filters.regionTags.length > 0 ? filters.regionTags : undefined,
          hasCluster: filters.hasCluster ?? undefined,
          plantingYears:
            filters.plantingYears.length > 0
              ? filters.plantingYears
              : undefined,
        }),
      })
    }

    const handleReset = () => {
      onResetFilters()
      applyOldStateToTags({
        statusTags: [],
        regionTags: [],
        hasCluster: undefined,
        plantingYears: [],
      })
      resetFilters()
      setIsOpen(false)
      isOnMap
        ? navigate({
            search: {
              lat: mapPosition.lat,
              lng: mapPosition.lng,
              zoom: mapPosition.zoom,
            },
          })
        : navigate({ search: () => ({}) })
    }

    const handleClose = () => {
      setIsOpen(false)
      applyOldStateToTags(oldValues)
    }

    const handleOpen = () => {
      setOldValues(filters)
      setIsOpen(true)
    }

    useEffect(() => {
      setCount(
        filters.statusTags.length +
          filters.regionTags.length +
          (filters.hasCluster !== undefined ? 1 : 0) +
          filters.plantingYears.length
      )
    }, [filters])

    useEffect(() => {
      if (!onToggleOpen) return
      onToggleOpen(isOpen)
    }, [isOpen, onToggleOpen])

    return (
      <div className="font-nunito-sans text-base">
        <div
          id="filter-button"
          onClick={() => handleClose()}
          className={`bg-dark-900/90 fixed inset-0 z-[1020] ${isOpen ? 'block' : 'hidden'}`}
        ></div>

        <FilterButton
          activeCount={count}
          ariaLabel={headline}
          isOnMap={isOnMap}
          onClick={() => {
            isOpen ? handleClose() : handleOpen()
          }}
        />

        <section
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={`fixed max-h-[80dvh] overflow-y-auto z-[1030] inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-6 rounded-xl mx-auto max-w-[30rem] ${isOpen ? 'block' : 'hidden'}`}
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
