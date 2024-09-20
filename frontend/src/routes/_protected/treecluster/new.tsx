import PrimaryButton from '@/components/general/buttons/PrimaryButton';
import Input from '@/components/general/form/input';
import Select from '@/components/general/form/Select';
import Textarea from '@/components/general/form/Textarea';
import { Region } from '@/types/Region';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/treecluster/new')({
  component: NewTreecluster
})

function NewTreecluster() {

  const regionOptions = Object.values(Region).map(region => ({
    value: region,
    label: region,
  }));

  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Neue Bewässerungsgruppe erstellen
        </h1>
        <p className="mb-5">
          Labore est cillum aliqua do consectetur. 
          Do anim officia sunt magna nisi eiusmod sit excepteur qui aliqua duis irure in cillum cillum. 
          Velit id Lorem dolor irure. Ex dolor cillum nostrud occaecat ex nisi dolore tempor velit magna adipisicing et quis nulla. 
          Sunt esse esse nisi esse sunt dolore.
        </p>
      </article>


      <section className="mt-10">
        <form className="space-y-6">
          <Input 
            name="name"
            placeholder="Name"
            label="Name der Bewässerungsgruppe"
            required />
          <Input 
            name="address"
            placeholder="Straße"
            label="Straße"
            required />
          <Select 
            name="region"
            options={regionOptions}
            placeholder="Wählen Sie eine Region aus"
            label="Region in Flensburg"
            required />
          <Input 
            name="soil_condition"
            placeholder="Bodenbeschaffenheit"
            label="Bodenbeschaffenheit" />
          <Textarea 
            name="description"
            placeholder="Hier ist Platz für Notizen"
            label="Kurze Beschreibung" />
            
          <PrimaryButton type="submit" label="Speichern" className="mt-10" />
        </form>
      </section>
    </div>
  );
}

export default NewTreecluster;