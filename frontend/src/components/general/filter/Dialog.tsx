import React, { useState } from 'react';
import FilterButton from '../buttons/FilterButton';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { X } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Option from './Option';
import { useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { EntitiesTreeClusterWateringStatus, regionApi } from '@/api/backendApi';
import { useAuthHeader } from '@/hooks/useAuthHeader';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';

interface DialogProps {
  initStatusTags: string[];
  initRegionTags: string[];
  headline: string;
  fullUrlPath: string;
  applyFilter: (statusTags: string[], regionTags: string[]) => void;
}

const Dialog: React.FC<DialogProps> = ({ initStatusTags, initRegionTags, headline, fullUrlPath, applyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusTags, setStatusTags] = useState<string[]>(initStatusTags);
  const [regionTags, setRegionTags] = useState<string[]>(initRegionTags);
  const authorization = useAuthHeader();
  const { data: regionRes } = useSuspenseQuery({
    queryKey: ['regions'],
    queryFn: () => regionApi.v1RegionGet({ authorization }),
  });

  const handleFilterView = () => setIsOpen(!isOpen);
  const dialogRef = useOutsideClick(() => setIsOpen(false));

  const navigate = useNavigate({ from: fullUrlPath });

  const handleFilterChange = (type: 'status' | 'region') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    switch (type) {
      case 'status':
        setStatusTags((prevTags) => (checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)));
        break;
      case 'region':
        setRegionTags((prevTags) => (checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)));
        break;
    }
  };

  const resetFilters = () => {
    setStatusTags([]);
    setRegionTags([]);
    applyFilter([], []);
    handleFilterView();
    navigate({ search: () => ({}) });
  };

  const applyFilters = () => {
    applyFilter(statusTags, regionTags);
    handleFilterView();

    navigate({
      search: () => ({
        status: statusTags.length > 0 ? statusTags : undefined,
        region: regionTags.length > 0 ? regionTags : undefined,
      }),
    });
  };

  return (
    <div>
      <div className={`bg-dark-900/90 fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}></div>

      <FilterButton
        activeCount={statusTags.length + regionTags.length}
        ariaLabel={headline}
        onClick={handleFilterView}
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
            onClick={handleFilterView}
          >
            <X />
          </button>
        </div>

        <fieldset>
          <legend className="font-lato font-semibold text-dark-600 mb-2">Zustand der Bewässerung:</legend>
          {Object.entries(EntitiesTreeClusterWateringStatus)
            .filter(([key]) => key !== 'TreeClusterWateringStatusUnknown')
            .map(([statusKey, statusValue]) => (
              <Option
                key={statusKey}
                label={getWateringStatusDetails(statusValue).label}
                name={statusKey}
                checked={statusTags.includes(getWateringStatusDetails(statusValue).label)}
                onChange={handleFilterChange('status')}
              >
                <div className={`bg-${getWateringStatusDetails(statusValue).color} w-4 h-4 rounded-full`} />
              </Option>
            ))}
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-lato font-semibold text-dark-600 mb-2">Stadtteil in Flensburg:</legend>
          {regionRes?.regions.map((region) => (
            <Option
              key={region.id}
              label={region.name}
              name={String(region.id)}
              checked={regionTags.includes(region.name)}
              onChange={handleFilterChange('region')}
            />
          ))}
        </fieldset>

        <div className="flex flex-wrap gap-5 mt-6">
          <PrimaryButton label="Anwenden" type="button" onClick={applyFilters} />
          <SecondaryButton label="Zurücksetzen" onClick={resetFilters} />
        </div>
      </section>
    </div>
  );
};

export default Dialog;
