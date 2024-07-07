import useSidePanelStore from "@/store/sidePanelStore";
import {
  Book,
  Calendar,
  LayoutDashboard,
  MapPin,
  PanelLeftOpen,
  PanelRightOpen,
  Settings,
  TreeDeciduous,
  Truck,
  User,
  Waypoints,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface SideHeaderProps {
  className?: string;
  width?: string;
  open: boolean;
}

const SideHeader = ({ open, className }: SideHeaderProps) => {
  if (!open) {
    return <></>;
  }

  const items = [
    {
      title: "Karte",
      icon: <MapPin className="w-5 h-5" />,
      to: "/",
    },
    {
      title: "Einsatzplanung",
      icon: <Waypoints className="w-5 h-5" />,
      to: "/waypoints",
    },
    {
      title: "HX-Lab Tree",
      icon: <TreeDeciduous className="w-5 h-5" />,
      to: "/dashboard/tree/6686f54fd32cf640e8ae6eb1",
    },
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      to: "/dashboard",
    },
    {
      title: "Team",
      icon: <User className="w-5 h-5" />,
      to: "/team",
    },
    {
      title: "Kalender",
      icon: <Calendar className="w-5 h-5" />,
      to: "/calendar",
    },
    {
      title: "Fahrzeuge",
      icon: <Truck className="w-5 h-5" />,
      to: "/vehicles",
    },
    {
      title: "Einstellungen",
      icon: <Settings className="w-5 h-5" />,
      to: "/settings",
    },
  ];

  return (
    <div className={cn("z-50 h-screen bg-white rounded shadow", className)}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center h-12 mx-2">
          <div className="flex items-center">
            <img className="h-6" src="/logo-large-color.svg" alt="logo" />
            <h1 className="font-bold text-xl ml-3">Green Ecolution</h1>
          </div>
        </div>
        <Separator />
        <div className="ml-2 flex flex-col gap-2">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="flex items-center gap-2 p-2 hover:bg-muted hover:cursor-pointer"
            >
              <div>{item.icon}</div>
              <div>{item.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SidePanelButton = () => {
  const { isPanelOpen, toggleSidePanel } = useSidePanelStore((state) => {
    return {
      isPanelOpen: state.isOpen,
      toggleSidePanel: state.toggle,
    };
  });

  const handleToggleSidePanel = () => {
    toggleSidePanel();
  };

  return (
    <Button variant="ghost" size="icon" onClick={() => handleToggleSidePanel()}>
      {isPanelOpen ? (
        <PanelRightOpen className="w-5 h-5" />
      ) : (
        <PanelLeftOpen className="w-5 h-5" />
      )}
    </Button>
  );
};

export default SideHeader;
