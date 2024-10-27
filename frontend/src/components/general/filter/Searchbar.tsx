import React from 'react'
import { Search, X } from 'lucide-react'

interface SearchbarProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

const Searchbar: React.FC<SearchbarProps> = ({ value, onChange, onClear }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="stroke-1 text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Suche"
        value={value}
        onChange={onChange}
        className={`transition-all duration-300 ease-in-out pl-10 py-2 border border-green-light font-medium rounded-full focus:outline-none focus:ring-4 focus:ring-green-light-200 focus:bg-green-light-200 hover:bg-green-light-200 ${value ? 'w-full pr-10' : 'w-28'}`}
      />
      {value && (
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={onClear}
        >
          <X className="stroke-1 text-gray-500" />
        </div>
      )}
    </div>
  )
}

export default Searchbar
