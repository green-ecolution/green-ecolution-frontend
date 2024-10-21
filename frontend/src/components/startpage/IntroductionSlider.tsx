import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { MapPin, PieChart } from "lucide-react";
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
        "Auswertung der durch Sensoren übermittelten Daten für eine bedarfsgerechte Bewässerung von Bäumen und Beeten.",
    },
    {
      label: "Augenmerk auf Jungbäume und Beete",
      icon: TreeIcon,
      description:
        "Jungbäume und Blumenbeete sind besonders hitzeanfällig und daher äußerst schutzbedürftig.",
    },
    {
      label: "Monitoring mehrerer Standorte",
      icon: MapPin,
      description:
        "Unter Verwendung des LoRaWan-Netzes können verschiedene Standorte überwacht und weitere einfach eingebunden werden.",
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
          className="splide--grid md:px-2"
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
