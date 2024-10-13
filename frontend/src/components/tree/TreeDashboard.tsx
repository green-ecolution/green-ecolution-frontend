import BackLink from '../general/links/BackLink'
import Pill from '../general/Pill'
import GeneralLink from '../general/links/GeneralLink'
import ButtonLink from '../general/links/ButtonLink'
import { File, Info, Pencil } from 'lucide-react'
import Tabs from '../general/Tabs'
import TreeGeneralData from './TreeGeneralData'
import { useMemo } from 'react'
import TreeIcon from '../icons/Tree'
import TreeWateringStatus from './TreeWateringStatus'
import SensorIcon from '../icons/Sensor'
import TreeSensorData from './TreeSensorData'
import { useSuspenseQuery } from '@tanstack/react-query'
import { treeClusterIdQuery, treeIdQuery } from '@/api/queries'

interface TreeDashboardProps {
  treeId: string
}

const TreeDashboard = ({ treeId }: TreeDashboardProps) => {
  const { data: tree } = useSuspenseQuery(treeIdQuery(treeId))
  const { data: treeCluster } = useSuspenseQuery(
    treeClusterIdQuery(tree.treeClusterId?.toString() ?? '')
  )

  const tabs = useMemo(
    () => [
      {
        label: 'Bewässerungsdaten',
        icon: <TreeIcon className="w-5 h-5" />,
        view: <TreeWateringStatus tree={tree} />,
      },
      {
        label: 'Allgemeine Daten',
        icon: <File className="w-5 h-5" />,
        view: <TreeGeneralData tree={tree} />,
      },
      {
        label: 'Sensordaten',
        icon: <SensorIcon className="w-5 h-5" />,
        view: <TreeSensorData tree={tree} />,
      },
    ],
    [tree]
  )

  return (
    <>
      <BackLink link={{ to: '/map' }} label="Zum Kataster" />
      <article className="space-y-6 2xl:space-y-0 2xl:flex 2xl:items-center 2xl:space-x-10">
        <div className="2xl:w-4/5">
          <h1 className="font-lato font-bold text-3xl mb-4 flex flex-wrap items-center gap-4 lg:text-4xl xl:text-5xl">
            Baum: {tree.treeNumber}
            {tree.readonly && <Pill label="importiert" />}
          </h1>
          {tree.treeClusterId ? (
            <p className="text-dark-600 text-lg">
              <span>Bewässerungsgruppe: {treeCluster.name}</span>
              {', '}
              <span>
                Standort: {treeCluster.address}, {treeCluster.region?.name}
              </span>
            </p>
          ) : (
            <p className="text-dark-600 text-lg">
              Dieser Baum ist keiner Bewässerungsgruppe zugeordnet.
            </p>
          )}
          {tree.description && <p>{tree.description}</p>}
          <div className="flex mt-4 flex-wrap gap-x-10">
            <GeneralLink
              url={`/map?lat=${tree.latitude}&lng=${tree.longitude}&zoom=18`}
              label="Auf der Karte anzeigen"
            />
            {tree.treeClusterId && (
              <GeneralLink
                url={`/treecluster/${tree.treeClusterId}`}
                label="Zur Bewässerungsggruppe"
              />
            )}
          </div>
        </div>
        {!tree.readonly && (
          <ButtonLink
            icon={Pencil}
            iconClassName="stroke-1"
            label="Baum bearbeiten"
            color="grey"
            link={{
              to: `/tree/$treeId/edit`,
              params: { treeId: String(tree.id) },
            }}
          />
        )}
      </article>
      {tree?.sensor ? (
        <Tabs tabs={tabs} />
      ) : (
        <section className="mt-10">
          <div className="bg-white mb-10 border-dark-50 shadow-cards h-full p-6 rounded-xl group flex flex-col gap-4 border">
            <h3 className="font-lato text-lg text-dark font-semibold flex items-center gap-x-3">
              <Info className="text-dark-600 w-5 h-5" />
              Info: Dieser Baum ist nicht mit einem Sensor ausgestattet.
            </h3>
            <p>
              Dieser Baum wurde bisher nicht mit einem Sensor ausgestattet,
              sodass keine Informationen über den aktuellen Bewässerungszustand
              angezeigt werden können.
            </p>
          </div>
          <TreeGeneralData tree={tree} />
        </section>
      )}
    </>
  )
}

export default TreeDashboard