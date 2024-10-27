// src/pages/Treecluster.tsx
import Dialog from '@/components/general/filter/Dialog'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { z } from 'zod'
import ButtonLink from '@/components/general/links/ButtonLink'
import { Plus } from 'lucide-react'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import { TreeCluster } from '@/api/backendApi'
import { useSuspenseQuery } from '@tanstack/react-query'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import FilterProvider from '@/context/FilterContext'
import useFilter from '@/hooks/useFilter'
import { Suspense, useState, useEffect } from 'react'
import StatusFieldset from '@/components/general/filter/fieldsets/StatusFieldset'
import RegionFieldset from '@/components/general/filter/fieldsets/RegionFieldset'
import { ErrorBoundary } from 'react-error-boundary'
import TreeClusterList from '@/components/treecluster/TreeClusterList'
import { treeClusterQuery } from '@/api/queries'
import Searchbar from '@/components/general/filter/Searchbar'

const treeclusterFilterSchema = z.object({
  status: z.array(z.string()).optional(),
  region: z.array(z.string()).optional(),
  search: z.string().optional(),
})

function Treecluster() {
  const { data: clustersRes } = useSuspenseQuery(treeClusterQuery())
  const { filters, handleSearchChange } = useFilter()
  const [filteredData, setFilteredData] = useState<TreeCluster[]>(
    clustersRes.data
  )

  useEffect(() => {
    handleFilter()
  }, [filters, handleFilter])

  const filterData = () => {
    return clustersRes.data.filter((cluster) => {
      const statusFilter =
        filters.statusTags.length === 0 ||
        filters.statusTags.includes(
          getWateringStatusDetails(cluster.wateringStatus).label
        )

      const regionFilter =
        filters.regionTags.length === 0 ||
        (cluster.region && filters.regionTags.includes(cluster.region.name))

      const searchFilter =
        filters.searchTag.length === 0 ||
        cluster.name.toLowerCase().includes(filters.searchTag.toLowerCase())

      return statusFilter && regionFilter && searchFilter
    })
  }

  const handleFilter = () => {
    const data = filterData()
    setFilteredData(data)
  }

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung der Bewässerungsgruppen
        </h1>
        <p className="mb-5">
          Hier finden Sie eine Übersicht aller Bewässerungsgruppen. Eine
          Bewässerungsgruppe besteht aus mehreren Bäumen, welche aufgrund ihrer
          Nähe und Standortbedinungen in einer Gruppe zusammengefasst wurden.
          Die Ausstattung einzelner Bäume mit Sensoren erlaubt eine
          Gesamtaussage über den Bewässerungszustand der vollständigen Gruppe.
          Die Auswertung der Daten aller Sensoren einer Bewässerungsgruppe
          liefert Handlungsempfehlungen für diese Gruppe.
        </p>
        <ButtonLink
          icon={Plus}
          label="Neue Gruppe erstellen"
          link={{ to: '/treecluster/new' }}
        />
      </article>

      <section className="mt-10">
        <div className="flex justify-end mb-6 lg:mb-10 items-center gap-4">
          <Searchbar
            value={filters.searchTag}
            onChange={handleSearchChange}
            onClear={() =>
              handleSearchChange({
                target: { value: '' },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
          <Dialog
            headline="Bewässerungsgruppen filtern"
            fullUrlPath={Route.fullPath}
            onApplyFilters={() => handleFilter()}
            onResetFilters={() => setFilteredData(clustersRes.data)}
          >
            <StatusFieldset />
            <RegionFieldset />
          </Dialog>
        </div>

        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,2fr,1.5fr,1fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Name</p>
          <p>Standort</p>
          <p>Anzahl d. Bäume</p>
        </header>

        <Suspense fallback={<LoadingInfo label="Daten werden geladen" />}>
          <ErrorBoundary
            fallback={
              <p className="text-center text-dark-600 mt-10">
                Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später
                erneut.
              </p>
            }
          >
            <TreeClusterList filteredData={filteredData} />
          </ErrorBoundary>
        </Suspense>
      </section>
    </div>
  )
}

const TreeclusterWithProvider = () => {
  const search = useLoaderData({ from: '/_protected/treecluster/' })
  return (
    <FilterProvider
      initialStatus={search.status ?? []}
      initialRegions={search.region ?? []}
      initialSearch={search.search ?? ''}
    >
      <Treecluster />
    </FilterProvider>
  )
}

export const Route = createFileRoute('/_protected/treecluster/')({
  component: TreeclusterWithProvider,
  validateSearch: treeclusterFilterSchema,

  loaderDeps: ({ search: { status, region, search } }) => ({
    status: status || [],
    region: region || [],
    search: search || '',
  }),

  loader: ({ deps: { status, region, search } }) => {
    return { status, region, search }
  },
})

export default TreeclusterWithProvider
