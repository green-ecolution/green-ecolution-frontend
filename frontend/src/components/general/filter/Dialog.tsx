import React, { useState } from 'react';
import FilterButton from '../buttons/FilterButton';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { MoveRight, X } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { getWateringStatusDetails, WateringStatus } from '@/types/WateringStatus';
import Option from './Option';
import { Region } from '@/types/Region';
import { useNavigate } from '@tanstack/react-router';

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
          <h2 className="text-xl font-semibold">{headline}</h2>
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
          {Object.entries(WateringStatus)
            .filter(([key]) => key !== 'unknown')
            .map(([statusKey, statusValue]) => (
              <Option
                key={statusKey}
                label={statusValue}
                name={statusKey}
                checked={statusTags.includes(statusValue)}
                onChange={handleFilterChange('status')}
              >
                <div className={`bg-${getWateringStatusDetails(statusValue).color} w-4 h-4 rounded-full`} />
              </Option>
            ))}
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-lato font-semibold text-dark-600 mb-2">Stadtteil in Flensburg:</legend>
          {Object.entries(Region)
            .filter(([key]) => key !== 'unknown')
            .map(([regionKey, regionValue]) => (
              <Option
                key={regionKey}
                label={regionValue}
                name={regionKey}
                checked={regionTags.includes(regionValue)}
                onChange={handleFilterChange('region')}
              />
            ))}
        </fieldset>

        <div className="flex flex-wrap gap-5 mt-6">
          <PrimaryButton label="Anwenden" icon={
            <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2" />
          } type="button" onClick={applyFilters} />
          <SecondaryButton label="Zurücksetzen" onClick={resetFilters} />
        </div>
      </section>
    </div>
  );
};

export default Dialog;
