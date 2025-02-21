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
    <div className="w-full flex justify-between gap-x-6 bg-white border border-dark-50 shadow-cards px-4 py-3 rounded-lg">
      <h3 className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] before:bg-${statusDetails.color}`}>
        <strong>Bewässerungsgruppe:</strong> {name} · {id}
      </h3>
    </div>
  );
};

export default TreeclusterCardSmall;
