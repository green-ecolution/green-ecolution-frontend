import BackLink from '../general/links/BackLink'
import Pill from '../general/Pill'
import { useSuspenseQuery } from '@tanstack/react-query'
import { wateringPlanIdQuery } from '@/api/queries'
import { getWateringPlanStatusDetails } from '@/hooks/useDetailsForWateringPlanStatus'
import { format, formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'
import DetailedList from '../general/DetailedList'

interface WateringPlanDashboardProps {
  wateringPlanId: string
}

const WateringPlanDashboard = ({
  wateringPlanId,
}: WateringPlanDashboardProps) => {
  const { data: wateringPlan } = useSuspenseQuery(
    wateringPlanIdQuery(wateringPlanId)
  )
  const statusDetails = getWateringPlanStatusDetails(
    wateringPlan.wateringPlanStatus
  )
  const date = wateringPlan?.date
  ? format(new Date(wateringPlan?.date), 'dd.MM.yyyy')
  : 'Keine Angabe'
  const updatedDate = wateringPlan?.updatedAt
    ? format(new Date(wateringPlan?.updatedAt), 'dd.MM.yyyy')
    : 'Keine Angabe'

  const wateringPlanData = [
    {
      label: 'Länge der Route',
      value: wateringPlan?.distance
        ? `${wateringPlan.distance}`
        : 'Keine Angabe',
    },
    {
      label: 'Startpunkt',
      value: 'Schleswiger Straße, Hauptzentrale',
    },
    {
      label: 'Benötigte Liter Wasser',
      value: wateringPlan?.totalWaterRequired
        ? `${wateringPlan.totalWaterRequired} Liter`
        : 'Keine Angabe',
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
      value: wateringPlan?.treecluster?.length
        ? `${wateringPlan.treecluster.length} Gruppe/n`
        : 'Keine Angabe',
    },
    {
      label: 'Eingeteilte Mitarbeitende',
      value: wateringPlan?.users?.length
        ? `${wateringPlan.users.length} Mitarbeitende`
        : 'Keine Angabe', // TODO: list names
    },
    {
      label: 'Zuletzt geupdated',
      value: `${updatedDate}`,
    },
  ]

  return (
    <>
      <BackLink link={{ to: '/vehicles' }} label="Zur Fahrzeugübersicht" />
      <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
        <div className="2xl:w-4/5">
          <h1 className="font-lato font-bold text-3xl mb-4 flex flex-wrap items-center gap-4 lg:text-4xl xl:text-5xl">
            Einsatzplan für den {date}
            <Pill
              label={statusDetails.label}
              theme={statusDetails?.color ?? 'grey'}
            />
          </h1>
          {wateringPlan.description && (
            <p className="mb-4">{wateringPlan.description}</p>
          )}
        </div>
      </article>

      <section className="mt-16">
        <DetailedList
          headline="Daten zur Einsatzplanung"
          details={wateringPlanData}
        />
      </section>
    </>
  )
}

export default WateringPlanDashboard
