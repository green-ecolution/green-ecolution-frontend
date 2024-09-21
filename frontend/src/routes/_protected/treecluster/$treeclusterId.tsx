import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard';
import WateringStatusCard from '@/components/general/cards/WateringStatusCard';
import { treeclusterDemoData } from '@/data/treecluser';
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/treecluster/$treeclusterId')({
  component: SingleTreecluster,

  loader: async ({ params }) => {
    const treeclusterId = parseInt(params.treeclusterId);
    return treeclusterDemoData().find(cluster => cluster.id === treeclusterId);
  },
})

function SingleTreecluster() {

  const treecluster = useLoaderData({ from: '/_protected/treecluster/$treeclusterId'});
  if (!treecluster) {
    return <div>Tree cluster not found</div>;
  }

  const location = `${treecluster.address}, ${treecluster.region}`;

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          {treecluster.name}
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
              value="38 Bäume | 3 mit Sensoren"
              description="Nicht alle Bäume in der Gruppe haben Sensoren, da die gemessenen Werte Rückschlüsse zulassen"/>
          </li>
          <li>
            <GeneralStatusCard 
              overline="Standort der Gruppe"
              value={location} />
          </li>
        </ul>
      </section>
    </div>
  )
}