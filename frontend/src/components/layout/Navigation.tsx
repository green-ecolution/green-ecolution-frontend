import { ArrowLeftRight, Bug, Car, FolderClosed, HardDrive, Info, LogOut, Map, PieChart, Settings, Users } from 'lucide-react';
import * as React from 'react';
import NavLink from '../navigation/NavLink';
import NavHeadline from '../navigation/NavHeadline';
import NavHeader from '../navigation/NavHeader';

interface NavigationProps {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, openSidebar, closeSidebar }) => {
  const isLargeScreen = () => window.matchMedia('(min-width: 1024px)').matches;

  const handleMouseOver = () => {
    if (isLargeScreen()) openSidebar();
  };

  const handleMouseOut = () => {
    if (isLargeScreen()) closeSidebar();
  };

  const handleNavLinkClick = () => {
    if (!isLargeScreen()) closeSidebar();
  };

  const navigationLinks = [
    {
      headline: 'Grünflächen',
      links: [
        {
          label: 'Baumkataster',
          icon: <Map className="w-5 h-5" />,
          to: "/map",
        },
        {
          label: 'Baumgruppen',
          icon: <FolderClosed className="w-5 h-5" />,
          to: "/treecluster",
        },
        {
          label: 'Beete',
          icon: <FolderClosed className="w-5 h-5" />,
          to: "/",
        },
      ],
    },
    {
      headline: 'Einsatzplanung',
      links: [
        {
          label: 'Einsätze',
          icon: <ArrowLeftRight className="w-5 h-5" />,
          to: "/waypoints",
        },
        {
          label: 'Fahrzeuge',
          icon: <Car className="w-5 h-5" />,
          to: "/vehicles",
        },
        {
          label: 'Mitarbeitenden',
          icon: <Users className="w-5 h-5" />,
          to: "/team",
        },
      ],
    },
    {
      headline: 'Weiteres',
      links: [
        {
          label: 'Sensoren',
          icon: <HardDrive className="w-5 h-5" />,
          to: "/sensors",
        },
        {
          label: 'Auswertungen',
          icon: <PieChart className="w-5 h-5" />,
          to: "/evaluations",
        },
        {
          label: 'Einstellungen',
          icon: <Settings className="w-5 h-5" />,
          to: "/settings",
        },
        {
          label: 'Debug',
          icon: <Bug className="w-5 h-5" />,
          to: "/debug",
        },
        {
          label: 'Ausloggen',
          icon: <LogOut className="w-5 h-5" />,
          to: "/logout",
        },
      ],
    },
  ];

  return (
    <nav
      id="main-navigation"
      aria-label="Hauptnavigation"
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      className={`fixed inset-0 z-50 bg-dark w-screen overflow-hidden h-screen transition-all ease-in-out duration-300
        ${isOpen ? 'visible block left-0 lg:w-[17rem] lg:rounded-r-xl' : 'invisible -left-full lg:visible lg:w-[5rem] lg:left-0'}`}
    >
      <div className="relative px-4 py-5 h-full overflow-y-auto no-scrollbar">
        <NavHeader 
          isOpen={isOpen} 
          closeSidebar={closeSidebar} />
        
        {navigationLinks.map((section, index) => (
          <React.Fragment key={index}>
            <NavHeadline label={section.headline} navIsOpen={isOpen} />
            <ul className="mb-10">
              {section.links.map((link, key) => (
                <NavLink 
                  key={key}
                  label={link.label} 
                  icon={link.icon} 
                  url={link.to}
                  navIsOpen={isOpen} 
                  closeSidebar={handleNavLinkClick}
                />
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
