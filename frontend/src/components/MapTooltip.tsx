import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Cross, LayoutDashboard, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export interface MapTooltipProps {
  open: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void;
}

const MapTooltip = ({
  open,
  title,
  description,
  children,
  onClose,
}: MapTooltipProps) => {
  if (!open) {
    return <></>;
  }

  return (
    <Card className="z-50 absolute bottom-2 left-2 w-[350px]">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            {title}
            <div>
              <Link
                to="/dashboard/tree/$treeId"
                params={{ treeId: "6686f54fd32cf640e8ae6eb1" }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <LayoutDashboard className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Im Dashboard anzeigen</TooltipContent>
                </Tooltip>
              </Link>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Schließen</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default MapTooltip;
