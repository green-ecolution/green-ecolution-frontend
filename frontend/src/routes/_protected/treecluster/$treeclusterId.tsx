import { treeApi } from '@/api/backendApi';
import EntitiesStatusCard from '@/components/general/cards/EntitiesStatusCard';
import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard';
import TreeCard from '@/components/general/cards/TreeCard';
import BackLink from '@/components/general/links/BackLink';
import { treeclusterDemoData } from '@/data/treecluser';
import { useAuthHeader } from '@/hooks/useAuthHeader';
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { treeDemoData } from '@/data/trees';

export const Route = createFileRoute('/_protected/treecluster/$treeclusterId')({
  component: SingleTreecluster,

  loader: async ({ params }) => {
    const treeclusterId = parseInt(params.treeclusterId);
    const treecluster = treeclusterDemoData().find(cluster => cluster.id === treeclusterId);
    return {
      ...treecluster,
    };
  },

  meta: ({ params }) => {
    const treeclusterId = parseInt(params.treeclusterId);
    const treecluster = treeclusterDemoData().find(cluster => cluster.id === treeclusterId);
    return [
      {
        title: 'Bewässerungsgruppen',
        path: '/treecluster',
      },
      {
        title: treecluster ? treecluster.name : 'Kein Titel vorhanden',
        path: `/treecluster/${treeclusterId}`,
      },
    ];
  },
});


function SingleTreecluster() {
<<<<<<< HEAD
  const treecluster = useLoaderData({ from: '/_protected/treecluster/$treeclusterId'});
  const authorization = useAuthHeader();

  // TODO: delete if real tree cluster data is used
  const { data: treeRes } = useQuery({
    queryKey: ["trees"],
    queryFn: () => treeApi.getAllTrees({ authorization }),
  });
=======
  const trees = treeDemoData();
  const treecluster = useLoaderData({ from: '/_protected/treecluster/$treeclusterId' });

  if (!treecluster) {
    return <div>Tree cluster not found</div>;
  }
>>>>>>> 42b8a23 (refactor: Made Breadcrumb Hook more generic, added meta data to routes)

  const location = `${treecluster.address}, ${treecluster.region}`;
  const treeCount = `${treecluster.treeCount} Bäume | ${treecluster.sensorCount} mit Sensoren`;

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <BackLink
          url="/treecluster"
          label="Zu allen Bewässerungsgruppen" />
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Bewässerungsgruppe: {treecluster.name}
        </h1>
        {treecluster.description
          ? (<p>{treecluster.description}</p>)
          : (<p>Zu dieser Bewässerungsgruppe ist keine Beschreibung vorhanden.</p>)
        }
      </article>

      <section className="mt-10">
        <ul className="space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <li>
            <EntitiesStatusCard
              statusDetails={getWateringStatusDetails(treecluster.status)}
              label="Bewässerungszustand (ø)" />
          </li>
          <li>
            <GeneralStatusCard
              overline="Baumanzahl in der Gruppe"
              value={treeCount}
              description="Nicht alle Bäume haben Sensoren, da Rückschlüsse möglich sind."/>
          </li>
          <li>
            <GeneralStatusCard
              overline="Standort der Gruppe"
              value={location} />
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
          {treeRes?.data.length === 0 ? (
            <li className="text-center text-dark-600 mt-4">
              <p>Der Bewässerungsgruppe wurden keine Bäume hinzugefügt.</p>
            </li>
          ) : (
            treeRes?.data.map((tree, key) => (
              <li key={key}>
                <TreeCard tree={tree}/>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default SingleTreecluster;
