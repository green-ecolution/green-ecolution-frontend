import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/sensors/$sensorId/')({
  component: () => <div>Hello /_protected/sensors/$sensorId/!</div>
})