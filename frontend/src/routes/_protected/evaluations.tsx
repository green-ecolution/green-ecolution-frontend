import { evaluationQuery } from '@/api/queries'
import queryClient from '@/api/queryClient'
import GeneralStatusCard from '@/components/general/cards/GeneralStatusCard'
import LoadingInfo from '@/components/general/error/LoadingInfo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/evaluations')({
  component: Evaluation,
  meta: () => [{ title: 'Auswertungen' }],
  loader: () => {
    return queryClient.ensureQueryData(evaluationQuery())
  },
})

function Evaluation() {
  const { data } = useSuspenseQuery(evaluationQuery())

  return (
    <>
      <Suspense fallback={<LoadingInfo label="Auswertungen werden geladen" />}>
        <div className="container mt-6">
          <article className="2xl:w-4/5">
            <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
              Auswertung aller Daten
            </h1>
            <p>
              Exercitation in do elit est ad culpa anim amet veniam culpa.
              Ipsum esse tempor Lorem est cillum cupidatat nostrud labore sit eu ad aliqua.
              Reprehenderit exercitation do consequat velit veniam mollit non eu est est nulla.
              Ex mollit duis cillum. Aliquip nostrud laboris officia aliquip incididunt velit labore magna consequat laborum veniam.
              Consequat consequat laborum cupidatat labore cupidatat cillum amet qui dolore adipisicing.
              Fugiat fugiat voluptate magna veniam enim incididunt nostrud fugiat nostrud officia proident non ea sint laborum.
              Ex velit magna occaecat eiusmod id nulla quis culpa commodo et.
            </p>
          </article>

          <section className="mt-16">
            <h2 className="font-lato font-bold text-2xl mb-4">
              Erhobene Daten zu Bäumen, Bewässerungsgruppen & Sensoren:
            </h2>
            <ul className="space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3">
              <li>
                <GeneralStatusCard
                  overline="Anzahl an Bewässerungsgruppen"
                  value={`${data.treeclusterCount} ${data.treeclusterCount === 1 ? "Gruppe" : "Gruppen"}`}
                  description="Die Bewässerungsgruppen bilden Gruppen von Bäumen ab mit gleichen Standortbedingungen."
                />
              </li>
              <li>
                <GeneralStatusCard
                  overline="Anzahl an Bäumen"
                  value={`${data.treeCount} ${data.treeCount === 1 ? "Baum" : "Bäume"}`}
                  description="inkl. manuell erstellte oder importierte Bäume aus anderen Systemen (z.B. Datenbank)."
                />
              </li>
              <li>
                <GeneralStatusCard
                  overline="Anzahl an Sensoren"
                  value={`${data.sensorCount} ${data.sensorCount === 1 ? "Sensor" : "Sensoren"}`}
                  description="Es werden auch Sensoren einberechnet, die nicht mit einer Vegetation verknüpft sind.."
                />
              </li>
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-lato font-bold text-2xl mb-4">
              Erhobene Daten zu den Einsatzplänen:
            </h2>
            <ul className="space-y-5 md:space-y-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3">
              <li>
                <GeneralStatusCard
                  overline="Anzahl an Einsatzfahrten"
                  value={`${data.wateringPlanCount} ${data.wateringPlanCount === 1 ? "Fahrt" : "Fahrten"}`}
                  description="Dies beschreibt die Anzahl aller Einsatzfahrten, die aktuell im System hinterlegt sind."
                />
              </li>
              <li>
                <GeneralStatusCard
                  overline="Wasserverbrauch"
                  value={`${data.totalWaterConsumption} Liter`}
                  description="Der Wasserverbrauch bezieht sich auf alle Einsatzfahrten, die in dem angegebenen Zeitraum durchgeführt worden sind."
                />
              </li>
            </ul>
          </section>
        </div>
      </Suspense>
    </>
  )
}
