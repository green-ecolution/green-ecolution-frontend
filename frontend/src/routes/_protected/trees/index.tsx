import { treeQuery } from '@/api/queries'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ButtonLink from '@/components/general/links/ButtonLink'
import { Plus } from 'lucide-react'
import TreeCard from '@/components/general/cards/TreeCard'
import { z } from 'zod'
import Pagination from '@/components/general/Pagination'

export const Route = createFileRoute('/_protected/trees/')({
  component: Trees,
    validateSearch: z.object({
      page: z.number().default(1),
    }),
  
    loaderDeps: ({ search: { page } }) => ({
      page: page || 1,
    }),
  
    loader: ({ deps: { page } }) => {
      return { page }
    },
  meta: () => [
    {
      title: 'Bäume',
      path: '/trees',
    },
  ],
})

function Trees() {
  const search = useLoaderData({ from: '/_protected/trees/' })
  const { data: treesRes } = useSuspenseQuery(
    treeQuery({ page: search.page.toString(), limit: '10' })
  )

  return (
    <div className="container mt-6">
      <article className="mb-20 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung aller Bäume
        </h1>
        <p className="mb-5">
          Hier finden Sie eine Übersicht aller Bäume in einer Listenansicht. Die
          Bäume lassen sich allerdings auch auf einer{' '}
          <a
            href="/map"
            className="text-green underline hover:text-green-light focus:text-green-light-50"
          >
            Karte
          </a>
          &nbsp;visualisieren.
        </p>
        <ButtonLink
          icon={Plus}
          label="Neuen Baum erstellen"
          link={{ to: '/map/tree/new' }}
        />
      </article>

      <section className="mt-10">
      <header className="hidden border-b pb-2 text-sm text-dark-800 px-6 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,1.5fr,1fr,1fr] lg:gap-5 lg:px-10">
          <p>Status</p>
          <p>Baumart</p>
          <p>Baumnummer</p>
          <p>Bewässerungsgruppe</p>
        </header>
        <Suspense fallback={<LoadingInfo label="Daten werden geladen" />}>
          <ErrorBoundary
            fallback={
              <p className="text-center text-dark-600 mt-10">
                Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später
                erneut.
              </p>
            }
          >
            <ul>
              {treesRes.data?.length === 0 ? (
                <li className="text-center text-dark-600 mt-10">
                  <p>Es wurden leider keine Fahrzeuge gefunden.</p>
                </li>
              ) : (
                treesRes.data?.map((tree, key) => (
                  <li key={key} className="mb-5 last:mb-0">
                    <TreeCard tree={tree} />
                  </li>
                ))
              )}
            </ul>
            {treesRes.pagination && (
              <Pagination
                url="/trees"
                pagination={treesRes.pagination}
              />
            )}
          </ErrorBoundary>
        </Suspense>
      </section>
    </div>
  )
}
