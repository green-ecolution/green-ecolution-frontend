import { usePluginComponent } from "@/hooks/usePluginComponent";
import useStore from "@/store/store";
import { PluginProvider } from "@green-ecolution/plugin-interface";
import { Suspense } from "react";

interface DynamicPluginProps {
  pluginName: string;
}

const DynamicPlugin = ({pluginName}: DynamicPluginProps) => {
  const Component = usePluginComponent(pluginName);
  const { authToken } = useStore((state) => ({
    authToken: state.auth.token,
  }));

  return (
    <div className="container mt-6">
      <Suspense fallback={<div>Loading plugins...</div>}>
        <PluginProvider authToken={authToken?.accessToken || ""}>
          {Component && <Component />}
        </PluginProvider>
      </Suspense>
    </div>
  );
}

export default DynamicPlugin;
