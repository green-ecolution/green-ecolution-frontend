import DynamicPlugin from "@/components/plugin/DynamicPlugin";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/plugin/$pluginName")(
  {
    component: PluginView,
    loader: ({ params }) => {
      return params.pluginName;
    },
  },
);

function PluginView() {
  const pluginName = useLoaderData({
    from: "/_protected/settings/plugin/$pluginName",
  });

  return <DynamicPlugin pluginName={pluginName} />;
}
