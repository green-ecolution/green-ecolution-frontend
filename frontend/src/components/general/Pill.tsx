import React from 'react';

interface PillProps {
  label: string;
}

const Pill: React.FC<PillProps> = ({ label }) => (
  <span className="text-sm text-green-dark font-semibold bg-green-light-200 border border-green-light rounded-full px-3 py-0.5">
    {label}
  </span>
);

export default Pill;
