import { treeClusterIdQuery } from '@/api/queries'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import { WateringStatus, Tree } from '@green-ecolution/backend-client'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import React from 'react'

interface TreeCardProps {
  tree: Tree
}

const TreeCard: React.FC<TreeCardProps> = ({ tree }) => {
  const { data: clusterRes } = useQuery(
    treeClusterIdQuery(String(tree.treeClusterId))
  )
  const statusDetails = getWateringStatusDetails(
    tree.wateringStatus ?? WateringStatus.WateringStatusUnknown
  )
  const wrapperClasses =
    'bg-white group border border-dark-50 p-6 rounded-xl shadow-cards flex flex-col gap-y-4 lg:grid lg:grid-cols-[1fr,1.5fr,1fr,1fr] lg:items-center lg:gap-5 lg:py-5 xl:px-10'

  return (
    <Link
      to="/trees/$treeId"
      params={{
        treeId: tree.id.toString(),
      }}
      className={`transition-all ease-in-out duration-300 hover:bg-green-dark-50 hover:border-green-dark ${wrapperClasses}`}
    >
      <p
        className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] 
        before:bg-${statusDetails.color}`}
      >
        {statusDetails.label}
      </p>
      <h3 className="text-lg font-bold font-lato">{tree.species}</h3>
      <p className="text-dark-700">
        <span className="lg:sr-only">Baumnummer: </span>
        {tree.number ?? 'Unbekannt'}
      </p>
      <p className="text-dark-700">
        <span className="lg:sr-only">Bewässerungsgruppe: </span>
        {tree.treeClusterId ? (
          <span>{clusterRes?.name}</span>
        ) : (
          <span className="text-red">Nicht zugeordnet</span>
        )}
      </p>
    </Link>
  )
}

export default TreeCard
