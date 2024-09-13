import { ChevronDown, LogOut, Settings } from "lucide-react";
import useStore from '@/store/store';
import { useState } from "react";
import NavLink from "../navigation/NavLink";
import useOutsideClick from "@/hooks/useOutsideClick";

function ProfileButton() {
  const [open, setOpen] = useState(false);
  const user = useStore((state) => state.user);
  const overlayRef = useOutsideClick<HTMLDivElement>(() => toggleOverlay(false));
  const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  const links = [
    {
      label: "Dein Profil",
      icon: <Settings className="w-5 h-5" />,
      to: "/profile",
    },
    {
      label: "Ausloggen",
      icon: <LogOut className="w-5 h-5" />,
      to: "/logout",
    },
  ]

  function toggleOverlay(state: boolean) {
    setOpen(state);
  }

  return (
    <div className="relative" ref={overlayRef}>
      <button
        aria-label="Profilinformationen anzeigen"
        aria-expanded={open}
        aria-controls="profile-informations"
        aria-haspopup="grid"
        className="group flex items-center gap-x-1"
        onClick={() => toggleOverlay(!open)}
      >
        <p className="bg-green-dark leading-none text-white font-semibold rounded-full w-10 h-10 flex items-center justify-center transition-color ease-in-out duration-300 group-hover:bg-green-light">
          {userInitials}
        </p>
        <ChevronDown className={`w-5 h-5 text-dark transition-all ease-in-out duration-300 ${open ? 'rotate-180' : ''}`}/>
      </button>

      <div
        id="profile-informations"
        className={`bg-dark shadow-cards max-w-72 z-50 text-sm text-white pt-5 px-2 right-0 rounded-lg absolute top-14 ${open ? "block" : "hidden"}`}
      >
        <p className="border-b border-b-dark-800 mx-3 pb-4">
          Angemeldet als:<br />
          <strong className="block truncate">{user.email}</strong>
        </p>

        <ul className="py-2">
          {links.map((link, key) => (
            <NavLink
                key={key}
                label={link.label}
                icon={link.icon}
                url={link.to}
                navIsOpen={true}
                closeSidebar={() => toggleOverlay(false)}
              />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
