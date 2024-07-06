import { Outlet } from "@tanstack/react-router";
import SideHeader from "@/components/Sidebar";
import { useIsSidePanelOpen } from "@/store/sidePanelStore";

function App() {
  const isOpen = useIsSidePanelOpen();

  return (
    <>
      <div className="flex h-screen">
        <SideHeader open={isOpen} className="w-[300px]" />
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
