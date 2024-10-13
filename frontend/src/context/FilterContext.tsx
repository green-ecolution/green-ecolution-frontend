import React, { createContext, useState, ReactNode } from 'react'

export interface Filters {
  statusTags: string[]
  regionTags: string[]
}

interface FilterContextType {
  filters: Filters
  handleStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRegionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetFilters: () => void
  applyOldStateToTags: (oldValues: Filters) => void
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
)

interface FilterProviderProps {
  initialStatus?: string[]
  initialRegions?: string[]
  children: ReactNode
}

const FilterProvider: React.FC<FilterProviderProps> = ({
  initialStatus = [],
  initialRegions = [],
  children,
}) => {
  const [statusTags, setStatusTags] = useState<string[]>(initialStatus)
  const [regionTags, setRegionTags] = useState<string[]>(initialRegions)

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target
    setStatusTags((prev) =>
      checked ? [...prev, value] : prev.filter((tag) => tag !== value)
    )
  }

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target
    setRegionTags((prev) =>
      checked ? [...prev, value] : prev.filter((tag) => tag !== value)
    )
  }

  const applyOldStateToTags = (oldTags: Filters) => {
    setStatusTags(oldTags.statusTags)
    setRegionTags(oldTags.regionTags)
  }

  const resetFilters = () => {
    setStatusTags([])
    setRegionTags([])
  }

  return (
    <FilterContext.Provider
      value={{
        filters: { statusTags, regionTags },
        handleStatusChange,
        handleRegionChange,
        resetFilters,
        applyOldStateToTags,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
