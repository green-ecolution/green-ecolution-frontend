function Footer() {
  const navItems = [
    {
      url: 'mailto:info@green-ecolution.de',
      label: 'Kontakt',
    },
    {
      url: 'https://hs-flensburg.de/impressum',
      label: 'Impressum',
    },
    {
      url: 'https://hs-flensburg.de/datenschutz',
      label: 'Datenschutz',
    },
  ];

  return (
    <footer className="bg-white lg:pl-20">
      <div className="custom-container text-sm border-t border-dark-50 py-4 lg:flex lg:justify-between lg:items-center">
        <p className="text-dark-400 mb-5 lg:mb-0">
          Diese Webseite wurde im Rahmen eines Forschungsprojektes der Hochschule Flensburg erstellt.
        </p>
        <nav aria-label="Fußnavigation">
          <ul className="flex flex-wrap gap-x-4">
            {navItems.map((navItem, key) => (
              <li key={key}>
                <a href={navItem.url} target="_blank" className="text-dark-600 transition-all ease-in-out hover:text-dark-800">
                  {navItem.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;