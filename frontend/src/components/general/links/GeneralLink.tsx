import { Link, LinkProps } from '@tanstack/react-router';
import { MoveRight } from 'lucide-react';
import React from 'react';

interface GeneralLink {
  label: string;
  link: LinkProps;
}

const GeneralLink: React.FC<GeneralLink> = ({ label, link }) => (
  <Link {...link} className="group flex items-center gap-x-2 text-green-dark font-medium text-base">
    {label}
    <MoveRight className="w-4 h-4 transition-all ease-in-out duration-300 group-hover:translate-x-1" />
  </Link>
);

export default GeneralLink;
