import PrimaryButton from '@/components/general/buttons/PrimaryButton';
import Input from '@/components/general/form/Input';
import Select from '@/components/general/form/Select';
import Textarea from '@/components/general/form/Textarea';
import { Region } from '@/types/Region';
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react';
import { clusterApi, EntitiesTreeSoilCondition, infoApi } from '@/api/backendApi'
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from 'react';
import { useAuthHeader } from '@/hooks/useAuthHeader';
import { SoilConditionOptions } from '@/types/SoilCondition';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createFileRoute('/_protected/treecluster/new')({
  component: NewTreecluster
})

const NewTreeClusterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  region: z.nativeEnum(Region).refine(value => 
    Object.values(Region).includes(value),
    { message: 'Invalid soil condition' }
  ),
  description: z.string().min(1, 'Description is required').optional(),
  soilCondition: z.nativeEnum(EntitiesTreeSoilCondition).refine(value => 
    Object.values(EntitiesTreeSoilCondition).includes(value),
    { message: 'Invalid soil condition' }
  ),
});

interface NewTreeClusterForm {
  name: string;
  address: string;
  region: Region;
  description: string;
  soilCondition: EntitiesTreeSoilCondition;
}

function NewTreecluster() {
  const [selectedTrees] = useState<number[]>([]);
  const authorization = useAuthHeader();

  const regionOptions = Object.values(Region).map(region => ({
    value: region,
    label: region,
  }));

  const { register, handleSubmit, formState: { errors } } = useForm<NewTreeClusterForm>({
    resolver: zodResolver(NewTreeClusterSchema),
  });

  const onSubmit: SubmitHandler<NewTreeClusterForm> = async (data) => {
    try {
      await infoApi.getAppInfo({ authorization });
  
      const clusterData = {
        ...data,
        treeIds: selectedTrees,
      };
      
      const response = await clusterApi.createTreeCluster({
        authorization,
        body: clusterData,
      });
  
      console.log('Tree cluster created:', response);
    } catch (error) {
      console.error('Failed to create tree cluster:', error);
    }
  };
  
  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neue Bewässerungsgruppe erstellen
        </h1>
        <p className="mb-5">
          Labore est cillum aliqua do consectetur. 
          Do anim officia sunt magna nisi eiusmod sit excepteur qui aliqua duis irure in cillum cillum. 
        </p>
      </article>

      <section className="mt-10">
        <form className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Input<NewTreeClusterForm>
              name="name"
              placeholder="Name"
              label="Name der Bewässerungsgruppe"
              required
              register={register}
              error={errors.name?.message}
            />
            <Input<NewTreeClusterForm>
              name="address"
              placeholder="Straße"
              label="Straße"
              required
              register={register}
              error={errors.address?.message}
            />
            <Select<NewTreeClusterForm>
              name="region"
              options={regionOptions}
              placeholder="Wählen Sie eine Region aus"
              label="Region in Flensburg"
              required
              register={register}
              error={errors.region?.message}
            />
            <Select<NewTreeClusterForm>
              name="soilCondition"
              options={SoilConditionOptions}
              placeholder="Wählen Sie eine Bodenbeschaffenheit aus"
              label="Bodenbeschaffenheit"
              required
              register={register}
              error={errors.soilCondition?.message}
            />
            <Textarea<NewTreeClusterForm>
              name="description"
              placeholder="Hier ist Platz für Notizen"
              label="Kurze Beschreibung"
              required
              register={register}
              error={errors.description?.message}
            />
          </div>

          <div>
            <p className="block font-semibold text-dark-800 mb-2.5">
              Zugehörige Bäume <span className="text-red">*</span>
            </p>
            {selectedTrees.length === 0 ? (
              <p className="text-dark-600 font-semibold font-lato">
                Es wurden noch keine Bäume ausgewählt.
              </p>
            ) : (
              <p>
                Bäume wurden ausgewählt.
              </p>
            )}
            <button type="button" className="mt-6 border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark">
              <span className="font-medium">Bäume hinzufügen</span>
              <Plus className="text-current" />
            </button>
          </div>
          
          <PrimaryButton type="submit" label="Speichern" className="mt-10 lg:col-span-full lg:w-fit" />
        </form>
      </section>
    </div>
  );
}

export default NewTreecluster;
