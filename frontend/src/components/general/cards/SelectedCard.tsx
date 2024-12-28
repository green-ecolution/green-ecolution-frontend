import { WateringStatus } from '@/api/backendApi'
import { treeClusterIdQuery, treeIdQuery } from '@/api/queries'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import React from 'react'

interface SelectedCardProps {
  id: number
  type: 'tree' | 'cluster'
  onClick: (id: number) => void
}

const SelectedCard: React.FC<SelectedCardProps> = ({ onClick, id, type }) => {
  const query =
    type === 'cluster'
      ? treeClusterIdQuery(String(id))
      : treeIdQuery(String(id))
  const { data } = useSuspenseQuery(query)

  const statusDetails = getWateringStatusDetails(
    (type === 'cluster' ? data?.wateringStatus : data?.wateringStatus) ??
      WateringStatus.WateringStatusUnknown
  )

  return (
    <div className="flex justify-between mb-3 gap-x-6 bg-white border border-dark-50 shadow-cards px-4 py-3 rounded-lg">
      <h3
        className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] before:bg-${statusDetails.color}`}
      >
        <strong className="font-semibold">
          {type === 'cluster' ? 'Bewässerungsgruppe' : 'Baum'}:
        </strong>{' '}
        {type === 'cluster' ? data?.name : data?.species} · {id} ·{' '}
        {type === 'tree' && data?.plantingYear}
      </h3>
      <button
        type="button"
        onClick={() => {
          onClick(id)
        }}
        className="text-dark-600"
      >
        <Trash2 className="w-5 h-5" />
        <span className="sr-only">
          {type === 'cluster'
            ? 'Bewässerungsgruppe aus Auswahl löschen'
            : 'Baum aus Auswahl löschen'}
        </span>
      </button>
    </div>
  )
}

export default SelectedCard
