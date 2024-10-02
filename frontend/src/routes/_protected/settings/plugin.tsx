import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { PluginProvider } from "@green-ecolution/plugin-interface";

export const Route = createFileRoute("/_protected/settings/plugin")({
  component: PluginView,
});

const baseUrl = import.meta.env.VITE_BACKEND_BASEURL ?? "/api-local/v1";

const importPluginComponent = (pluginName: string) =>
  lazy(async () => {
    const pkg = await import(
      /* @vite-ignore */ `${baseUrl}/plugin/${pluginName}/plugin.js`
    ).catch(() => import("@/components/PluginError.tsx"))

    return pkg;
  });

function PluginView() {
  const [views, setViews] = useState<
    React.LazyExoticComponent<React.ComponentType<any>>[]
  >([]);

  useEffect(() => {
    async function loadPlugins() {
      const componentsPromises = ["demo_plugin"].map((pluginName) =>
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
