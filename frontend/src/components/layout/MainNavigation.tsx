import { ArrowLeftRight, Car, FolderClosed, HardDrive, LogOut, Map, PieChart, Settings, Users, X } from 'lucide-react';
import * as React from 'react';
import NavLink from '../general/NavLink';
import NavHeadline from '../general/NavHeadline';

interface MainNavigationProps {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ isOpen, openSidebar, closeSidebar }) => {

  const vegetationLinks = [
    {
      label: 'Baumkataster',
      icon: <Map className="w-5 h-5" />,
      to: "/",
    },
    {
      label: 'Baumgruppen',
      icon: <FolderClosed className="w-5 h-5" />,
      to: "/",
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
      to: "/",
    },
    {
      label: 'Auswertungen',
      icon: <PieChart className="w-5 h-5" />,
      to: "/",
    },
    {
      label: 'Einstellungen',
      icon: <Settings className="w-5 h-5" />,
      to: "/settings",
    },
    {
      label: 'Ausloggen',
      icon: <LogOut className="w-5 h-5" />,
      to: "/",
    },
  ];

  return (
    <nav
      id="main-navigation"
      aria-label="Hauptnavigation"
      onMouseOut={closeSidebar}
      onMouseOver={openSidebar}
      className={`fixed inset-0 z-50 bg-dark w-screen overflow-hidden h-screen transition-all ease-in-out duration-300
        ${isOpen ? 'visible block left-0 lg:w-[17rem] lg:rounded-r-xl' : 'invisible -left-full lg:visible lg:w-[5rem] lg:left-0'}`}
    >
      <div className="relative px-4 py-5 h-full overflow-y-auto no-scrollbar">
        <div className="relative mb-10 flex items-center justify-between">
          <figure>
            <img 
              className="h-4 lg:hidden" 
              src="/images/logo/logo-large-white.svg" 
              alt="Logo von Green Ecolution" />
            <img 
              className="hidden w-7 mx-2.5 lg:block" 
              src="/images/logo/logo-icon-white.svg" 
              alt="Logo von Green Ecolution" />
          </figure>
          <button
            aria-label="Hauptnavigation schließen" 
            className={`mr-2 w-8 h-8 flex items-center justify-center transition-colors ease-in-out duration-300 bg-dark-600 rounded-full lg:hidden 
              ${isOpen ? 'lg:flex' : 'lg:hidden'}`}
            onClick={closeSidebar}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
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

export default MainNavigation;