import { TreeForm } from '@/schema/treeSchema'
import { FormForProps } from './FormForTreecluster'
import Input from './types/Input'
import Select from './types/Select'
import { Sensor, TreeCluster } from '@/api/backendApi'
import Textarea from './types/Textarea'
import { MapPin } from 'lucide-react'
import PrimaryButton from '../buttons/PrimaryButton'
import useFormStore, { FormStore } from '@/store/form/useFormStore'
import FormError from './FormError'

interface FormForTreeProps extends FormForProps<TreeForm> {
  isReadonly: boolean
  treeClusters: TreeCluster[]
  sensors: Sensor[]
  onChangeLocation: () => void
}

const FormForTree = (props: FormForTreeProps) => {
  const { lat, lng } = useFormStore((state: FormStore<TreeForm>) => ({
    lat: state.form?.latitude ?? 0,
    lng: state.form?.longitude ?? 0,
  }))

  const { errors, isValid } = props.formState

  return (
    <form
      className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-11"
      onSubmit={() => void props.handleSubmit(props.onSubmit)}
    >
      <div className="space-y-6">
        {!props.isReadonly && (
          <Input
            placeholder="Baumnummer"
            label="Baumnummer"
            required
            error={errors.number?.message}
            {...props.register('number')}
          />
        )}
        {!props.isReadonly && (
          <Input
            placeholder="Baumart"
            label="Baumart"
            required
            error={errors.species?.message}
            {...props.register('species')}
          />
        )}
        {!props.isReadonly && (
          <Input
            placeholder="Pflanzjahr"
            label="Pflanzjahr"
            type="number"
            error={errors.plantingYear?.message}
            required
            {...props.register('plantingYear')}
          />
        )}
        {!props.isReadonly && (
          <Select
            options={[
              { label: 'Keine Bewässerungsgruppe', value: '-1' },
              ...props.treeClusters.map((cluster) => ({
                label: cluster.name,
                value: cluster.id.toString(),
              })),
            ]}
            placeholder="Wählen Sie eine Bewässerungsgruppe aus"
            label="Bewässerungsgruppe"
            error={errors.treeClusterId?.message}
            {...props.register('treeClusterId')}
          />
        )}
        <Select
          options={[
            { label: 'Kein Sensor', value: '-1' },
            ...props.sensors.map((sensor) => ({
              label: `Sensor ${sensor.id.toString()}`,
              value: sensor.id.toString(),
            })),
          ]}
          placeholder="Wählen Sie einen Sensor aus, sofern vorhanden"
          label="Verknüpfter Sensor"
          error={errors.sensorId?.message}
          {...props.register('sensorId')}
        />
        <Textarea
          placeholder="Hier ist Platz für Notizen"
          label="Kurze Beschreibung"
          error={errors.description?.message}
          {...props.register('description')}
        />
      </div>

      {!props.isReadonly && (
        <div>
          <p className="block font-semibold text-dark-800 mb-2.5">Standort des Baumes</p>
          <div>
            <p className="block mb-2.5">
              <strong className="text-dark-800">Breitengrad:</strong> {lat}
            </p>
            <p className="block mb-2.5">
              <strong className="text-dark-800 font-semibold">Längengrad:</strong> {lng}
            </p>
          </div>

          <button
            type="button"
            className="mt-6 w-fit border border-green-light text-dark-800 px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:border-green-dark hover:text-dark"
            onClick={props.onChangeLocation}
          >
            <span className="font-medium">Standort des Baumes anpassen</span>
            <MapPin className="text-current" />
          </button>
        </div>
      )}

      <FormError show={props.displayError} error={props.errorMessage} />

      <PrimaryButton
        type="submit"
        label="Speichern"
        className="mt-10 lg:col-span-full lg:w-fit"
        disabled={!isValid}
      />
    </form>
  )
}

export default FormForTree
