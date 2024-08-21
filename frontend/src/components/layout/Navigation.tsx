import { ArrowLeftRight, Car, FolderClosed, HardDrive, LogOut, Map, PieChart, Settings, Users} from 'lucide-react';
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

  const vegetationLinks = [
    {
      label: 'Baumkataster',
      icon: <Map className="w-5 h-5" />,
      to: "/",
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
  ];

  const routeLinks = [
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
  ];

  const otherLinks = [
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
      label: 'Ausloggen',
      icon: <LogOut className="w-5 h-5" />,
      to: "/logout",
    },
  ];

  return (
    <nav
      id="main-navigation"
      aria-label="Hauptnavigation"
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      onFocusCapture={handleMouseOver}
      className={`fixed inset-0 z-50 bg-dark w-screen overflow-hidden h-screen transition-all ease-in-out duration-300
        ${isOpen ? 'visible block left-0 lg:w-[17rem] lg:rounded-r-xl' : 'invisible -left-full lg:visible lg:w-[5rem] lg:left-0'}`}
    >
      <div className="relative px-4 py-5 h-full overflow-y-auto no-scrollbar">
        <NavHeader 
          isOpen={isOpen} 
          closeSidebar={closeSidebar} />
        
        <NavHeadline label="Grünflächen" navIsOpen={isOpen} />
        <ul className="mb-10">
          {vegetationLinks.map((link, key) => (
            <NavLink 
              key={key}
              label={link.label} 
              icon={link.icon} 
              url={link.to} 
              navIsOpen={isOpen} />
          ))}
        </ul>

        <NavHeadline label="Einsatzplanung" navIsOpen={isOpen} />
        <ul className="mb-10">
          {routeLinks.map((link, key) => (
            <NavLink 
              key={key}
              label={link.label} 
              icon={link.icon} 
              url={link.to}
              navIsOpen={isOpen} />
          ))}
        </ul>

        <NavHeadline label="Weiteres" navIsOpen={isOpen} />
        <ul className="mb-10">
          {otherLinks.map((link, key) => (
            <NavLink 
              key={key}
              label={link.label} 
              icon={link.icon} 
              url={link.to}
              navIsOpen={isOpen} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
