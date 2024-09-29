import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/treecluster/$treecluster/edit')({
  component: EditTreeCluster,
})

function EditTreeCluster () {
  return (
    <div>
      Hallo
    </div>
  )
}