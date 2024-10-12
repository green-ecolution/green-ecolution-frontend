import { infoQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/info')({
  component: Info,
  loader: () => {
    return queryClient.ensureQueryData(infoQuery())
  }
})

function Info() {
  const { data } = useSuspenseQuery(infoQuery())

  return (
    <div>
      <Suspense fallback={<LoadingInfo label="Loading App Info" />}>
        <h1>App Info</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Suspense>
    </div>
  )
}
