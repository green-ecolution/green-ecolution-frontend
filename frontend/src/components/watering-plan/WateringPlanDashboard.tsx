import BackLink from '../general/links/BackLink'
import Pill from '../general/Pill'
import { useSuspenseQuery } from '@tanstack/react-query'
import { wateringPlanIdQuery } from '@/api/queries'
import { getWateringPlanStatusDetails } from '@/hooks/useDetailsForWateringPlanStatus'
import { format, formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

interface WateringPlanDashboardProps {
  wateringPlanId: string
}

const WateringPlanDashboard = ({ wateringPlanId }: WateringPlanDashboardProps) => {
  const { data: wateringPlan } = useSuspenseQuery(wateringPlanIdQuery(wateringPlanId))
  const statusDetails = getWateringPlanStatusDetails(wateringPlan.wateringPlanStatus)
  const createdDate = wateringPlan?.createdAt
    ? format(new Date(wateringPlan?.createdAt), 'dd.MM.yyyy')
    : 'Keine Angabe'
  const updatedDate = wateringPlan?.createdAt
    ? formatDistanceToNow(wateringPlan?.updatedAt, { locale: de })
    : 'Keine Angabe'

  const wateringPlanData = [
    {
      label: 'Länge der Route',
      value: wateringPlan?.distance ?? 'Keine Angabe',
    },
    {
      label: 'Startpunkt',
      value: 'Schleswiger Straße, Hauptzentrale',
    },
    {
      label: 'Benötigte Liter Wasser',
      value: wateringPlan?.totalWaterRequired ? `${wateringPlan?.totalWaterRequired} Liter` : 'Keine Angabe',
    },
    {
      label: 'Transporter',
      value: wateringPlan?.transporter.numberPlate ?? 'Keine Angabe',
    },
    {
      label: 'Zusätzlicher Anhänger',
      value: wateringPlan?.trailer?.numberPlate ?? 'Keine Angabe',
    },
    {
      label: 'Bewässerungsgruppen',
      value: `${wateringPlan?.treecluster.length} Gruppe/n`,
    },
    {
      label: 'Eingeteilte Mitarbeitende',
      value: `${wateringPlan?.users.length} Mitarbeitende`, // TODO: list names
    },
    {
      label: 'Erstellt',
      value: createdDate,
    },
    {
      label: 'Zuletzt geupdated',
      value: updatedDate,
    },
  ]

  return (
    <>
      <BackLink link={{ to: '/vehicles' }} label="Zur Fahrzeugübersicht" />
      <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
        <div className="2xl:w-4/5">
          <h1 className="font-lato font-bold text-3xl mb-4 flex flex-wrap items-center gap-4 lg:text-4xl xl:text-5xl">
            Einsatzplan: {wateringPlan.date}
            <Pill label={statusDetails.label} theme={statusDetails?.color ?? 'grey'} />
          </h1>
          {wateringPlan.description && <p className="mb-4">{wateringPlan.description}</p>}
        </div>
      </article>

      <section className="mt-16">
        <h2 className="font-lato font-bold text-2xl mb-4">
          Daten zur Einsatzplanung
        </h2>
        <dl className="text-lg md:columns-2 md:gap-x-11">
          {wateringPlanData.map((data, index) => (
            <div
              key={index}
              className={`py-4 border-b border-b-dark-200 group md:last:border-b-transparent 
              ${wateringPlanData.length / 2 === index + 1 ? 'md:border-b-transparent' : ''}`}
            >
              <dt className="font-bold sm:inline">{data.label}:</dt>
              <dd className="sm:inline sm:px-2">{data.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}

export default WateringPlanDashboard
