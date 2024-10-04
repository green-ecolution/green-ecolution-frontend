import { createFileRoute } from "@tanstack/react-router";
import DashboardCard from "@/components/general/cards/DashboardCard";

export const Route = createFileRoute("/_protected/settings/")({
  component: Settings,
});

function Settings() {
  const cards = [
    {
      url: '/settings/import',
      description: 'Um die Bäume im Kataster zu aktualisieren' +
        'können die Bäume mithilde einer CSV-Datei neu importiert werden.',
      headline: 'Kataster neu importieren',
      linkLabel: 'Neuen Import anstoßen',
    }

  ];

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Ihre persönlichen Einstellungen
        </h1>
        <p>
          Eu ipsum occaecat non exercitation occaecat ea aute fugiat quis magna do veniam commodo.
          Magna Lorem cupidatat id fugiat nostrud quis qui in quis fugiat. Irure pariatur anim cupidatat nulla ipsum Lorem irure.
          Est elit laborum sunt commodo officia nulla cupidatat fugiat tempor exercitation laborum. Sint irure eiusmod sunt.
          Magna esse proident magna dolore aliqua nulla id sunt adipisicing.
        </p>
      </article>

      <ul className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, key) => (
          <li key={key}>
            <DashboardCard
              headline={card.headline}
              description={card.description}
              linkLabel={card.linkLabel}
              url={card.url}
              theme="white"/>
          </li>
        ))}
      </ul>
    </div >
  );
}
