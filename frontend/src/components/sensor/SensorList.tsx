import { Sensor } from '@/api/backendApi'
import SensorCard from '../general/cards/SensorCard';

interface SensorListProps {
  filteredData: Sensor[];
}

const SensorList = ({ filteredData }: SensorListProps) => {
  return (
    <ul>
      {filteredData?.length === 0 ? (
        <li className="text-center text-dark-600 mt-10">
          <p>
            Es wurden keine Bewässerungsgruppen gefunden, die den
            Filterkriterien entsprechen.
          </p>
        </li>
      ) : (
        filteredData?.map((sensor, key) => (
          <li key={key} className="mb-5 last:mb-0">
            <SensorCard sensor={sensor} />
          </li>
        ))
      )}
    </ul>
  )
}

export default SensorList
