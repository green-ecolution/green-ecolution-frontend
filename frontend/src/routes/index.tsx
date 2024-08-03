import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
 component: () => <Navigate to="/map"
    replace 
    search={{
      // TODO: Global default values
      lat: 54.792277136221905,
      lng: 9.43580607453268, 
      zoom: 13 }}
  />,
});
