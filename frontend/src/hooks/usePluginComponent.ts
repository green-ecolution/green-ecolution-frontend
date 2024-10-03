import { lazy, useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_BACKEND_BASEURL ?? "/api-local/v1";

const importPluginComponent = (pluginName: string) =>
  lazy(async () => {
    const pkg = await import(
      /* @vite-ignore */ `${baseUrl}/plugin/${pluginName}/plugin.js`
    );

    console.log(pkg);

    return pkg;
  });

export type LazyPluginComponent = React.LazyExoticComponent<React.ComponentType<any>>;

export const usePluginComponent = (pluginName: string) => {
  const [view, setView] = useState<LazyPluginComponent>();
  const loader = usePluginLoader(pluginName, setView);

  useEffect(() => {
    loader();
  }, []);

  return view;
};

export const usePluginLoader = (
  pluginName: string,
  fn: (plugin: LazyPluginComponent) => any,
) => {
  return async () => {
    const componentsPromises = importPluginComponent(pluginName);
    Promise.resolve(componentsPromises).then((component) => {
      fn(component);
    })
  };
};
