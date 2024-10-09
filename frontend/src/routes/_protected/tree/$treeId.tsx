import { treeApi } from "@/api/backendApi";
import LoadingInfo from "@/components/general/error/LoadingInfo";
import BackLink from "@/components/general/links/BackLink";
import ButtonLink from "@/components/general/links/ButtonLink";
import GeneralLink from "@/components/general/links/GeneralLink";
import Tabs from "@/components/general/Tabs";
import Sensor from "@/components/icons/Sensor";
import Tree from "@/components/icons/Tree";
import TreeGeneralData from "@/components/tree/TreeGeneralData";
import TreeSensorData from "@/components/tree/TreeSensorData";
import TreeWateringStatus from "@/components/tree/TreeWateringStatus";
import { useAuthHeader } from "@/hooks/useAuthHeader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { File, Info, Pencil } from "lucide-react";

export const Route = createFileRoute("/_protected/tree/$treeId")({
  component: SingleTree,

  loader: async ({ params }) => {
    return params.treeId;
  },
});

function SingleTree() {
  const treeId = Route.useParams().treeId;
  const authorization = useAuthHeader();

  const {
    data: tree,
    isLoading,
    isError,
  } = useSuspenseQuery({
    queryKey: ["tree", treeId],
    queryFn: () => treeApi.getTrees({ treeId, authorization }),
  });

  const tabs = [
    {
      label: "Bewässerungsdaten",
      icon: <Tree className="w-5 h-5" />,
      view: <TreeWateringStatus tree={tree} />,
    },
    {
      label: "Allgemeine Daten",
      icon: <File className="w-5 h-5" />,
      view: <TreeGeneralData tree={tree} />,
    },
    {
      label: "Sensordaten",
      icon: <Sensor className="w-5 h-5" />,
      view: <TreeSensorData tree={tree} />,
    },
  ];

  return (
    <div className="container mt-6">
      {isLoading ? (
        <LoadingInfo label="Baumdaten werden geladen …" />
      ) : isError || !tree ? (
        <p className="text-red text-lg">
          Einen Baum mit der Baumnummer {treeId} gibt es nicht oder die
          Baumdaten konnten nicht geladen werden.
        </p>
      ) : (
        <div>
          <BackLink url="/map" label="Zum Kataster" />
          <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
            <div className="2xl:w-4/5">
              <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
                Baum: {tree.treeNumber}
              </h1>
              <p className="text-dark-600 text-lg mb-4">
                <span>@TODO: Bewässerungsgruppe hinzufügen, </span>
                <span>@TODO: Adresse der Bewässerungsgruppe</span>
              </p>
              <GeneralLink
                url={`/map?lat=${tree.latitude}&lng=${tree.longitude}&zoom=18`}
                label="Auf der Karte anzeigen"
              />
            </div>
            {!tree.readonly ? (
              <ButtonLink
                icon={Pencil}
                iconClassName="stroke-1"
                label="Baum bearbeiten"
                color="grey"
                link={{ to: `/tree/$treeId/edit`, params: { treeId } }}
              />
            ) : (
              /* TODO: Make it prettier */
              <p className="text-dark-600 text-lg">
                Dieser Baum ist schreibgeschützt und kann nicht bearbeitet
                werden.
              </p>
            )}
          </article>
          {tree?.sensor ? (
            <Tabs tabs={tabs} />
          ) : (
            <section className="mt-10">
              <div className="bg-white mb-10 border-dark-50 shadow-cards h-full p-6 rounded-xl group flex flex-col gap-4 border">
                <h3 className="font-lato text-lg text-dark font-semibold flex items-center gap-x-3">
                  <Info className="text-dark-600 w-5 h-5" />
                  Info: Dieser Baum ist nicht mit einem Sensor ausgestattet.
                </h3>
                <p>
                  Dieser Baum wurde bisher nicht mit einem Sensor ausgestattet,
                  sodass keine Informationen über den aktuellen
                  Bewässerungszustand angezeigt werden können.
                </p>
              </div>
              <TreeGeneralData tree={tree} />
            </section>
          )}
        </div>
      )}
    </div>
  );
}
