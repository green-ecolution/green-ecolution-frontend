import React, { useEffect, useState } from 'react';
import FilterButton from '../buttons/FilterButton';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { X } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { WateringStatus, WateringStatusColor } from '@/types/WateringStatus';
import Option from './Option';

interface DialogProps {
  headline: string;
  applyFilter: (filterTags: string[]) => void;
}

const Dialog: React.FC<DialogProps> = ({ headline, applyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleFilterView = () => setIsOpen(!isOpen);
  const dialogRef = useOutsideClick(() => setIsOpen(false));

  const [filterTags, setFilterTags] = useState<string[]>([]);

  const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    setFilterTags(prevTags => {
      if (checked) {
        return [...prevTags, value];
      } else {
        return prevTags.filter(tag => tag !== value);
      }
    });
  };

  useEffect(() => {}, [filterTags]);

  return (
    <div>
      <div className={`bg-dark-900/90 fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}></div>

      <FilterButton 
        activeCount={filterTags.length}
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
            aria-label="Close Modal"
            className="text-dark-400 hover:text-dark-600 stroke-1" 
            onClick={handleFilterView}>
              <X />
          </button>
        </div>

        <fieldset>
          <legend className="font-lato font-semibold text-dark-600 mb-2">
            Zustand der Bewässerung:
          </legend>
          {Object.entries(WateringStatus)
            .filter(([key]) => key !== 'unknown')
            .map(([statusKey, statusValue]) => (
              <Option
                key={statusKey}
                label={statusValue}
                name={statusKey}
                filterHandler={filterHandler}
              >
                <div className={`bg-${WateringStatusColor[statusValue].color} w-4 h-4 rounded-full`} />
              </Option>
          ))}
        </fieldset>

        <div className="flex flex-wrap gap-5 mt-6">
          <PrimaryButton label="Anwenden" type="button" onClick={() => {applyFilter(filterTags), handleFilterView()}}/>
          <SecondaryButton label="Zurücksetzen" />
        </div>
      </section>
    </div>
  );
};

export default Dialog;
