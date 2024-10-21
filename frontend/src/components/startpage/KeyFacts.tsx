import { BadgeCheck } from "lucide-react";

const KeyFacts = () => {
  // TODO: add real data
  const numbers = [
    "800+ Bäume",
    "40+ Bewässerungsgruppen",
    "20+ Routen",
  ];
  return (
    <section className="container mt-20 lg:mt-28">
      <h2 className="text-sm font-semibold text-dark-800 mb-4 lg:text-center">
        Green Ecolution in Nummern:
      </h2>
      <ul className="space-y-4 lg:space-y-0 lg:flex lg:justify-center lg:gap-x-10">
        {numbers.map((number, key) => (
          <li key={key} className="flex items-center gap-x-4">
            <BadgeCheck className="text-green-light w-8 h-8" />
            <p className="font-semibold text-lg">{number}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default KeyFacts;
