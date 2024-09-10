import React, { useEffect, useRef, useState } from 'react';
import FilterButton from '../buttons/FilterButton';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import useOutsideClick from '@/hooks/useOutsideClick';
import RegionsFieldset, { RegionsRef } from './fieldsets/RegionsFieldset';
import WateringStatusFieldset, { WateringStatusRef } from './fieldsets/WateringStatusFieldset';
import { X } from 'lucide-react';

interface DialogProps {
  headline: string;
  onApplyFilter: () => void;
}

const Dialog: React.FC<DialogProps> = ({ headline, onApplyFilter }) => {
  const wateringStatusRef = useRef<WateringStatusRef>(null);
  const regionsRef = useRef<RegionsRef>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const handleFilterView = () => setIsOpen(!isOpen);

  const dialogRef = useOutsideClick(() => setIsOpen(false));

  useEffect(() => {
    updateActiveCount();
  }, []);

  const updateActiveCount = () => {
    const params = new URLSearchParams(window.location.search);
    setActiveCount(params.size);
  };

  const applyFilters = () => {
    wateringStatusRef.current?.submitOptions();
    regionsRef.current?.submitOptions();
    onApplyFilter();
    updateActiveCount();
    setIsOpen(false);
  };

  const resetFilters = () => {
    wateringStatusRef.current?.resetOptions();
    regionsRef.current?.resetOptions();
    setActiveCount(0);
    onApplyFilter();
    setIsOpen(false);
  };

  return (
    <div>
      <div className={`bg-dark-900/90 fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}></div>
      
      <FilterButton 
        activeCount={activeCount} 
        ariaLabel={headline} 
        onClick={handleFilterView} />

      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={`fixed z-[60] inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-5 rounded-xl mx-auto max-w-[30rem]
          ${isOpen ? 'block' : 'hidden'}
      `}>
        <div className="flex items-center justify-between gap-x-5 mb-5">
          <h2 className="text-xl font-semibold">{headline}</h2>
          <button
            aria-label="Modal schließen"
            className="text-dark-400 hover:text-dark-600 stroke-1" 
            onClick={handleFilterView}>
              <X />
          </button>
        </div>

        <WateringStatusFieldset ref={wateringStatusRef} />
        <RegionsFieldset ref={regionsRef} />

        <div className="flex flex-wrap gap-5">
          <PrimaryButton label="Anwenden" type="button" onClick={applyFilters} />
          <SecondaryButton label="Zurücksetzen" onClick={resetFilters} />
        </div>
      </section>
    </div>
  );
};

export default Dialog;
