import React, { createContext, useState, ReactNode } from 'react'

export interface Filters {
  statusTags: string[]
  regionTags: string[]
  hasCluster: boolean | undefined
}

interface FilterContextType {
  filters: Filters
  handleStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRegionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClusterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetFilters: () => void
  applyOldStateToTags: (oldValues: Filters) => void
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
)

interface FilterProviderProps {
  initialStatus?: string[]
  initialRegions?: string[]
  initalHasCluster?: boolean | undefined
  children: ReactNode
}

const FilterProvider: React.FC<FilterProviderProps> = ({
  initialStatus = [],
  initialRegions = [],
  initalHasCluster = undefined,
  children,
}) => {
  const [statusTags, setStatusTags] = useState(initialStatus)
  const [regionTags, setRegionTags] = useState(initialRegions)
  const [hasCluster, setHasCluster] = useState(initalHasCluster)

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

  const handleClusterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setHasCluster(value === "true");
  }

  const applyOldStateToTags = (oldValues: Filters) => {
    setStatusTags(oldValues.statusTags)
    setRegionTags(oldValues.regionTags)
    setHasCluster(oldValues.hasCluster)
  }

  const resetFilters = () => {
    setStatusTags([])
    setRegionTags([])
    setHasCluster(undefined)
  }

  return (
    <FilterContext.Provider
      value={{
        filters: { statusTags, regionTags, hasCluster },
        handleStatusChange,
        handleRegionChange,
        handleClusterChange,
        resetFilters,
        applyOldStateToTags,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
