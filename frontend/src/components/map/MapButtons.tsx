import { Settings, TreeDeciduous } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";

export interface MapButtonsProps extends React.PropsWithChildren {}

const MapButtons = ({ children }: MapButtonsProps) => {
  return (
    <div className="absolute z-[1000] space-y-2 top-6 left-4 lg:left-10 lg:top-10">
      <div className="flex space-x-2">
        {children !== undefined ? children : <DefaultMapButtons />}
      </div>
    </div>
  );
};

const DefaultMapButtons = () => {
  return (
    <>
      {/* <FilterButton ariaLabel="Filter" activeCount={0} onClick={() => {}} /> */}
      <SettingsButton />
      <AddTreeButton />
    </>
  );
};

export const SettingsButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`bg-white shadow-cards w-10 h-10 rounded-full flex items-center justify-center transition-all ease-in-out duration-300`}
        >
          <Settings className="w-6 h-6 text-dark-800" />
        </button>
      </TooltipTrigger>
      <TooltipContent>Einstellungen</TooltipContent>
    </Tooltip>
  );
};

export const AddTreeButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to="/map/tree/new" preload="intent" search={(prev) => prev}>
          <button
            className={`bg-white shadow-cards w-10 h-10 rounded-full flex items-center justify-center transition-all ease-in-out duration-300`}
          >
            {/* TODO: Find a better icon */}
            <TreeDeciduous className="w-6 h-6 text-dark-800" />
          </button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>Neuen Baum erfassen</TooltipContent>
    </Tooltip>
  );
};

export default MapButtons;
