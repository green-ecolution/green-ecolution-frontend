import React, { createContext, useState, ReactNode } from 'react'

export interface Filters {
  statusTags: string[]
  regionTags: string[]
  hasCluster: boolean | undefined
  plantingYears: number[]
}

interface FilterContextType {
  filters: Filters
  handleStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRegionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClusterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handlePlantingYearChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetFilters: () => void
  applyOldStateToTags: (oldValues: Filters) => void
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
)

interface FilterProviderProps {
  initialStatus?: string[]
  initialRegions?: string[]
  initialHasCluster?: boolean | undefined
  initialPlantingYears?: number[]
  children: ReactNode
}

const FilterProvider: React.FC<FilterProviderProps> = ({
  initialStatus = [],
  initialRegions = [],
  initialHasCluster = undefined,
  initialPlantingYears = [],
  children,
}) => {
  const [statusTags, setStatusTags] = useState(initialStatus)
  const [regionTags, setRegionTags] = useState(initialRegions)
  const [plantingYears, setPlantingYears] = useState(initialPlantingYears)
  const [hasCluster, setHasCluster] = useState(initialHasCluster)

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

  const handlePlantingYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    setPlantingYears((prev) => 
      checked ? [...prev, Number(value)] : prev.filter((year) => year !== Number(value))
    );
  }

  const applyOldStateToTags = (oldValues: Filters) => {
    setStatusTags(oldValues.statusTags)
    setRegionTags(oldValues.regionTags)
    setHasCluster(oldValues.hasCluster)
    setPlantingYears(oldValues.plantingYears)
  }

  const resetFilters = () => {
    setStatusTags([])
    setRegionTags([])
    setHasCluster(undefined)
    setPlantingYears([])
  }

  return (
    <FilterContext.Provider
      value={{
        filters: { statusTags, regionTags, hasCluster, plantingYears },
        handleStatusChange,
        handleRegionChange,
        handleClusterChange,
        handlePlantingYearChange,
        resetFilters,
        applyOldStateToTags,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export default FilterProvider
