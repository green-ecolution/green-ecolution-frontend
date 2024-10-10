import { MoveRight } from 'lucide-react';
import React from 'react';

interface LinkAsButtonProps {
  onClick: () => void;
  label: string;
}

const LinkAsButton: React.FC<LinkAsButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-x-2 text-red font-medium text-base mb-4">
    {label}
    <MoveRight className="w-4 h-4 transition-all ease-in-out duration-300 group-hover:translate-x-1" />
  </button>
);

export default LinkAsButton;
