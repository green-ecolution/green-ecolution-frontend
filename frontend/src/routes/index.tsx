import ButtonLink from '@/components/general/links/ButtonLink'
import IntroductionSlider from '@/components/startpage/IntroductionSlider'
import { createFileRoute } from '@tanstack/react-router'
import { Mail, MoveRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Startpage,
})

function Startpage() {
  return (
    <>
      <article className="container mt-10 lg:mt-20 mb-10 2xl:w-4/5 text-center">
        <h1 className="font-lato font-bold text-4xl mb-4 lg:text-5xl xl:text-6xl">
          Willkommen beim smarten Grünflächen&shy;management
        </h1>
        <p className="max-w-screen-md mx-auto">
          Labore id duis minim nisi duis incididunt. Aliqua qui dolor laborum anim aliquip sit nulla eiusmod laboris excepteur sit non laboris do.
          Occaecat exercitation dolor irure fugiat ullamco elit cupidatat commodo fugiat consectetur.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-6 mt-10">
          <ButtonLink
            url="/login"
            label="Einloggen"
            icon={MoveRight} />
          <a
            href="mailto:info@green-ecolution.de"
            className="bg-green-dark w-fit text-white px-5 py-2 group flex gap-x-3 rounded-xl items-center transition-all ease-in-out duration-300 hover:bg-green-light"
          >
            Kontakt
            <Mail />
          </a>
        </div>
      </article>

      <IntroductionSlider />
    </>
  )
}