import React, { ReactNode } from 'react';

interface NavLink {
    label: string;
    url: string;
    icon: ReactNode;
    isExternalLink?: boolean;
    isActive?: boolean;
    navIsOpen?: boolean;
}

const NavLink: React.FC<NavLink> = ({ label, url, icon, isExternalLink = false, isActive = false, navIsOpen = false }) => {
    return (
      <li>
        <a 
          href={url}
          target={isExternalLink ? '_blank' : '_self'} 
          className={`text-light text-base flex items-center gap-x-3 p-3 rounded-2xl transition-colors ease-in-out duration-300 hover:bg-green-light/20 hover:text-green-light-200
            ${isActive ? 'border border-green-dark bg-green-dark/30' : ''} `}
        >
          {icon}
          <span className={`font-lato font-semibold tracking-[0.1] transition-all ease-in-out duration-300 ${navIsOpen ? 'lg:opacity-full lg:block' : 'lg:opacity-0 lg:hidden'}`}>{label}</span>
        </a>
      </li>
    );
}

export default NavLink;