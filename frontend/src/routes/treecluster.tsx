import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/treecluster")({
  component: Treecluster,
});

function Treecluster() {
  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung aller verfügbaren Baumgruppen
        </h1>
        <p>
          Eine Baumgruppe besteht aus bis zu 40 Bäumen, die die gleichen Standortbedingungen vorweisen. 
          Mindestes fünf Bäume in einer Baumgruppe ist mit Sensoren ausgestattet. 
          Diese gelieferten Werte werden gemittelt, sodass eine Handlungsempfehlung für die Baumgruppe gegeben werden kann.
        </p>
      </article>
    </div>
  );
}
