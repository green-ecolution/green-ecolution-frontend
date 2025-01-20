import Dialog from '@/components/general/filter/Dialog'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { z } from 'zod'
import ButtonLink from '@/components/general/links/ButtonLink'
import { Plus } from 'lucide-react'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import { useSuspenseQuery } from '@tanstack/react-query'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import FilterProvider from '@/context/FilterContext'
import useFilter from '@/hooks/useFilter'
import { Suspense, useMemo, useState } from 'react'
import StatusFieldset from '@/components/general/filter/fieldsets/StatusFieldset'
import RegionFieldset from '@/components/general/filter/fieldsets/RegionFieldset'
import { ErrorBoundary } from 'react-error-boundary'
import TreeClusterList from '@/components/treecluster/TreeClusterList'
import { treeClusterQuery } from '@/api/queries'

const treeclusterFilterSchema = z.object({
  status: z.array(z.string()).optional(),
  region: z.array(z.string()).optional(),
  page: z.number().default(1),
})

function Treecluster() {
  const { data: clustersRes } = useSuspenseQuery(treeClusterQuery())

  const [filteredData, setFilteredData] = useState({
    active: false,
    data: clustersRes.data,
  })
  const { filters } = useFilter()

  const filterData = useMemo(() => {
    return clustersRes.data.filter((cluster) => {
      const statusFilter =
        filters.statusTags.length === 0 ||
        filters.statusTags.includes(
          getWateringStatusDetails(cluster.wateringStatus).label
        )

      const regionFilter =
        filters.regionTags.length === 0 ||
        (cluster.region && filters.regionTags.includes(cluster.region.name))

      return statusFilter && regionFilter
    })
  }, [clustersRes.data, filters])

  const handleFilter = () => {
    setFilteredData({
      active: true,
      data: filterData,
    })
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
        {/* TODO: Filter data from backend to work with pagination */}
        <div className="flex justify-end mb-6 lg:mb-10">
          <Dialog
            headline="Bewässerungsgruppen filtern"
            fullUrlPath={Route.fullPath}
            onApplyFilters={() => handleFilter()}
            onResetFilters={() =>
              setFilteredData({ active: false, data: clustersRes.data })
            }
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
            <TreeClusterList
              data={filteredData.active ? filteredData.data : clustersRes.data}
            />
            {/* TODO: Comment pagination in as soon as data is filtered through the backend */}
            {/* {clustersRes.pagination && (
              <Pagination 
                pagination={clustersRes.pagination}
              />
            )} */}
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
    >
      <Treecluster />
    </FilterProvider>
  )
}

export const Route = createFileRoute('/_protected/treecluster/')({
  component: TreeclusterWithProvider,
  validateSearch: treeclusterFilterSchema,

  loaderDeps: ({ search: { status, region, page } }) => ({
    status: status || [],
    region: region || [],
    page: page || 1,
  }),

  loader: ({ deps: { status, region, page } }) => {
    return { status, region, page }
  },
})

export default TreeclusterWithProvider
