import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/store/auth/authStore";
import useMapStore from "@/store/map/store";
import { createFileRoute } from "@tanstack/react-router";
import ReactJson from "react-json-view";

export const Route = createFileRoute("/debug")({
  component: Debug,
});

function Debug() {
  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text3xl mb-4 lg:text-4xl xl:text-5xl">
          Debugging
        </h1>
      </article>
      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Store />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Store = () => {
  const authStore = useAuthStore();
  const mapStore = useMapStore();

  return (
    <div>
      <ReactJson src={authStore} collapsed name="authStore" />
      <ReactJson src={mapStore} collapsed name="mapStore" />
    </div>
  );
};

