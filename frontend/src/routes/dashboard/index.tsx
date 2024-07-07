import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})


function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>TODO: Implement Dashboard</p>
    </div>
  )
}
