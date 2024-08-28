import React, { useState } from 'react';
import FilterButton from '../buttons/FilterButton';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import useOutsideClick from '@/hooks/useOutsideClick';
import StatusFieldset from './fieldsets/StatusFieldset';
import RegionsFieldset from './fieldsets/RegionsFieldset';

interface DialogProps {
  headline: string;
  onApplyFilter: (status: string[], regions: string[]) => void;
}

const Dialog: React.FC<DialogProps> = ({ headline, onApplyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState<string[]>([]);
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]);

  const handleFilterView = () => setIsOpen(!isOpen);
  const dialogRef = useOutsideClick(() => setIsOpen(false));
  const handleStatusChange = (status: string[]) => setFilteredStatus(status);
  const handleRegionsChange = (regions: string[]) => setFilteredRegions(regions);

  const applyFilters = () => {
    onApplyFilter(filteredStatus, filteredRegions); 
    setIsOpen(false);
  };

  return (
    <div>
      <div className={`bg-dark-900/90 fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}></div>
      <FilterButton ariaLabel={headline} onClick={handleFilterView} />

      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={`fixed z-[60] inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-5 rounded-xl mx-auto max-w-[30rem]
          ${isOpen ? 'block' : 'hidden'}
      `}>
        <h2 className="text-xl font-semibold mb-5">{headline}</h2>

        <StatusFieldset onStatusChange={handleStatusChange} />
        <RegionsFieldset onRegionsChange={handleRegionsChange} />

        <div className="flex flex-wrap gap-5">
          <PrimaryButton label="Anwenden" type="button" onClick={applyFilters} />
          <SecondaryButton label="Abbrechen" onClick={handleFilterView} />
        </div>
      </section>
    </div>
  );
};

export default Dialog;
