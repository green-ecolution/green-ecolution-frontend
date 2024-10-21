import DashboardCard from "../general/cards/DashboardCard";

const QuickLinks = () => {
  // TODO: link to not protected routes
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
  ];

  return (
    <section className="container border-t border-t-dark-100 pt-10 mt-20 lg:pt-28 lg:mt-28">
      <article className="text-center max-w-screen-lg mx-auto">
        <h2 className="font-bold font-lato text-xl mb-6 lg:text-3xl">
          Öffentliche Daten ansehen:
        </h2>
        <p className="mb-6 lg:mb-10">
          Konnten Ihre Fragen nicht beantwortet werden oder benötigen
          Sie weitere Informationen? Bei Fragen, Anregungen oder
          Anliegen können Sie uns gern kontaktieren. Unser Team wird
          sich schnellstmöglich bei Ihnen melden.
        </p>
      </article>
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
    </section>
  );
};

export default QuickLinks;
