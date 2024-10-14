import { Tree } from '@/api/backendApi'
import { TreeclusterSchema } from '@/schema/treeclusterSchema'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Suspense } from 'react'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { ErrorBoundary } from 'react-error-boundary'
import TreeUpdate from '@/components/tree/TreeUpdate'
import useToast from '@/hooks/useToast'

export const Route = createFileRoute('/_protected/tree/_formular/$treeId/edit')(
  {
    component: EditTreeCluster,
    beforeLoad: () => {
      useFormStore.getState().setType('edit')
    },
    meta: () => [{ title: `Baum editieren` }],
  }
)

function EditTreeCluster() {
  const showToast = useToast()
  const treeId = Route.useParams().treeId
  const navigate = useNavigate({ from: Route.fullPath })
  const formStore = useFormStore((state: FormStore<TreeclusterSchema>) => ({
    form: state.form,
    reset: state.reset,
  }))

  const handleOnUpdateSuccess = (data: Tree) => {
    formStore.reset()
    navigate({
      to: '/tree/$treeId',
      params: { treeId: data.id.toString() },
      search: { resetStore: false },
      replace: true,
    })
    showToast('Der Baum wurde erfolgreich editiert')
  }

  return (
    <div className="container mt-6">
      <Suspense fallback={<LoadingInfo label="Baumdaten werden geladen …" />}>
        <ErrorBoundary
          fallback={
            <p className="text-red text-lg font-semibold">
              Einen Baum mit der Identifikationsnummer {treeId} gibt es nicht
              oder die Baumdaten konnten nicht geladen werden.
            </p>
          }
        >
          <TreeUpdate
            treeId={treeId}
            onUpdateSuccess={handleOnUpdateSuccess}
            onUpdateError={console.error}
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}
