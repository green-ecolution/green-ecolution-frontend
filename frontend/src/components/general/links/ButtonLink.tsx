import { Link } from '@tanstack/react-router';
import { MoveRight } from 'lucide-react';
import React from 'react';

interface ButtonLink {
  label: string;
  url: string;
  asButton?: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ButtonLink: React.FC<ButtonLink> = ({ label, icon: Icon = MoveRight, url }) => (
  <Link 
    to={url}
    className="bg-green-dark w-fit text-white px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:bg-green-light"
  >
    {label}
    {Icon && <Icon />}
  </Link>
);

export default ButtonLink;
