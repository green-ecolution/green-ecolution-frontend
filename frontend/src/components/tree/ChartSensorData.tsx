import { SensorData } from '@green-ecolution/backend-client'
import { format } from 'date-fns'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts'

interface ChartSensorDataProps {
  data: SensorData[]
}

const ChartSensorData: React.FC<ChartSensorDataProps> = ({ data }) => {
  const batteryData = data.map((entry) => ({
    name: format(new Date(entry.updatedAt), 'dd.MM.yyyy'),
    battery: entry.battery,
  }))

  return (
    <>
      <ResponsiveContainer height={400} width="100%">
        <AreaChart
          data={batteryData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="battery"
            name="Batteriewerte in Volt"
            stroke="#4C7741"
            fill="#D9E8D5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default ChartSensorData
