import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react'
import FilterButton from '../buttons/FilterButton'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import { X } from 'lucide-react'
import useOutsideClick from '@/hooks/useOutsideClick'
import Option from './Option'
import { useNavigate } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { EntitiesWateringStatus, regionApi } from '@/api/backendApi'
import { useAuthHeader } from '@/hooks/useAuthHeader'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import useTreeclusterFilter from '@/hooks/useTreeclusterFilter'
import useFilter from '@/hooks/useFilter'

interface DialogProps {
  headline: string
  fullUrlPath: string
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const Dialog = forwardRef(({
  headline,
  fullUrlPath,
  onApplyFilters,
  onResetFilters,
}: DialogProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate({ from: fullUrlPath })
  const dialogRef = useOutsideClick(() => handleClose())
  const authorization = useAuthHeader()
  const { data: regionRes } = useSuspenseQuery({
    queryKey: ['regions'],
    queryFn: () => regionApi.v1RegionGet({ authorization }),
  })

  useImperativeHandle(ref, () => dialogRef.current)

  const {
    filters,
    handleStatusChange,
    handleRegionChange,
    resetFilters,
  } = useFilter();

  const handleSubmit = () => {
    onApplyFilters();
    setIsOpen(false);

    navigate({
      search: () => ({
        status: filters.statusTags.length > 0 ? filters.statusTags : undefined,
        region: filters.regionTags.length > 0 ? filters.regionTags : undefined,
      }),
    })
  };

  const handleReset = () => {
    onResetFilters();
    resetFilters();
    setIsOpen(false);
    navigate({ search: () => ({}) })
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <div className="font-nunito-sans text-base">
      <div className={`bg-dark-900/90 fixed inset-0 z-[1000] ${isOpen ? 'block' : 'hidden'}`}></div>

      <FilterButton
        activeCount={
          filters.statusTags.length + filters.regionTags.length
        }
        ariaLabel={headline}
        onClick={() => {
          isOpen ? setIsOpen(false) : setIsOpen(true)
        }}
      />

      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={`fixed max-h-[80dvh] overflow-y-auto z-[1010] inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-5 rounded-xl mx-auto max-w-[30rem] ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex items-center justify-between gap-x-5 mb-5">
          <h2 className="text-xl font-lato font-semibold">{headline}</h2>
          <button
            aria-label="Close Dialog"
            className="text-dark-400 hover:text-dark-600 stroke-1"
            onClick={close}
          >
            <X />
          </button>
        </div>

        <fieldset>
          <legend className="font-lato font-semibold text-dark-600 mb-2">
            Zustand der Bewässerung:
          </legend>
          {Object.entries(EntitiesWateringStatus).map(
            ([statusKey, statusValue]) => (
              <Option
                key={statusKey}
                label={getWateringStatusDetails(statusValue).label}
                name={statusKey}
                checked={filters.statusTags.includes(
                  getWateringStatusDetails(statusValue).label
                )}
                onChange={handleStatusChange}
              >
                <div
                  className={`bg-${getWateringStatusDetails(statusValue).color} w-4 h-4 rounded-full`}
                />
              </Option>
            )
          )}
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-lato font-semibold text-dark-600 mb-2">
            Stadtteil in Flensburg:
          </legend>
          {regionRes?.regions.map((region) => (
            <Option
              key={region.id}
              label={region.name}
              name={String(region.id)}
              checked={filters.regionTags.includes(region.name)}
              onChange={handleRegionChange}
            />
          ))}
        </fieldset>

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
  );
});

export default Dialog
