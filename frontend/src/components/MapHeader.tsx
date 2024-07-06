import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToggleSidePanel } from "@/store/sidePanelStore";

export interface HeaderProps { }

const MapHeader = ({ }: HeaderProps) => {
  const toggleMenu = useToggleSidePanel();

  const handleToggleMenu = () => {
    toggleMenu();
  };

  return (
    <Card className="z-50 absolute top-4 left-4 w-[350px] h-12 bg-white rounded shadow-lg">
      <div className="flex justify-between items-center h-full mx-2">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleToggleMenu()}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <PlaceholderIcon />
          <PlaceholderIcon />
          <PlaceholderIcon />
        </div>
      </div>
    </Card>
  );
};

export const PlaceholderIcon = () => {
  return (
    <div className="flex items-center">
      <div className="h-8 w-8 bg-gray-200 rounded-xl"></div>
    </div>
  );
};

export default MapHeader;
