import { Card } from "@/components/ui/card";
import { SidePanelButton } from "./Sidebar";
import { Button } from "./ui/button";
import {
  Filter,
  LocateFixed,
  MoreVertical,
  Printer,
  Search,
  Truck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  useDisplayFakeTrees,
  useToggleDisplayFakeTrees,
} from "@/store/mapStore";
import { Link } from "@tanstack/react-router";

export interface HeaderProps { }

const MapHeader = ({ }: HeaderProps) => {
  return (
    <Card className="z-50 absolute top-4 left-4 h-12 w-[350px] bg-white rounded shadow-lg">
      <div className="flex justify-between items-center h-full mx-2">
        <div className="flex items-center gap-1">
          <SidePanelButton />
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Filter className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Printer className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <LocateFixed className="size-5" />
          </Button>
          <MapMoreActions />
        </div>
      </div>
    </Card>
  );
};

export const MapMoreActions = () => {
  const displaFakeTrees = useDisplayFakeTrees();
  const toggleDisplayFakeTrees = useToggleDisplayFakeTrees();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Weitere Aktionen</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem >
            <Link to="/waypoints/new" className="flex items-center gap-1">
              <Truck className="size-5" />
              Neue Einsatzplanung
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem
            checked={displaFakeTrees}
            onCheckedChange={toggleDisplayFakeTrees}
          >
            Demo-Bäume anzeigen
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
