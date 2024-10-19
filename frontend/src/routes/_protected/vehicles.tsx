import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/vehicles")({
  component: Vehicles,
  meta: () => [
    {
      title: 'Fahrzeuge',
      path: '/vehicles',
    },
  ]
});

function Vehicles() {
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
    </div>
  );
}
