import Map from "@/components/Map";
import MapHeader from "@/components/MapHeader";
import { createFileRoute } from "@tanstack/react-router"; 

export const Route = createFileRoute("/")({
  component: Index
});

function Index() {
  return (
    <div className="relative">
      <MapHeader />
      <Map />
    </div>
  )
}
