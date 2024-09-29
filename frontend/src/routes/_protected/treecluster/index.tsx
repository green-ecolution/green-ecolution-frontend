import { useState, useEffect } from 'react';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { z } from 'zod';
import TreeclusterCard from "@/components/general/cards/TreeclusterCard";
import Dialog from "@/components/general/filter/Dialog";
import { treeclusterDemoData } from "@/data/treecluser";
import ButtonLink from '@/components/general/links/ButtonLink';
import { Plus } from 'lucide-react';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';

const treeclusterFilterSchema = z.object({
  status: z.array(z.string()).optional(),
  region: z.array(z.string()).optional(),
});

export const Route = createFileRoute('/_protected/treecluster/')({
  component: Treecluster,
  validateSearch: treeclusterFilterSchema,
  meta: () => [
    {
      title: 'Bewässerungsgruppen',
      path: '/treecluster',
    },
  ],
  loaderDeps: ({ search: { status, region } }) => ({
    status: status || [],
    region: region || [],
  }),
  loader: ({ deps: { status, region } }) => {
    return { status, region };
  },
});

function Treecluster() {
  const clusters = treeclusterDemoData();
  const search = useLoaderData({ from: '/_protected/treecluster/' });

  const [statusTags, setStatusTags] = useState<string[]>(search.status);
  const [regionTags, setRegionTags] = useState<string[]>(search.region);

  useEffect(() => {
    if (search.status) setStatusTags(search.status);
    if (search.region) setRegionTags(search.region);
  }, [search.status, search.region]);

  const filteredClusters = clusters.filter(cluster =>
    (statusTags.length === 0 || statusTags.includes(getWateringStatusDetails(cluster.status).label)) &&
    (regionTags.length === 0 || regionTags.includes(cluster.region))
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

        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,1.5fr,2fr,1fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Name</p>
          <p>Standort</p>
          <p>Anzahl d. Bäume</p>
        </header>

        <ul>
          {clusters.length === 0 ? (
            <li className="text-center text-dark-600 mt-10">
              <p>Es sind noch keine Bewässerungsgruppen vorhanden.</p>
            </li>
          ) : (
            filteredClusters.length === 0 ? (
              <li className="text-center text-dark-600 mt-10">
                <p>Es wurden keine Bewässerungsgruppen gefunden, die den Filterkriterien entsprechen.</p>
              </li>
            ) : (
              filteredClusters.map((cluster, key) => (
                <li key={key} className="mb-5 last:mb-0">
                  <TreeclusterCard
                    treecluster={cluster}
                  />
                </li>
              ))
            )
          )}
        </ul>
      </section>
    </div>
  );
}

export default Treecluster;
