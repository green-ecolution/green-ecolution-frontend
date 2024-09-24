import React, { useState } from 'react';
import PrimaryButton from '../general/buttons/PrimaryButton';
import SecondaryButton from '../general/buttons/SecondaryButton';
import useStore from '@/store/store';
import { MoveRight, Trash2, X } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const MapSelectTreesModal: React.FC = () => {
  const navigate = useNavigate({ from: '/map' })
  const [treeIds, setTreeIds] = useState([1,2]);
  const [openModal, setOpenModal] = useState(false);
  const newTreecluster = useStore((state) => state.newTreecluster);

  const handleOnClick = () => {
    newTreecluster.setTreeIds(treeIds);
    navigate({ to: '/treecluster/new' });
  }

  const handleCancel = () => {
    newTreecluster.setTreeIds([]);
    navigate({ to: '/treecluster/new' });
  }

  const handleDeleteTree = (treeIdToDelete: number) => {
    setTreeIds((prevTreeIds) => prevTreeIds.filter((treeId) => treeId !== treeIdToDelete));
  };

  return (
    <div className="text-base font-nunito-sans">
      <button 
        onClick={() => setOpenModal(true)}
        className={`bg-white absolute flex items-center group gap-x-3 rounded-xl px-5 py-2 z-[1000] left-4 bottom-24 transition-all ease-in-out duration-300 hover:bg-dark-100 lg:hidden
          ${openModal ? 'hidden' : ''}`}
      >
        <span className="font-medium text-base">Auswahl anzeigen</span>
        <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2" />
      </button>

      <div         
        role="dialog"
        aria-modal="true"
        className={`space-y-6 absolute z-[1000] top-4 inset-x-4 lg:w-[30rem] lg:left-auto lg:right-10 bg-white border-dark-50 shadow-xl p-5 rounded-xl
          ${openModal ? 'block' : 'hidden lg:block'}`}
      >
        <div className="flex justify-between gap-x-6">
          <h2 className="text-lg font-lato font-semibold lg:text-xl">Bäume hinzufügen:</h2>
          <button
            aria-label="Close Dialog"
            className="text-dark-400 hover:text-dark-600 stroke-1 lg:hidden"
            onClick={() => setOpenModal(false)}
          >
            <X />
          </button>
        </div>

        <ul className="space-y-3">
          {treeIds.length === 0 ? (
            <li className="text-dark-600">
              <p>Keine Bäume ausgewählt.</p>
            </li>
          ) : (
            treeIds.map((treeId, key) => (
              <li key={key} className="flex justify-between gap-x-6 bg-white border border-dark-50 shadow-cards px-4 py-3 rounded-lg">
                <h3 className="relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] before:bg-dark-400">{treeId}</h3>
                <button 
                  onClick={() => handleDeleteTree(treeId)} 
                  className="text-dark-600"
                >
                  <Trash2 className="w-5 h-5"/>
                  <span className="sr-only">Baum aus Auswahl löschen</span>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="flex flex-wrap gap-5">
          <PrimaryButton type="submit" label="Speichern" onClick={handleOnClick} />
          <SecondaryButton label="Zurück" onClick={handleCancel} />
        </div>
      </div>
    </div>
  );
}

export default MapSelectTreesModal;