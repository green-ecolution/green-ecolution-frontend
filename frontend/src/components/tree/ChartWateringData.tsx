import { SensorData } from '@green-ecolution/backend-client'
import { format } from 'date-fns'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
} from 'recharts'

interface ChartWateringDataProps {
  data: SensorData[]
}

const ChartWateringData: React.FC<ChartWateringDataProps> = ({ data }) => {
  const transformedDataForTemperature = data.map((entry) => ({
    name: format(new Date(entry.updatedAt), 'dd.MM.yyyy'),
    temperature: entry.temperature,
    humidity: entry.humidity,
  }))

  const transformedDataForWatermarks = data.map((entry) => {
    const formattedEntry: Record<string, any> = {
      name: format(new Date(entry.updatedAt), 'dd.MM.yyyy'),
    }

    entry.watermarks.forEach((watermark) => {
      formattedEntry[`depth_${watermark.depth}`] = watermark.resistance
    })

    return formattedEntry
  })

  return (
    <>
      <h3 className="font-bold mb-4 text-dark-600 text-center">
        Bodentemperatur und -feuchtigkeit im Verlaufe der Zeit:
      </h3>
      <ResponsiveContainer height={400} width="100%">
        <LineChart
          data={transformedDataForTemperature}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="temperature"
            name="Bodentemperatur in Celsius"
            stroke="#ACB63B"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            name="Bodenfeuchte in Prozent"
            stroke="#4C7741"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <h3 className="font-bold mb-4 mt-10 text-dark-600 text-center">
        Wasserspannung in den Tiefen 30cm, 60cm und 90cm im Verlaufe der Zeit:
      </h3>
      <ResponsiveContainer height={400} width="100%">
        <LineChart
          data={transformedDataForWatermarks}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="depth_30"
            name="Ω in 30cm"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="depth_60"
            name="Ω in 60cm"
            stroke="#ACB63B"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="depth_90"
            name="Ω in 90cm"
            stroke="#E44E4D"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default ChartWateringData
