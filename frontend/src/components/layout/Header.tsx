import { AlignJustifyIcon } from 'lucide-react';
import * as React from 'react';
import Navigation from './Navigation';

function Header() {
  const [open, setOpen] = React.useState(false);

  function toggleSidebar(state: boolean) {
    setOpen(state);

    if (window.matchMedia('(min-width: 1024px)')) return;
    state
    ? document.body.classList.add('overflow-y-hidden')
    : document.body.classList.remove('overflow-y-hidden');
  }

  return (
    <header className="bg-white lg:pl-20">
      <div className="container text-sm border-b border-dark-50 py-4 flex justify-between items-center">
        <button
          id="main-navigation-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-haspopup="menu"
          aria-label="Hauptnavigation öffnen"
          className="w-8 h-8 flex items-center justify-center bg-dark rounded-full transition-colors ease-in-out duration-300 hover:bg-dark-600 lg:hidden"
          onClick={() => toggleSidebar(!open)}
        >
          <AlignJustifyIcon className="text-light w-5 h-5" />
        </button>
        <strong className="hidden lg:block">Breadcrumb</strong>
      </div>

      <Navigation 
        isOpen={open} 
        openSidebar={() => toggleSidebar(true)} 
        closeSidebar={() => toggleSidebar(false)} />
    </header>
  );
}

export default Header;
