import DashboardCard from '@/components/general/cards/DashboardCard';
import { createFileRoute } from '@tanstack/react-router'
import useStore from '@/store/store';

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const user = useStore((state) => state.user);

  const cards = [
    {
      url: '/map',
      description: 'Alle Bäume in Flensburg im Zuständigkeitsbereich des TBZ.',
      headline: 'Kataster',
      linkLabel: 'Zum Kataster',
    },
    {
      url: '/treecluster',
      description: 'Listenansicht aller gruppierten Bäume, die mit Sensoren ausgestattet sind.',
      headline: 'Auflistung der Bewässerungsgruppen',
      linkLabel: 'Zu den Bewässerungsgruppen',
    },
    {
      url: '/sensors',
      description: 'Zeigt alle verbauten Sensoren in Flensburg inkl. Akkustand, Standort …',
      headline: 'Liste aller verbauten Sensoren',
      linkLabel: 'Zu den Sensoren',
    },
    {
      url: '/waypoints',
      description: 'Planung eines neuen Einsatzes zur Bewässerung von Baumgruppen',
      headline: 'Einsatzplanung',
      linkLabel: 'Zur Einsatzplanung',
    },
    {
      url: '/settings',
      description: 'Hier können Sie Einstellungen vornehmen, da Sie Administrator sind.',
      headline: 'Einstellungen',
      linkLabel: 'Zur Einsatzplanung',
    },
    {
      url: '/profile',
      description: 'Hier können persönliche Informationen hinterlegt und angepasst werden.',
      headline: 'Eigenes Profil',
      linkLabel: 'Zum Profil',
    },
  ];

  return (
    <div className="container mt-6">
      <article className="mb-10 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Willkommen zurück, {`${user.firstName} ${user.lastName}`}!
        </h1>
        <p>
          Labore id duis minim nisi duis incididunt. Aliqua qui dolor laborum anim aliquip sit nulla eiusmod laboris excepteur sit non laboris do.
          Occaecat exercitation dolor irure fugiat ullamco elit cupidatat commodo fugiat consectetur. 
          Nisi id officia ullamco tempor anim quis duis proident culpa laborum.
        </p>
      </article>

      <h2 className="text-sm font-semibold text-dark-800 mb-4">
        Schnellverweise
      </h2>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, key) => (
          <li key={key}>
            <DashboardCard 
              headline={card.headline}
              description={card.description}
              linkLabel={card.linkLabel}
              url={card.url}
              theme={key % 2 ? "dark" : "light"} />
          </li>
        ))}
      </ul>
    </div>
  )
}
