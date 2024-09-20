import React, { useState } from 'react';
import PrimaryButton from '@/components/general/buttons/PrimaryButton';
import Input from '@/components/general/form/input';
import Select from '@/components/general/form/Select';
import Textarea from '@/components/general/form/Textarea';
import { Region } from '@/types/Region';
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/_protected/treecluster/new')({
  component: NewTreecluster
})

function NewTreecluster() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    region: '',
    soil_condition: '',
    description: '',
  });
  const [selectedTrees, setSelectedTrees] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const regionOptions = Object.values(Region).map(region => ({
    value: region,
    label: region,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function fetchContent() {
    const apiUrl: string = `/api/v1/cluster`;

    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // Add authentication token here if needed
      },
      body: JSON.stringify({
        ...formData,
        tree_ids: selectedTrees,
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setFormSubmitted(true);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Failed to submit form:", error.message);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchContent();
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
        <form className="lg:grid lg:grid-cols-2 lg:gap-x-11" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Input 
              name="name"
              placeholder="Name"
              label="Name der Bewässerungsgruppe"
              required
              onChange={handleInputChange}
            />
            <Input 
              name="address"
              placeholder="Straße"
              label="Straße"
              required
              onChange={handleInputChange}
            />
            <Select 
              name="region"
              options={regionOptions}
              placeholder="Wählen Sie eine Region aus"
              label="Region in Flensburg"
              required
              onChange={handleInputChange}
            />
            <Input 
              name="soil_condition"
              placeholder="Bodenbeschaffenheit"
              label="Bodenbeschaffenheit"
              onChange={handleInputChange}
            />
            <Textarea 
              name="description"
              placeholder="Hier ist Platz für Notizen"
              label="Kurze Beschreibung"
              onChange={handleInputChange}
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
