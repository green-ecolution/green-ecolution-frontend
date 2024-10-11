import { useState, useEffect } from "react";
import TreeclusterCard from "@/components/general/cards/TreeclusterCard";
import Dialog from "@/components/general/filter/Dialog";
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { z } from 'zod';
import ButtonLink from '@/components/general/links/ButtonLink';
import { Plus, Search, X } from 'lucide-react';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';
import { clusterApi } from '@/api/backendApi';
import { useAuthHeader } from '@/hooks/useAuthHeader';
import { useQuery } from '@tanstack/react-query';
import LoadingInfo from '@/components/general/error/LoadingInfo';

const treeclusterFilterSchema = z.object({
  status: z.array(z.string()).optional(),
  region: z.array(z.string()).optional(),
});

export const Route = createFileRoute("/_protected/treecluster/")({
  component: Treecluster,
  validateSearch: treeclusterFilterSchema,

  loaderDeps: ({ search: { status, region } }) => ({
    status: status || [],
    region: region || [],
  }),

  loader: ({ deps: { status, region } }) => {
    return { status, region };
  },
});

function Treecluster() {
  const authorization = useAuthHeader();
  const search = useLoaderData({ from: "/_protected/treecluster/" });

  const [statusTags, setStatusTags] = useState<string[]>(search.status);
  const [regionTags, setRegionTags] = useState<string[]>(search.region);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    data: clustersRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cluster"],
    queryFn: () => clusterApi.getAllTreeClusters({ authorization }),
  });

  useEffect(() => {
    if (search.status) setStatusTags(search.status);
    if (search.region) setRegionTags(search.region);
  }, [search.status, search.region]);

  // Filter clusters based on status and region tags
  const filteredClusters = clustersRes?.data.filter(
    (cluster) =>
      (statusTags.length === 0 ||
        statusTags.includes(
          getWateringStatusDetails(cluster.wateringStatus).label,
        )) &&
      (regionTags.length === 0 || regionTags.includes(cluster.region.name)),
  );

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
          link={{ to: "/treecluster/new" }}
        />
      </article>

      <section className="mt-10">
        <div className="flex justify-end mb-6 lg:mb-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="stroke-1 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Suche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`transition-all duration-300 ease-in-out pl-10 pr-10 py-2 border border-green-light font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-green-light-200 hover:bg-green-light-200 hover:border-transparent w-full`}
              />
              {searchQuery && (
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="stroke-1 text-gray-500" />
                </div>
              )}
            </div>
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
            {filteredClusters?.length === 0 ? (
              <li className="text-center text-dark-600 mt-10">
                <p>
                  Es wurden keine Bewässerungsgruppen gefunden, die den
                  Filterkriterien entsprechen.
                </p>
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
    </div>
  );
}

export default Treecluster;
