import { AlignJustifyIcon } from 'lucide-react';
import * as React from 'react';
import MainNavigation from './MainNavigation';

function Header() {
  const [open, setOpen] = React.useState(false);

  function toggleNavigation(state: boolean) {
    setOpen(state);
}

  return (
    <header className="bg-white w-screen">
      <div className="custom-container text-sm border-b border-dark-50 py-4 flex justify-between items-center">
        <button
          id="main-navigation-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-haspopup="menu"
          aria-label="Hauptnavigation öffnen"
          className="w-8 h-8 flex items-center justify-center bg-dark rounded-full transition-colors ease-in-out duration-300 hover:bg-dark-600"
          onClick={() => toggleNavigation(!open)}
        >
          <AlignJustifyIcon className="text-light w-5 h-5" />
        </button>
      </div>

      <MainNavigation isOpen={open} onClose={() => toggleNavigation(false)}/>
    </header>
  );
}

export default Header;
