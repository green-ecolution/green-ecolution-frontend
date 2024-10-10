import { clusterApi, EntitiesWateringStatus } from '@/api/backendApi';
import EntitiesStatusCard from '@/components/general/cards/EntitiesStatusCard';
import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard';
import TreeCard from '@/components/general/cards/TreeCard';
import BackLink from '@/components/general/links/BackLink';
import ButtonLink from '@/components/general/links/ButtonLink';
import { useAuthHeader } from '@/hooks/useAuthHeader';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Pencil } from 'lucide-react';

export const Route = createFileRoute('/_protected/treecluster/$treeclusterId')({
  component: SingleTreecluster,

  loader: async ({ params }) => {
    return params.treeclusterId;
  },
})

function SingleTreecluster() {
  const clusterId = useLoaderData({ from: '/_protected/treecluster/$treeclusterId'});
  const authorization = useAuthHeader();

  const { data: treecluster } = useQuery({
    queryKey: ["treescluster", clusterId],
    queryFn: () => clusterApi.getTreeClusterById({clusterId, authorization }),
  });

  const wateringStatus = getWateringStatusDetails(treecluster?.wateringStatus ?? EntitiesWateringStatus.WateringStatusUnknown);

  return (
    <div className="container mt-6">
      <BackLink 
        url="/treecluster"
        label="Zu allen Bewässerungsgruppen" />
      <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
        <div className="2xl:w-4/5">
          <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
            Bewässerungsgruppe: {treecluster?.name}
          </h1>
          {treecluster?.description
            ? (<p>{treecluster?.description}</p>)
            : (<p>Zu dieser Bewässerungsgruppe ist keine Beschreibung vorhanden.</p>)
          }
        </div>
        <ButtonLink
          icon={Pencil}
          iconClassName="stroke-1" 
          label="Gruppe bearbeiten"
          color="grey"
          url={`/treecluster/${treecluster?.id}/edit`} />
      </article>

      <section className="mt-10">
        <ul className="space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <li>
            <EntitiesStatusCard
              statusDetails={wateringStatus}
              label="Bewässerungszustand (ø)" />
          </li>
          <li>
            <GeneralStatusCard 
              overline="Baumanzahl in der Gruppe"
              value={treecluster?.trees?.length 
                ? `${treecluster.trees.length} ${treecluster.trees.length > 1 ? 'Bäume' : 'Baum'}` 
                : 'Keine Bäume'}
              description="Nicht alle Bäume haben Sensoren, da Rückschlüsse möglich sind."/>
          </li>
          <li>
            <GeneralStatusCard 
              overline="Standort der Gruppe"
              value={`${treecluster?.address}, ${treecluster?.region.name}`} />
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold font-lato mb-10">Alle zugehörigen Bäume</h2>

        <header className="hidden border-b pb-2 text-sm text-dark-800 px-6 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,2fr,1fr,1fr] lg:gap-5">
          <p>Status</p>
          <p>Baumart</p>
          <p>Baumnummer</p>
        </header>

        <ul className="space-y-5">
          {treecluster?.trees.length === 0 ? (
            <li className="text-center text-dark-600 mt-4">
              <p>Der Bewässerungsgruppe wurden keine Bäume hinzugefügt.</p>
            </li>
          ) : (
            treecluster?.trees.map((tree, key) => (
              <li key={key}>
                <TreeCard tree={tree}/>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  )
}
