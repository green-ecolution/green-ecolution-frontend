import BackLink from '../general/links/BackLink'
import Pill from '../general/Pill'
import { useSuspenseQuery } from '@tanstack/react-query'
import { wateringPlanIdQuery } from '@/api/queries'
import { getWateringPlanStatusDetails } from '@/hooks/useDetailsForWateringPlanStatus'
import { format, isPast } from 'date-fns'
import { File, FolderClosed, MoveRight } from 'lucide-react'
import TabGeneralData from './TabGeneralData'
import { useMemo } from 'react'
import Tabs from '../general/Tabs'
import TreeClusterList from '../treecluster/TreeClusterList'
import { WateringPlanStatus } from '@green-ecolution/backend-client'
import ButtonLink from '../general/links/ButtonLink'

interface WateringPlanDashboardProps {
  wateringPlanId: string
}

const WateringPlanDashboard = ({
  wateringPlanId,
}: WateringPlanDashboardProps) => {
  const { data: wateringPlan } = useSuspenseQuery(
    wateringPlanIdQuery(wateringPlanId)
  )
  const statusDetails = getWateringPlanStatusDetails(wateringPlan.status)

  const date = wateringPlan?.date
    ? format(new Date(wateringPlan?.date), 'dd.MM.yyyy')
    : 'Keine Angabe'

  const tabs = useMemo(
    () => [
      {
        label: 'Allgemeine Daten',
        icon: <File className="w-5 h-5" />,
        view: <TabGeneralData wateringPlan={wateringPlan} />,
      },
      {
        label: 'Bewässerungsgruppen',
        icon: <FolderClosed className="w-5 h-5" />,
        view: <TreeClusterList data={wateringPlan.treeclusters} />,
      },
    ],
    [wateringPlan]
  )

  const showEditStatusButton = (): boolean => {
    return (
      wateringPlan.status !== WateringPlanStatus.WateringPlanStatusNotCompeted &&
      wateringPlan.status !== WateringPlanStatus.WateringPlanStatusFinished &&
      wateringPlan.status !== WateringPlanStatus.WateringPlanStatusCanceled
    )
  }

  return (
    <>
      <BackLink link={{ to: '/watering-plans' }} label="Alle Einsatzpläne" />
      <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
        <div className="2xl:w-4/5">
          <h1 className="font-lato font-bold text-3xl mb-4 flex flex-wrap items-center gap-4 lg:text-4xl xl:text-5xl">
            Einsatzplan für den {date}
            <Pill
              label={statusDetails?.label ?? 'Keine Angabe'}
              theme={statusDetails?.color ?? 'dark-400'}
            />
          </h1>
          {wateringPlan.description && (
            <p className="mb-4">{wateringPlan.description}</p>
          )}
          {showEditStatusButton() && (
            <ButtonLink
              link={{
                to: '/watering-plans/$wateringPlanId/status/edit',
                params: { wateringPlanId: wateringPlan.id.toString() },
              }}
              label="Status aktualisieren"
              icon={MoveRight}
            />
          )}
        </div>
      </article>

      <Tabs tabs={tabs} />
    </>
  )
}

export default WateringPlanDashboard
