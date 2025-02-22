import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Car, MapPin, PieChart, Route } from "lucide-react";
import IntroductionCard from "../general/cards/IntroductionCard";
import SensorIcon from "../icons/Sensor";
import TreeIcon from "../icons/Tree";
import { i18nTranslated } from "../../lib/sliderTranslations";

const IntroductionSlider = () => {
  const facts = [
    {
      label: "Entwicklung einer Sensorlösung",
      icon: SensorIcon,
      description:
        "Daten zur Bodenfeuchte werden mithilfe von in unterschiedlicher Tiefe platzierten Sensoren geliefert.",
    },
    {
      label: "Auswertung der Messdaten",
      icon: PieChart,
      description:
        "Auswertung der durch Sensoren übermittelten Daten für eine bedarfsgerechte Bewässerung von Bäumen.",
    },
    {
      label: "Augenmerk auf Jungbäume",
      icon: TreeIcon,
      description:
        "Jungbäume sind besonders hitzeanfällig und daher äußerst schutzbedürftig. Aus diesem Grund werden Bäume in deren ersten drei Standjahren überwacht.",
    },
    {
      label: "Monitoring mehrerer Standorte",
      icon: MapPin,
      description:
        "Unter Verwendung des LoRaWan-Netzes können verschiedene Standorte überwacht und weitere einfach eingebunden werden.",
    },
    {
      label: "Vereifachten Einsatzplanung",
      icon: Car,
      description:
        "Einsatzfahrten zur Bewässerung können digital und schnell geplant werden. Dabei können Informationen wie die Mitarbeitenden und genutzte Fahrzeuge und deren Wasserkapazität hinterlegt werden.",
    },
    {
      label: "Dynamische Routenplanung",
      icon: Route,
      description:
        "Eine Anbindung an Valhalla (Open Source Routing System) ermöglicht uns die dynamische Berechnung von Bewässerungsrouten.",
    },
  ];

  const breakpoints = {
    640: {
      perPage: 2,
    },
    1024: {
      destroy: true,
    },
  };

  return (
    <section className="container my-20 lg:my-28">
      <div className="rounded-xl bg-green-dark-100 p-6 md:p-10 lg:pb-6">
        <h2 className="font-bold font-lato text-xl mb-6 text-green-dark md:px-2">
          Alle Funktionen auf einem Blick
        </h2>
        <Splide
          options={{
            rewind: true,
            arrows: false,
            i18n: i18nTranslated,
            mediaQuery: "min",
            gap: "1rem",
            breakpoints: breakpoints,
          }}
          aria-label="Fakten zum Grünflächenmanagement"
          className="splide--grid-small md:px-2"
        >
          {facts.map((fact, key) => (
            <SplideSlide key={key} className="pb-10 lg:pb-0">
              <IntroductionCard
                label={fact.label}
                icon={fact.icon}
                description={fact.description} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default IntroductionSlider;
