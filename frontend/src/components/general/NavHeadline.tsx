import React from 'react';

interface NavHeadline {
    label: string;
    navIsOpen?: boolean;
}

const NavHeadline: React.FC<NavHeadline> = ({ label, navIsOpen = false }) => {
    return (
      <p className={`mb-3 font-bold text-sm text-dark-400 tracking-[0.3] ${navIsOpen ? 'lg:block' : 'lg:hidden'} `}>
        {label}
      </p>
    );
}

export default NavHeadline;