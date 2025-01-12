import BackLink from '../general/links/BackLink'
import Pill from '../general/Pill'
import {
  getWateringPlanStatusDetails,
  showWateringPlanStatusButton,
} from '@/hooks/useDetailsForWateringPlanStatus'
import { format } from 'date-fns'
import { File, FolderClosed, MoveRight, Pencil } from 'lucide-react'
import TabGeneralData from './TabGeneralData'
import { useMemo } from 'react'
import Tabs from '../general/Tabs'
import TreeClusterList from '../treecluster/TreeClusterList'
import ButtonLink from '../general/links/ButtonLink'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import useStore from '@/store/store'
import { basePath } from '@/api/backendApi'
import useToast from '@/hooks/useToast'
import LinkAsButton from '../general/buttons/LinkButton'
import { wateringPlanIdQuery } from '@/api/queries'

interface WateringPlanDashboardProps {
  wateringPlanId: string
}

const WateringPlanDashboard = ({
  wateringPlanId,
}: WateringPlanDashboardProps) => {
  const { data: wateringPlan } = useSuspenseQuery(wateringPlanIdQuery(wateringPlanId))
  const statusDetails = getWateringPlanStatusDetails(wateringPlan.status)
  const { accessToken } = useStore((state) => ({
    accessToken: state.auth.token?.accessToken,
  }))
  const showToast = useToast()

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

  const { mutate } = useMutation({
    mutationFn: async () => {
      const resp = await fetch(`${basePath}${wateringPlan.gpxUrl}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (resp.status !== 200) {
        throw new Error((await resp.json()).error)
      }

      const blob = await resp.blob()

      const objUrl = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = objUrl
      a.download =
        resp.headers.get('Content-Disposition')?.split('filename=')[1] ??
        'route.gpx'
      a.click()

      window.URL.revokeObjectURL(objUrl)
    },
    onError: (error) => {
      showToast(error.message, 'error')
    }
  })

  return (
    <>
      <BackLink link={{ to: '/watering-plans' }} label="Alle Einsatzpläne" />
      <article className="space-y-6 xl:space-y-0 xl:flex xl:items-start xl:space-x-10">
        <div className="xl:w-4/5">
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
          <div className="flex flex-wrap gap-4 items-center">
            {showWateringPlanStatusButton(wateringPlan) && (
              <ButtonLink
                link={{
                  to: '/watering-plans/$wateringPlanId/status/edit',
                  params: { wateringPlanId: wateringPlan.id.toString() },
                }}
                label="Status aktualisieren"
                icon={MoveRight}
              />
            )}
            <LinkAsButton
              label="Route herunterladen"
              onClick={() => mutate()}
            />
          </div>
        </div>
        <ButtonLink
          icon={Pencil}
          iconClassName="stroke-1"
          label="Einsatz bearbeiten"
          color="grey"
          link={{
            to: `/watering-plans/$wateringPlanId/edit`,
            params: { wateringPlanId: String(wateringPlan.id) },
          }}
        />
      </article>

      <Tabs tabs={tabs} />
    </>
  )
}

export default WateringPlanDashboard
