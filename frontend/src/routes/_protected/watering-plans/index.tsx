import { treeClusterIdQuery, vehicleIdQuery } from '@/api/queries'
import WateringPlanCard from '@/components/general/cards/WateringPlanCard'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { WateringPlanStatus } from '@green-ecolution/backend-client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_protected/watering-plans/')({
  component: WateringPlans,
})

function WateringPlans() {
  //const { data: wateringPlanRes } = useSuspenseQuery(wateringPlanQuery())
  const { data: trailer } = useSuspenseQuery(vehicleIdQuery("1"))
  const { data: transporter } = useSuspenseQuery(vehicleIdQuery("2"))
  const { data: cluster } = useSuspenseQuery(treeClusterIdQuery("1"))
  const exampleDate = new Date();
  

  const exampleWateringPlan = {
    id: 1,
    date: "10.08.2000",
    createdAt: exampleDate,
    updatedAt: exampleDate,
    description: "Dies ist eine Beschreibung",
    wateringPlanStatus: WateringPlanStatus.WateringPlanStatusPlanned,
    distance: 1000,
    totalWaterRequired: 1000,
    users: [],
    treeCluster: [cluster],
    transporter: transporter,
    trailer: trailer,
  }

  return (
    <div className="container mt-6">
      <article className="mb-20 2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Alle Einsatzpläne
        </h1>
        <p className="mb-5">
          Hier finden Sie eine Übersicht aller Einsatzpläne. Ein Einsatzplan beschreibt eine Bewässerungsfahrt 
          mehrerer Bewässerungsgruppen. Die Bewässerungsfahrten können dadurch dynamisch und schnell geplant
        </p>
      </article>

      <section className="mt-10">
        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,1.5fr,1fr,1.5fr,1.5fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Datum & Fahrzeug</p>
          <p>Länge</p>
          <p>Anzahl Mitarbeitenden</p>
          <p>Anzahl Bewässerungsgruppen</p>
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
              <li className="mb-5 last:mb-0">
                <WateringPlanCard wateringPlan={exampleWateringPlan} />
              </li>
            </ul>
          </ErrorBoundary>
        </Suspense>
      </section>
    </div>
  )
}
