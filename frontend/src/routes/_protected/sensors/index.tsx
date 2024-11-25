import { sensorQuery } from '@/api/queries'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import SensorList from '@/components/sensor/SensorList'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_protected/sensors/')({
  component: Sensors,
  meta: () => [
    {
      title: 'Sensoren',
      path: '/sensors',
    },
  ],
})

function Sensors() {
  const { data: sensorsRes } = useSuspenseQuery(sensorQuery())

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Auflistung aller verfügbaren Sensoren
        </h1>
        <p>
          Eu ipsum occaecat non exercitation occaecat ea aute fugiat quis magna
          do veniam commodo. Magna Lorem cupidatat id fugiat nostrud quis qui in
          quis fugiat. Irure pariatur anim cupidatat nulla ipsum Lorem irure.
          Est elit laborum sunt commodo officia nulla cupidatat fugiat tempor
          exercitation laborum. Sint irure eiusmod sunt. Magna esse proident
          magna dolore aliqua nulla id sunt adipisicing.
        </p>
      </article>

      <section className="mt-10">
        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,2fr,1fr,1fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Name und Verknüpfung</p>
          <p>Erstelldatum</p>
          <p>Letzes Datenupdate</p>
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
            <SensorList data={sensorsRes.data} />
          </ErrorBoundary>
        </Suspense>
      </section>
    </div>
  )
}
