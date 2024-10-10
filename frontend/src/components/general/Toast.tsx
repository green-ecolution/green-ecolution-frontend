import { Check } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ToastProps {
  label: string;
}

const Toast: React.FC<ToastProps> = ({ label }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { 
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-x-4 mx-auto bottom-10 bg-dark text-white rounded-[1.875rem] grid grid-cols-[1.5fr,auto] items-center gap-x-4 pr-4 pl-2.5 py-2.5 w-fit transition-all ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } duration-300 ease-in-out`}
    >
      <figure
        aria-hidden="true"
        className="relative bg-green-light w-6 h-6 rounded-full flex items-center justify-center before:w-8 before:h-8 before:absolute before:bg-green-light/50 before:rounded-full before:-z-10"
      >
        <Check className="w-4 h-4" />
      </figure>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};

export default Toast;
