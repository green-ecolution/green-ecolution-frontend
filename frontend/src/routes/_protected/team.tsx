import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/team")({
  component: Team,
  meta: () => [
    {
      title: 'Mitarbeitende',
      path: '/team',
    },
  ],
});

function Team() {
  return (
    <div className="container mt-6">
      <article className="mb-20 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung aller Mitarbeitenden
        </h1>
        <p>
          In dieser Ansicht finden Sie eine Liste aller Mitarbeitenden, die an einer Einsatzplanung beteiligt sein können.
        </p>
      </article>
    </div>
  );
}
