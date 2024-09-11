import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "../../components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircleIcon, Trash, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/_protected/team")({
  component: Team,
});

enum Status {
  Verfuegbar = "Verfügbar",
  NichtVerfuegbar = "Nicht Verfügbar",
}

const team = [
  {
    name: "Hans Olaf",
    jobPosition: "Gärtner",
    status: Status.Verfuegbar,
  },
  {
    name: "Timo Müller",
    jobPosition: "Förster",
    status: Status.Verfuegbar,
  },
  {
    name: "Dieter Jürgensen",
    jobPosition: "Gärtner",
    status: Status.NichtVerfuegbar,
  },
  {
    name: "Ralf Peter",
    jobPosition: "Gärtner",
    status: Status.Verfuegbar,
  },
  {
    name: "Harald Thomsen",
    jobPosition: "Förster",
    status: Status.Verfuegbar,
  },
  {
    name: "Uwe Schmidt",
    jobPosition: "Förster",
    status: Status.NichtVerfuegbar,
  },
];

function Team() {
  return (
    <div className="container mt-6">
      <article className="mb-20 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung aller Mitarbeitenden
        </h1>
        <p>
          Eu ipsum occaecat non exercitation occaecat ea aute fugiat quis magna do veniam commodo.
          Magna Lorem cupidatat id fugiat nostrud quis qui in quis fugiat. Irure pariatur anim cupidatat nulla ipsum Lorem irure. 
          Est elit laborum sunt commodo officia nulla cupidatat fugiat tempor exercitation laborum. Sint irure eiusmod sunt. 
          Magna esse proident magna dolore aliqua nulla id sunt adipisicing.
        </p>
      </article>

      {/* @TODO update team page to corporate design */}
      <div className="h-[48px] flex items-center justify-between mx-2">
        <div className="flex items-center">
          <h1 className="font-bold text-xl">Team Mitglieder</h1>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="w-6 h-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 flex flex-col gap-3">
              <h1 className="font-bold text-xl">Filter</h1>
              <div>
                <h2 className="font-bold ml-1">Status</h2>
                <ul className="ml-2">
                  <li>
                    <Checkbox id="statusVerfuegbar" />
                    <label htmlFor="statusVerfuegbar" className="ml-1">
                      Verfügbar
                    </label>
                  </li>
                  <li>
                    <Checkbox id="statusNichtVerfuegbar" />
                    <label htmlFor="statusNichtVerfuegbar" className="ml-1">
                      Nicht Verfügbar
                    </label>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="font-bold ml-1">Job Position</h2>
                <ul className="ml-2">
                  <li>
                    <Checkbox id="gaertner" />
                    <label htmlFor="gaertner" className="ml-1">
                      Gärtner
                    </label>
                  </li>
                  <li>
                    <Checkbox id="foerster" />
                    <label htmlFor="foerster" className="ml-1">
                      Förster
                    </label>
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="default">
            <PlusCircleIcon className="w-4 h-4" />
            <span className="ml-2">Mitglied hinzufügen</span>
          </Button>
        </div>
      </div>
      <Separator />

      <div className="p-4">
        <div className="flex justify-end items-center"></div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Job Position</TableHead>
              <TableHead>Aktueller Status</TableHead>
              <TableHead className="text-right">Aktion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((teamMember) => (
              <TableRow key={teamMember.name}>
                <TableCell className="font-medium">{teamMember.name}</TableCell>
                <TableCell>{teamMember.jobPosition}</TableCell>
                <TableCell>{teamMember.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
