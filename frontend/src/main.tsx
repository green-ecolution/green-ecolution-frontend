import React from "react";
import ReactDOM from "react-dom/client";
import "./css/site.css";
import "leaflet/dist/leaflet.css";
import "@splidejs/react-splide/css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import NotFound from "./components/layout/NotFound";
import ErrorFallback from "./components/layout/ErrorFallback";

const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error, reset }) => <ErrorFallback error={error} resetErrorBoundary={reset} />,
  defaultNotFoundComponent: () => {
    return (
      <NotFound />
    )
  },
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
