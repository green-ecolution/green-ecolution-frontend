import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard';
import TreeCard from '@/components/general/cards/TreeCard';
import WateringStatusCard from '@/components/general/cards/WateringStatusCard';
import BackLink from '@/components/general/links/BackLink';
import { treeclusterDemoData } from '@/data/treecluser';
import { treeDemoData } from '@/data/trees';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/treecluster/$treeclusterId')({
  component: SingleTreecluster,

  loader: async ({ params }) => {
    const treeclusterId = parseInt(params.treeclusterId);
    return treeclusterDemoData().find(cluster => cluster.id === treeclusterId);
  },
})

function SingleTreecluster() {

  const trees = treeDemoData();

  const treecluster = useLoaderData({ from: '/_protected/treecluster/$treeclusterId'});
  if (!treecluster) {
    return <div>Tree cluster not found</div>;
  }

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
        <ul className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-5">
          <li>
            <WateringStatusCard
              wateringStatus={treecluster.status} />
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
        <h2 className="text-xl font-bold font-lato mb-6">Alle zugehörigen Bäume</h2>
        <ul className="space-y-5">
          {trees.length === 0 ? (
            <li className="text-center text-dark-600 mt-4">
              <p>Der Bewässerungsgruppe wurden keine Bäume hinzugefügt.</p>
            </li>
          ) : (
            trees.map((tree, key) => (
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
