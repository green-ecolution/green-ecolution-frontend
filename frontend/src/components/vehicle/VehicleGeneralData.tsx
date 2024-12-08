import { getVehicleType } from '@/hooks/useDetailsForVehicleType'
import { Vehicle } from '@green-ecolution/backend-client'

interface VehicleGeneralData {
  vehicle?: Vehicle
}

const VehicleGeneralData: React.FC<VehicleGeneralData> = ({ vehicle }) => {
  const vehicleType = getVehicleType(vehicle.type)

  const vehicleData = [
    {
      label: 'Modell',
      value: vehicle?.model ?? 'Keine Angabe',
    },
    {
      label: 'Fahrzeug-Typ',
      value: vehicleType ?? 'Keine Angabe',
    },
    {
      label: 'Höhe des Fahrzeugs',
      value:
        vehicle?.height != null ? `${vehicle.height} Meter` : 'Keine Angabe',
    },
    {
      label: 'Breite des Fahrzeugs',
      value: vehicle?.width != null ? `${vehicle.width} Meter` : 'Keine Angabe',
    },
    {
      label: 'Benötigte Führerscheinklasse',
      value: vehicle?.drivingLicense ?? 'Keine Angabe',
    },
    {
      label: 'Nummernschild',
      value: vehicle?.numberPlate ?? 'Keine Angabe',
    },
    {
      label: 'Länge des Fahrzeugs',
      value:
        vehicle?.length != null ? `${vehicle.length} Meter` : 'Keine Angabe',
    },
  ]

  return (
    <>
      <h1 className="font-lato font-bold text-2xl mb-4">Daten zum Fahrzeug</h1>
      <dl className="text-lg md:columns-2 md:gap-x-11">
        {vehicleData.map((data, index) => (
          <div
            key={index}
            className={`py-4 border-b border-b-dark-200 group md:last:border-b-transparent 
              ${vehicleData.length / 2 === index + 1 ? 'md:border-b-transparent' : ''}`}
          >
            <dt className="font-bold sm:inline">{data.label}:</dt>
            <dd className="sm:inline sm:px-2">{data.value}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export default VehicleGeneralData
