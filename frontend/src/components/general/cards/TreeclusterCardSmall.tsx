import { getWateringStatusDetails } from '@/hooks/details/useDetailsForWateringStatus';
import { WateringStatus } from '@green-ecolution/backend-client';

interface TreeclusterCardSmallProps {
  name: string;
  id: number;
  status?: WateringStatus;
}

const TreeclusterCardSmall = ({ name, id, status }: TreeclusterCardSmallProps) => {
  const statusDetails = getWateringStatusDetails(status ?? WateringStatus.WateringStatusUnknown);

  return (
    <h3 className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] before:bg-${statusDetails.color}`}>
      <strong>Bewässerungsgruppe:</strong> {name} · {id}
    </h3>
  );
};

export default TreeclusterCardSmall;
