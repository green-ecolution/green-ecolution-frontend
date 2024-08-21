import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})


function Dashboard() {
  return (
    <div>
      <div className="h-[48px] flex items-center justify-between mx-2">
        <div className="flex items-center">
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>
      </div>

      <Separator />
    </div>
  )
}
