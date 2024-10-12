import useTreeclusterFilter from '@/hooks/useTreeclusterFilter'
import React, { useState } from 'react';
import FilterButton from '../buttons/FilterButton';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { X } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Option from './Option';
import { useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { EntitiesWateringStatus } from '@/api/backendApi';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';
import { regionsQuery } from '@/api/queries';

interface DialogProps {
  initStatusTags: string[]
  initRegionTags: string[]
  headline: string
  fullUrlPath: string
  applyFilter: (statusTags: string[], regionTags: string[]) => void
}

const Dialog: React.FC<DialogProps> = ({ initStatusTags, initRegionTags, headline, fullUrlPath, applyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate({ from: fullUrlPath })
  const dialogRef = useOutsideClick(() => close())
  const [statusTags, setStatusTags] = useState<string[]>(initStatusTags);
  const [regionTags, setRegionTags] = useState<string[]>(initRegionTags);
  const { data: regionRes } = useSuspenseQuery(regionsQuery());

  const {
    filters,
    setFilters,
    appliedFilters,
    handleFilterChange,
    resetFilters,
    applyFilters,
  } = useTreeclusterFilter(initStatusTags, initRegionTags)

  const resetAndClose = () => {
    resetFilters(applyFilter)
    setIsOpen(false)
    navigate({ search: () => ({}) })
  }

  const close = () => {
    setIsOpen(false)
    setFilters({
      statusTags: appliedFilters.statusTags,
      regionTags: appliedFilters.regionTags,
    })
  }

  const handleApplyFilters = () => {
    applyFilters(applyFilter)
    setIsOpen(false)

    navigate({
      search: () => ({
        status: filters.statusTags.length > 0 ? filters.statusTags : undefined,
        region: filters.regionTags.length > 0 ? filters.regionTags : undefined,
      }),
    })
  }

  return (
    <div>
      <div
        className={`bg-dark-900/90 fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}
      ></div>

      <FilterButton
        activeCount={
          appliedFilters.statusTags.length + appliedFilters.regionTags.length
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
        className={`fixed z-[60] inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-5 rounded-xl mx-auto max-w-[30rem] ${isOpen ? 'block' : 'hidden'}`}
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
                onChange={handleFilterChange('status')}
              >
                <div
                  className={`bg-${getWateringStatusDetails(statusValue).color} w-4 h-4 rounded-full`}
                />
              </Option>
            )
          )}
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-lato font-semibold text-dark-600 mb-2">Stadtteil in Flensburg:</legend>
          {regionRes.regions.map((region) => (
            <Option
              key={region.id}
              label={region.name}
              name={String(region.id)}
              checked={filters.regionTags.includes(region.name)}
              onChange={handleFilterChange('region')}
            />
          ))}
        </fieldset>

        <div className="flex flex-wrap gap-5 mt-6">
          <PrimaryButton
            label="Anwenden"
            type="button"
            onClick={handleApplyFilters}
          />
          <SecondaryButton label="Zurücksetzen" onClick={resetAndClose} />
        </div>
      </section>
    </div>
  )
}

export default Dialog
