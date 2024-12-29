import React from 'react'
import { getWateringStatusDetails } from '@/hooks/useDetailsForWateringStatus'
import { TreeCluster } from '@green-ecolution/backend-client'
import { UseFormRegister } from 'react-hook-form'
import { WateringPlanForm } from '@/schema/wateringPlanSchema'

interface EvaluationInputProps {
  headline: string
  treeclusters: TreeCluster[]
  register: UseFormRegister<WateringPlanForm>
  errors: Record<string, unknown>
}

const EvaluationInput: React.FC<EvaluationInputProps> = ({
  headline,
  treeclusters,
  register,
  errors,
}) => {
  return (
    <fieldset>
      <legend className="block font-semibold text-dark-800 mb-2.5">
        {headline}
      </legend>
      <ul>
        {treeclusters.map((cluster, index) => (
          <li key={index}>
            <div className="flex justify-between mb-3 gap-x-6 bg-white border border-dark-50 shadow-cards px-4 py-3 rounded-lg">
              <h3
                className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] before:bg-${getWateringStatusDetails(cluster.wateringStatus).color}`}
              >
                <strong className="font-semibold">
                  Gruppe: {cluster.name}
                </strong>
                &nbsp;·&nbsp;{cluster.name}
              </h3>
            </div>
            <input
              type="hidden"
              {...register(`evaluation.${index}.treeClusterId`, { value: cluster.id })}
            />
            <input
              type="hidden"
              {...register(`evaluation.${index}.wateringPlanId`, { value: cluster.id })}
            />
            <input
              type="number"
              step="0.1"
              defaultValue={0}
              {...register(`evaluation.${index}.consumedWater`, {
                required: 'Please enter the amount of water consumed.',
                valueAsNumber: true,
              })}
              className="border rounded p-2"
            />
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

export default EvaluationInput
