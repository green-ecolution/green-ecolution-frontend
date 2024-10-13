import { useState, useEffect, Suspense } from 'react'
import Dialog from '@/components/general/filter/Dialog'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import ButtonLink from '@/components/general/links/ButtonLink'
import { Plus } from 'lucide-react'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { ErrorBoundary } from 'react-error-boundary'
import TreeClusterList from '@/components/treecluster/TreeClusterList'

const treeclusterFilterSchema = z.object({
  status: z.array(z.string()).optional().default([]),
  region: z.array(z.string()).optional().default([]),
})

export const Route = createFileRoute('/_protected/treecluster/')({
  component: Treecluster,
  validateSearch: treeclusterFilterSchema,
})

function Treecluster() {
  const search = Route.useSearch()
  const [statusTags, setStatusTags] = useState<string[]>(search.status)
  const [regionTags, setRegionTags] = useState<string[]>(search.region)

  useEffect(() => {
    if (search.status) setStatusTags(search.status)
    if (search.region) setRegionTags(search.region)
  }, [search.status, search.region])

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung der Bewässerungsgruppen
        </h1>
        <p className="mb-5">
          Eine Bewässerungsgruppe besteht aus bis zu 40 Bäumen, die die gleichen
          Standortbedingungen vorweisen. Mindestens fünf Bäume in einer
          Baumgruppe sind mit Sensoren ausgestattet. Diese gelieferten Werte
          werden gemittelt, sodass eine Handlungsempfehlung für die Baumgruppe
          gegeben werden kann.
        </p>
        <ButtonLink
          icon={Plus}
          label="Neue Gruppe erstellen"
          link={{ to: '/treecluster/new' }}
        />
      </article>

      <section className="mt-10">
        <div className="flex justify-end mb-6 lg:mb-10">
          <Dialog
            initStatusTags={statusTags}
            initRegionTags={regionTags}
            headline="Bewässerungsgruppen filtern"
            fullUrlPath={Route.fullPath}
            applyFilter={(statusTags, regionTags) => {
              setStatusTags(statusTags)
              setRegionTags(regionTags)
            }}
          />
        </div>

        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,2fr,1.5fr,1fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Name</p>
          <p>Standort</p>
          <p>Anzahl d. Bäume</p>
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
            <TreeClusterList
              filter={{ status: statusTags, region: regionTags }}
            />
          </ErrorBoundary>
        </Suspense>
      </section>
    </div>
  )
}

export default Treecluster
