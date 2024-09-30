import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { PluginProvider } from "@green-ecolution/plugin-interface";

export const Route = createFileRoute("/_protected/settings/plugin")({
  component: PluginView,
});

const baseUrl = import.meta.env.VITE_BACKEND_BASEURL ?? "/api-local";

const importPluginComponent = (pluginName: string) =>
  lazy(() =>
    import(
      /* @vite-ignore */ `${baseUrl}/plugins/${pluginName}/plugin.tsx`
    ).catch(() => import("@/components/PluginError.tsx")),
  );

function PluginView() {
  const [views, setViews] = useState<
    React.LazyExoticComponent<React.ComponentType<any>>[]
  >([]);

  useEffect(() => {
    async function loadPlugins() {
      const componentsPromises = ["csv_plugin", "excel"].map((pluginName) =>
        importPluginComponent(pluginName),
      );
      Promise.all(componentsPromises).then((components) => {
        setViews(components);
      });
    }

    loadPlugins();
  }, []);

  return (
    <Suspense fallback={<div>Loading plugins...</div>}>
      {views.map((View, index) => (
        <PluginProvider key={index} authToken="">
          <View />
        </PluginProvider>
      ))}
    </Suspense>
  );
}
