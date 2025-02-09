type MapState = {
  zoom: number
  minZoom: number
  maxZoom: number
  showSelectModal: boolean
}

type MapActions = {
  setZoom: (zoom: number) => void
  setShowSelectModal: (showSelectModal: boolean) => void
}

export type MapStore = MapState & MapActions
