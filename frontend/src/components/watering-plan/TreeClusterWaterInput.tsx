import { treeClusterIdQuery } from "@/api/queries";
import { getWateringStatusDetails } from "@/hooks/useDetailsForWateringStatus";
import { WateringStatus } from "@green-ecolution/backend-client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface TreeClusterWaterInputProps {
    clusterId: number
}

const TreeClusterWaterInput: React.FC<TreeClusterWaterInputProps> = ({
    clusterId
}) => {
    const { data: cluster } = useSuspenseQuery(treeClusterIdQuery(String(clusterId)))

    const statusDetails = getWateringStatusDetails(
        cluster.wateringStatus ?? WateringStatus.WateringStatusUnknown,
    );

    return (
        <div className="flex items-center gap-x-4">
            <div className="w-full flex justify-between gap-x-6 bg-white border border-dark-50 shadow-cards px-4 py-3 rounded-lg">
                <h3
                    className={`relative font-medium pl-7 before:absolute before:w-4 before:h-4 before:rounded-full before:left-0 before:top-[0.22rem] before:bg-${statusDetails.color}`}
                >
                    <strong className="font-semibold">Bewässerungsgruppe:</strong> {cluster.name} ·{" "}
                    {cluster.id}
                </h3>
            </div>
            <div className="flex items-center">
                <input
                    type="number"
                    className="w-full text-dark-800 border border-green-light rounded-lg bg-white px-4 py-3 focus:outline-green-dark"
                />
                <span className="ml-2">Liter</span>
            </div>
        </div>
    )
}
export default TreeClusterWaterInput