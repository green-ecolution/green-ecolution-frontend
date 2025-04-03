import useFormStore from '@/store/form/useFormStore'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import TreeUpdate from '@/components/tree/TreeUpdate'

export const Route = createFileRoute('/_protected/trees/_formular/$treeId/edit/')(
  {
    component: EditTree,
    beforeLoad: () => {
      useFormStore.getState().setType('edit')
    },
  }
)

function EditTree() {
  const treeId = Route.useParams().treeId

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Baumdaten werden geladen …" />}>
        <TreeUpdate treeId={treeId} />
      </Suspense>
    </div>
  )
}
