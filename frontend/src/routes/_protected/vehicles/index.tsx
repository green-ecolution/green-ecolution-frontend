import { vehicleQuery } from "@/api/queries";
import LoadingInfo from "@/components/general/error/LoadingInfo";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createFileRoute("/_protected/vehicles/")({
  component: Vehicles,
  meta: () => [
    {
      title: 'Fahrzeuge',
      path: '/vehicles',
    },
  ]
});

function Vehicles() {
  const { data: vehicleRes } = useSuspenseQuery(vehicleQuery())

  return (
    <div className="container mt-6">
      <article className="mb-20 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung aller Fahrzeuge
        </h1>
        <p>
          Hier finden Sie eine Übersicht aller Fahrzeuge, welche für Einsätze verwendet werden können.
        </p>
      </article>

      <Suspense fallback={<LoadingInfo label="Daten werden geladen" />}>
          <ErrorBoundary
            fallback={
              <p className="text-center text-dark-600 mt-10">
                Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später
                erneut.
              </p>
            }
          >
            <ul>
              {vehicleRes.data?.length === 0 ? (
                <li className="text-center text-dark-600 mt-10">
                  <p>
                    Es wurden keine Bewässerungsgruppen gefunden, die den
                    Filterkriterien entsprechen.
                  </p>
                </li>
              ) : (
                vehicleRes.data?.map((vehicle, key) => (
                  <li key={key} className="mb-5 last:mb-0">
                    {vehicle.type}
                  </li>
                ))
              )}
            </ul>
          </ErrorBoundary>
        </Suspense>
    </div>
  );
}
