import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";

const newTreeSearchSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const Route = createFileRoute("/_protected/tree/new")({
  component: NewTree,
  validateSearch: newTreeSearchSchema,
});

function NewTree() {
  const { lat, lng } = useSearch({from: "/_protected/tree/new"});
  return (
    <div>
      <h1>New Tree</h1>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>
    </div>
  );
}
