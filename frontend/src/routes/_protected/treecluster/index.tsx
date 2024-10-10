import { useState, useEffect } from 'react';
import TreeclusterCard from "@/components/general/cards/TreeclusterCard";
import Dialog from "@/components/general/filter/Dialog";
import { createFileRoute, useLoaderData, useSearch } from '@tanstack/react-router';
import { z } from 'zod';
import ButtonLink from '@/components/general/links/ButtonLink';
import { Plus } from 'lucide-react';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';
import { clusterApi } from '@/api/backendApi';
import { useAuthHeader } from '@/hooks/useAuthHeader';
import { useQuery } from '@tanstack/react-query';
import LoadingInfo from '@/components/general/error/LoadingInfo';
import Toast from '@/components/general/Toast';

const treeclusterFilterSchema = z.object({
  status: z.array(z.string()).optional(),
  region: z.array(z.string()).optional(),
  showToast: z.boolean().optional(),
});

export const Route = createFileRoute('/_protected/treecluster/')({
  component: Treecluster,
  validateSearch: treeclusterFilterSchema,

  loaderDeps: ({ search: { status, region, showToast } }) => ({
    status: status || [],
    region: region || [],
    showToast: showToast || false,
  }),

  loader: ({ deps: { status, region, showToast } }) => {
    return { status, region, showToast };
  },
});

function Treecluster() {
  const authorization = useAuthHeader();
  const search = useLoaderData({ from: '/_protected/treecluster/' });

  const [statusTags, setStatusTags] = useState<string[]>(search.status);
  const [regionTags, setRegionTags] = useState<string[]>(search.region);
  const [showToast] = useState(search.showToast);

  const { data: clustersRes, isLoading, error } = useQuery({
    queryKey: ["cluster"],
    queryFn: () => clusterApi.getAllTreeClusters({ authorization }),
  });

  useEffect(() => {
    if (search.status) setStatusTags(search.status);
    if (search.region) setRegionTags(search.region);
  }, [search.status, search.region]);

  const filteredClusters = clustersRes?.data.filter(cluster =>
    (statusTags.length === 0 || statusTags.includes(getWateringStatusDetails(cluster.wateringStatus).label)) &&
    (regionTags.length === 0 || regionTags.includes(cluster.region.name))
  );

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung der Bewässerungsgruppen
        </h1>
        <p className="mb-5">
          Eine Bewässerungsgruppe besteht aus bis zu 40 Bäumen, die die gleichen Standortbedingungen vorweisen. 
          Mindestens fünf Bäume in einer Baumgruppe sind mit Sensoren ausgestattet. 
          Diese gelieferten Werte werden gemittelt, sodass eine Handlungsempfehlung für die Baumgruppe gegeben werden kann.
        </p>
        <ButtonLink 
          icon={Plus} 
          label="Neue Gruppe erstellen"
          url="/treecluster/new" />
      </article>

      <section className="mt-10">
        <div className="flex justify-end mb-6 lg:mb-10">
          <Dialog
            initStatusTags={statusTags}
            initRegionTags={regionTags}
            headline="Bewässerungsgruppen filtern"
            fullUrlPath={Route.fullPath}
            applyFilter={(statusTags, regionTags) => {
              setStatusTags(statusTags);
              setRegionTags(regionTags);
            }}
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
          <p className="text-center text-dark-600 mt-10">Fehler beim Laden der Daten.</p>
        ) : (
          <ul>
            {filteredClusters?.length === 0 ? (
              <li className="text-center text-dark-600 mt-10">
                <p>Es wurden keine Bewässerungsgruppen gefunden, die den Filterkriterien entsprechen.</p>
              </li>
            ) : (
              filteredClusters?.map((cluster, key) => (
                <li key={key} className="mb-5 last:mb-0">
                  <TreeclusterCard treecluster={cluster} />
                </li>
              ))
            )}
          </ul>
        )}
      </section>
      
      {showToast && <Toast label="Die Bewässerungsgruppe wurde erfolgreich gelöscht." />}
    </div>
  );
}

export default Treecluster;
