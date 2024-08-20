import { ArrowLeftRight, Car, FolderClosed, HardDrive, LogOut, Map, PieChart, Settings, Users, X } from 'lucide-react';
import * as React from 'react';
import NavLink from '../general/NavLink';
import NavHeadline from '../general/NavHeadline';

interface MainNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ isOpen, onClose }) => {

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
      to: "/",
    },
    {
      label: 'Fahrzeuge',
      icon: <Car className="w-5 h-5" />,
      to: "/",
    },
    {
      label: 'Mitarbeitenden',
      icon: <Users className="w-5 h-5" />,
      to: "/",
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
      to: "/",
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
      className={`fixed inset-0 z-50 bg-dark w-screen overflow-hidden h-screen transition-all ease-in-out duration-300
        ${isOpen ? 'visible block right-0 lg:w-[17rem]' : 'invisible -right-full lg:visible lg:w-[5rem]'}`}
    >
      <div className="px-4 py-5 h-full overflow-y-auto no-scrollbar">
        <div className="mb-10 flex items-center justify-between">
          <figure className="lg:mx-auto">
            <img 
              className="h-4 lg:hidden" 
              src="/images/logo/logo-large-white.svg" 
              alt="Logo von Green Ecolution" />
            <img 
              className="hidden w-7 lg:block" 
              src="/images/logo/logo-icon-white.svg" 
              alt="Logo von Green Ecolution" />
          </figure>
          <button
            aria-label="Hauptnavigation schließen" 
            className="text-light transition-colors ease-in-out duration-300 hover:text-dark-400 mr-2 lg:hidden"
            onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <NavHeadline label="Grünflächen" navIsOpen={isOpen} />
        <ul className={`mb-10 ${isOpen ? 'lg:mb-10' : 'lg:mb-6'}`}>
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
        <ul className={`mb-10 ${isOpen ? 'lg:mb-10' : 'lg:mb-6'}`}>
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
        <ul className={`mb-10 ${isOpen ? 'lg:mb-10' : 'lg:mb-6'}`}>
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