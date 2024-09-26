import { Link } from '@tanstack/react-router';
import { MoveRight } from 'lucide-react';
import React from 'react';

interface GeneralLink {
  label: string;
  url: string;
}

const GeneralLink: React.FC<GeneralLink> = ({ label, url }) => (
  <Link to={url} className="group flex items-center gap-x-2 text-green-dark font-medium text-base mb-4">
    {label}
    <MoveRight className="w-4 h-4 transition-all ease-in-out duration-300 group-hover:translate-x-1" />
  </Link>
);

export default GeneralLink;
