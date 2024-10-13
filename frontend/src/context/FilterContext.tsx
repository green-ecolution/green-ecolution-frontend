import React, { createContext, useState, ReactNode } from 'react';

interface Filters {
  statusTags: string[];
  regionTags: string[];
}

interface FilterContextType {
  filters: Filters;
  tempFilters: Filters;
  handleStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  resetTempFilters: () => void;
  applyStateToTags: () => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  initialStatus?: string[];
  initialRegions?: string[];
  children: ReactNode;
}

const FilterProvider: React.FC<FilterProviderProps> = ({
  initialStatus = [],
  initialRegions = [],
  children,
}) => {
  const [statusTags, setStatusTags] = useState<string[]>(initialStatus);
  const [regionTags, setRegionTags] = useState<string[]>(initialRegions);
  const [tempStatusTags, setTempStatusTags] = useState<string[]>(initialStatus);
  const [tempRegionTags, setTempRegionTags] = useState<string[]>(initialRegions);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    setTempStatusTags((prev) => 
      checked ? [...prev, value] : prev.filter(tag => tag !== value)
    );
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    setTempRegionTags((prev) => 
      checked ? [...prev, value] : prev.filter(tag => tag !== value)
    );
  };

  const applyStateToTags = () => {
    setStatusTags(tempStatusTags);
    setRegionTags(tempRegionTags);
  }

  const resetTempFilters = () => {
    setTempStatusTags(statusTags);
    setTempRegionTags(regionTags);
  }
 
  const resetFilters = () => {
    setStatusTags([]);
    setRegionTags([]);
    setTempStatusTags([]);
    setTempRegionTags([]);
  };

  return (
    <FilterContext.Provider
      value={{
        filters: { statusTags, regionTags },
        tempFilters: { statusTags: tempStatusTags, regionTags: tempRegionTags },
        handleStatusChange,
        handleRegionChange,
        resetFilters,
        resetTempFilters,
        applyStateToTags,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
