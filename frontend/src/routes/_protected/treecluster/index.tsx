import TreeclusterCard from '@/components/general/cards/TreeclusterCard'
import Dialog from '@/components/general/filter/Dialog'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { z } from 'zod'
import ButtonLink from '@/components/general/links/ButtonLink'
import { Plus } from 'lucide-react'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import { clusterApi, TreeCluster } from '@/api/backendApi'
import { useAuthHeader } from '@/hooks/useAuthHeader'
import {  useSuspenseQuery } from '@tanstack/react-query'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import FilterProvider from '@/context/FilterContext'
import useFilter from '@/hooks/useFilter'
import { useCallback, useEffect, useState } from 'react'

const treeclusterFilterSchema = z.object({
  status: z.array(z.string()).optional(),
  region: z.array(z.string()).optional(),
})

function Treecluster() {
  const authorization = useAuthHeader()
  const { filters } = useFilter()
  const [filteredData, setFilteredData] = useState<TreeCluster[]>([]);

  const {
    data: clustersRes,
    isLoading,
    error,
  } = useSuspenseQuery({
    queryKey: ['cluster'],
    queryFn: () => clusterApi.getAllTreeClusters({ authorization }),
  })

  const filterData = useCallback(() => {
    const data = clustersRes.data.filter((cluster) => {
      const statusFilter =
        filters.statusTags.length === 0 ||
        filters.statusTags.includes(getWateringStatusDetails(cluster.wateringStatus).label);

      const regionFilter =
        filters.regionTags.length === 0 ||
        filters.regionTags.includes(cluster.region.name);

      return statusFilter && regionFilter;
    });

    setFilteredData(data);
  }, [clustersRes.data, filters]); 

  useEffect(() => {
    if (clustersRes?.data) {
      filterData();
    }
  }, [clustersRes, filterData]);

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung der Bewässerungsgruppen
        </h1>
        <p className="mb-5">
          Eine Bewässerungsgruppe besteht aus bis zu 40 Bäumen, die die gleichen
          Standortbedingungen vorweisen. Mindestens fünf Bäume in einer
          Baumgruppe sind mit Sensoren ausgestattet. Diese gelieferten Werte
          werden gemittelt, sodass eine Handlungsempfehlung für die Baumgruppe
          gegeben werden kann.
        </p>
        <ButtonLink
          icon={Plus}
          label="Neue Gruppe erstellen"
          link={{ to: '/treecluster/new' }}
        />
      </article>

      <section className="mt-10">
        <div className="flex justify-end mb-6 lg:mb-10">
          <Dialog
            headline="Bewässerungsgruppen filtern"
            fullUrlPath={Route.fullPath}
            onApplyFilters={() => filterData()}
            onResetFilters={() => setFilteredData(clustersRes.data)}
          />
        </div>

        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,2fr,1.5fr,1fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Name</p>
          <p>Standort</p>
          <p>Anzahl d. Bäume</p>
        </header>

        {isLoading ? (
          <LoadingInfo label="Daten werden geladen" />
        ) : error ? (
          <p className="text-center text-dark-600 mt-10">
            Fehler beim Laden der Daten.
          </p>
        ) : (
          <ul>
            {filteredData?.length === 0 ? (
              <li className="text-center text-dark-600 mt-10">
                <p>
                  Es wurden keine Bewässerungsgruppen gefunden, die den
                  Filterkriterien entsprechen.
                </p>
              </li>
            ) : (
              filteredData?.map((cluster, key) => (
                <li key={key} className="mb-5 last:mb-0">
                  <TreeclusterCard treecluster={cluster} />
                </li>
              ))
            )}
          </ul>
        )}
      </section>
    </div>
  )
}

const TreeclusterWithProvider = () => {
  const search = useLoaderData({ from: '/_protected/treecluster/' })

  const initialStatus = search.status || []
  const initialRegions = search.region || []
  return (
    <FilterProvider
      initialStatus={initialStatus}
      initialRegions={initialRegions}
    >
      <Treecluster />
    </FilterProvider>
  )
}

export const Route = createFileRoute('/_protected/treecluster/')({
  component: TreeclusterWithProvider,
  validateSearch: treeclusterFilterSchema,

  loaderDeps: ({ search: { status, region } }) => ({
    status: status || [],
    region: region || [],
  }),

  loader: ({ deps: { status, region } }) => {
    return { status, region }
  },
})

export default TreeclusterWithProvider
