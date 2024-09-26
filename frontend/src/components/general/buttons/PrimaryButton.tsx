import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;  // Optional icon prop
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, icon, ...props }) => (
  <button
    {...props}
    className={`bg-green-dark text-white px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:bg-green-light ${props.className}`}
  >
    <span className="font-medium">{label}</span>

    {/* Render the icon if it's provided */}
    {icon && <span className="transition-all ease-in-out duration-300 group-hover:translate-x-2">{icon}</span>}
  </button>
);

export default PrimaryButton;
