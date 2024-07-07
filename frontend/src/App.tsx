import { Outlet } from "@tanstack/react-router";
import SideHeader from "@/components/Sidebar";
import { useIsSidePanelOpen } from "@/store/sidePanelStore";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense } from "react";
import { TreeDataContextProvider } from "./context/TreeDataContext";
import { Toaster } from "@/components/ui/sonner";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    );

function App() {
  const isOpen = useIsSidePanelOpen();

  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <TreeDataContextProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
          <Suspense>
            <TanStackRouterDevtools
              initialIsOpen={false}
              position="bottom-right"
            />
          </Suspense>
          <div className="flex h-screen">
            <SideHeader open={isOpen} className="w-[300px]" />
            <div className="flex flex-col flex-1">
              <Outlet />
            </div>
          </div>
        </TreeDataContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
