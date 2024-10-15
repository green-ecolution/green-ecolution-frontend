import { useMap } from "react-leaflet";

function useMapInteractions() {
  const map = useMap();

  const enableDragging = () => {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
  };

  const disableDragging = () => {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
  };

  return { enableDragging, disableDragging };
}

export default useMapInteractions;