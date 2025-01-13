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
        <p className="mb-4">
          In diesem Bereich werden alle im System registrierten Sensoren angezeigt.
          Neue Sensoren werden automatisch erstellt, sobald über das TTN (The Things Network) neue Daten empfangen werden,
          die keinem vorhandenen Sensor zugeordnet sind. TTN ist ein globales Funknetzwerk, das auf der LoRa-Funktechnik basiert.
          Mit dieser Technologie können die Messdaten der vergrabenen Sensoren direkt in das System übertragen werden.
        </p>
        <p>
          Wenn ein neuer Sensor angelegt wird, überprüft das System automatisch, ob die mitgesendeten GPS-Koordinaten
          mit einem im System registrierten Baum übereinstimmen. Falls ein passender Baum gefunden wird,
          wird der Sensor automatisch mit diesem Baum verknüpft. Diese Verknüpfung kann bei Bedarf auch manuell angepasst werden.
        </p>
      </article>

      <section className="mt-10">
        <header className="hidden border-b pb-2 text-sm text-dark-800 px-8 border-b-dark-200 mb-5 lg:grid lg:grid-cols-[1fr,2fr,1fr,1fr] lg:gap-5 xl:px-10">
          <p>Status</p>
          <p>Name und Verknüpfung</p>
          <p>Erstelldatum</p>
          <p>Letztes Datenupdate</p>
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
