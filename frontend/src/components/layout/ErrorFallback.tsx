import Lottie from "lottie-react";
import cableAnimation from '../../animations/cableAnimation.json'
import React from "react";
import ButtonLink from "../general/links/ButtonLink";
import { MoveRight, RefreshCw } from "lucide-react";
import useStore from "@/store/store";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const { isAuthenticated } = useStore((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }))

  return (
    <>
      <figure aria-hidden="true" className="absolute top-0 inset-x-0 z-0">
        <Lottie className="h-[50vh]" animationData={cableAnimation} />
      </figure>
      <div className="mt-[45vh] mx-auto max-w-208 sm:mt-[50vh] xl:max-w-screen-lg">
        <section className="my-28 px-4 md:px-6 lg:my-36 xl:my-52">
          <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl lg:text-center xl:text-6xl">
            Upps, hier ist etwas schief gegangen!
          </h1>
          <p className="lg:text-center mb-10">
            Folgender Fehler ist passiert: {error.message}.
          </p>
          <div className="lg:flex lg:items-center lg:justify-center lg:gap-x-4">
            <button
              onClick={resetErrorBoundary}
              className={'bg-green-dark hover:bg-green-light text-white w-fit px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300'}
            >
              <span className="font-medium text-base">Nochmal versuchen</span>
              <RefreshCw/>
            </button>
            {isAuthenticated ? (
              <ButtonLink
                link={{ to: '/dashboard' }}
                label="Zum Dashboard"
                icon={MoveRight}
              />
            ) : (
              <ButtonLink
                link={{ to: '/' }}
                label="Zur Startseite"
                icon={MoveRight}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ErrorFallback;
