import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TreeclusterForm, TreeclusterSchema } from '@/schema/treeclusterSchema';
import { TreeclusterStore } from '@/store/treecluster/types';

export const useTreeClusterForm = (clusterState: TreeclusterStore, defaultValues: TreeclusterForm) => {

  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<TreeclusterForm>({
    resolver: zodResolver(TreeclusterSchema()),
    defaultValues,
  });

  const storeState = () => {
    const formData = getValues();
    clusterState.setName(formData.name);
    clusterState.setAddress(formData.address);
    clusterState.setSoilCondition(formData.soilCondition);
    clusterState.setDescription(formData.description);
  };

  return {
    defaultValues,
    reset,
    register,
    handleSubmit,
    errors,
    storeState,
  };
};