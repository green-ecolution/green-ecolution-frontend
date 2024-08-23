import { createFileRoute, Link } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {

  const cards = [
    {
      url: '/treecluster',
      description: 'Listenansicht aller gruppierten Bäume, die mit Sensoren ausgestattet sind.',
      headline: 'Auflistung der Baumgruppen',
      linkLabel: 'Zu den Baumgruppen',
    },
    {
      url: '/map',
      description: 'Alle Bäume in Flensburg im Zuständigkeitsbereich des TBZ.',
      headline: 'Kataster',
      linkLabel: 'Zum Kataster',
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
          Willkommen zurück, Vorname Nachname!
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
            <Link 
              to={card.url}
              aria-label={card.linkLabel}
              className={`shadow-card p-6 rounded-xl group flex flex-col gap-4 transition-all ease-in-out duration-300 border 
                ${key % 2 !== 0 ? 'border-green-dark bg-green-dark-50 hover:bg-green-dark-100' : 'border-green-light bg-green-light-50 hover:bg-green-light-100'} `}
            >
              <h3 className="font-lato text-lg text-dark font-semibold">{card.headline}</h3>
              <p>{card.description}</p>
              <p className="font-lato font-semibold text-green-dark flex items-center gap-x-2">
                <span>{card.linkLabel}</span>
                <MoveRight className="transition-all ease-in-out duration-300 group-hover:translate-x-2"/>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
