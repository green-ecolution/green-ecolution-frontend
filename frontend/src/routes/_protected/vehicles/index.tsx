import { vehicleQuery } from '@/api/queries'
import VehicleCard from '@/components/general/cards/VehicleCard'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ButtonLink from '@/components/general/links/ButtonLink'
import { Plus } from 'lucide-react'
import Pagination from '@/components/general/Pagination'
import { z } from 'zod'

export const Route = createFileRoute('/_protected/vehicles/')({
  component: Vehicles,
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
      title: 'Fahrzeuge',
      path: '/vehicles',
    },
  ],
})

function Vehicles() {
  const search = useLoaderData({ from: '/_protected/vehicles/' })
  const { data: vehicleRes } = useSuspenseQuery(
    vehicleQuery({ page: search.page.toString(), limit: '5' })
  )

  return (
    <div className="container mt-6">
      <article className="mb-20 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Alle Fahrzeuge
        </h1>
        <p className="mb-5">
          Hier finden Sie eine Übersicht aller Fahrzeuge, welche für Einsätze
          verwendet werden können.
        </p>
        <ButtonLink
          icon={Plus}
          label="Neues Fahrzeug erstellen"
          link={{ to: '/vehicles/new' }}
        />
      </article>

      <section className="mt-10">
        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-5 lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Kennzeichen</p>
          <p>Wasserkapazität</p>
          <p>Modell</p>
          <p>Führerscheinklasse</p>
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
              {vehicleRes.data?.length === 0 ? (
                <li className="text-center text-dark-600 mt-10">
                  <p>Es wurden leider keine Fahrzeuge gefunden.</p>
                </li>
              ) : (
                vehicleRes.data?.map((vehicle, key) => (
                  <li key={key} className="mb-5 last:mb-0">
                    <VehicleCard vehicle={vehicle} />
                  </li>
                ))
              )}
            </ul>
            {vehicleRes.pagination && (
              <Pagination
                url="/vehicles"
                pagination={vehicleRes.pagination}
              />
            )}
          </ErrorBoundary>
        </Suspense>
      </section>
    </div>
  )
}
