import { Trash2 } from 'lucide-react';
import React from 'react';

interface SelectedCard {
  itemId: number;
  onClick: (itemId: number) => void;
}

const SelectedCard: React.FC<SelectedCard> = ({ onClick, itemId }) => {
    return (
      <div className="flex justify-between gap-x-6 bg-white border border-dark-50 shadow-cards px-4 py-3 rounded-lg">
        <h3 className="relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] before:bg-dark-400">
          {itemId}
        </h3>
        <button 
          onClick={() => onClick(itemId)} 
          className="text-dark-600"
        >
          <Trash2 className="w-5 h-5"/>
          <span className="sr-only">Baum aus Auswahl löschen</span>
        </button>
      </div>
    );
}

export default SelectedCard;
