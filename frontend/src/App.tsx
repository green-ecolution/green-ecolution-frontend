import { Outlet } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
          <Suspense>
            <TanStackRouterDevtools
              initialIsOpen={false}
              position="bottom-right"
            />
          </Suspense>
          <Header />
          <main className="flex-1 lg:pl-20">
            <Outlet />
          </main>
          <Footer />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
