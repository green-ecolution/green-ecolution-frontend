import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { pluginApi } from "@/api/backendApi";
import DashboardCard from "@/components/general/cards/DashboardCard";

export const Route = createFileRoute("/_protected/settings/plugin/")({
  component: PluginView,
});

function PluginView() {
  return (
    <div className="container mt-6">
      <article className="mb-10 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Übersicht der Plugins
        </h1>
        <p>
          Eu ipsum occaecat non exercitation occaecat ea aute fugiat quis magna
          do veniam commodo. Magna Lorem cupidatat id fugiat nostrud quis qui in
          quis fugiat. Irure pariatur anim cupidatat nulla ipsum Lorem irure.
          Est elit laborum sunt commodo officia nulla cupidatat fugiat tempor
          exercitation laborum. Sint irure eiusmod sunt. Magna esse proident
          magna dolore aliqua nulla id sunt adipisicing.
        </p>
      </article>

      <Suspense fallback={<div>Loading plugins...</div>}>
        <PluginList />
      </Suspense>
    </div>
  );
}

const PluginList = () => {
  const { data: pluginList } = useQuery({
    queryKey: ["pluginList"],
    queryFn: () => pluginApi.getPluginsList(),
  });

  return (
    <>
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {pluginList?.plugins.map((plugin, key) => (
        <li key={key}>
          <DashboardCard
            headline={plugin.name}
            description={plugin.description}
            linkLabel={`${plugin.name} starten`}
            url={`/settings/plugin/${plugin.slug}`}
            isDark={key % 2 !== 0}
          />
        </li>
      ))}
    </ul>

      {!pluginList || pluginList.plugins.length === 0 && (
        <div className="text-center mt-6">
          <p className="text-dark-500">Zur Zeit sind keine Plugins registriert.</p>
        </div>
      )}
  </>
  );
};
