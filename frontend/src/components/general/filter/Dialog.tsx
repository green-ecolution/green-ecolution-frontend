import React, { useState } from 'react';
import FilterButton from '../buttons/FilterButton';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

interface DialogProps {
  headline: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ headline, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterView = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`bg-dark-900/90 fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}></div>
      <FilterButton ariaLabel={headline} onClick={handleFilterView} />
      <section 
        role="dialog" 
        aria-modal="true" 
        className={`fixed z-[60] inset-x-4 shadow-xl bg-white top-1/2 -translate-y-1/2 p-5 rounded-xl mx-auto max-w-[30rem]
          ${isOpen ? 'block' : 'hidden'}
      `}>
        <h2 className="text-xl font-semibold mb-5">{headline}</h2>

        {children}

        <div className="flex flex-wrap gap-5">
          <PrimaryButton label="Anwenden" type="submit" />
          <SecondaryButton label="Abbrechen" onClick={handleFilterView}/>
        </div>
      </section>
    </div>
  );
}

export default Dialog;
