import { WateringPlan } from '@green-ecolution/backend-client'
import DetailedList from '../general/DetailedList'
import { format } from 'date-fns'

interface TabGeneralDataProps {
  wateringPlan?: WateringPlan
}

const TabGeneralData: React.FC<TabGeneralDataProps> = ({ wateringPlan }) => {
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
      value: wateringPlan?.transporter
        ? wateringPlan?.transporter.numberPlate
        : 'Keine Angabe',
    },
    {
      label: 'Zusätzlicher Anhänger',
      value: wateringPlan?.trailer
        ? wateringPlan?.trailer.numberPlate
        : 'Keine Angabe',
    },
    {
      label: 'Anzahl der Bewässerungsgruppen',
      value: wateringPlan?.treeclusters?.length
        ? `${wateringPlan.treeclusters.length} Gruppe(n)`
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
    <section className="mt-16">
      <DetailedList
        headline="Daten zur Einsatzplanung"
        details={wateringPlanData}
      />
    </section>
  )
}

export default TabGeneralData
