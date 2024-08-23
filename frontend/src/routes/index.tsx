import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="container mt-6">
      <article className="2xl:w-4/5">
        <h1 className="font-lato font-bold text-3xl mb-4 lg:text-4xl xl:text-5xl">
          Willkommen zurück, Vorname Nachname
        </h1>
        <p>
          Labore id duis minim nisi duis incididunt. Aliqua qui dolor laborum anim aliquip sit nulla eiusmod laboris excepteur sit non laboris do.
          Occaecat exercitation dolor irure fugiat ullamco elit cupidatat commodo fugiat consectetur. 
          Nisi id officia ullamco tempor anim quis duis proident culpa laborum.
        </p>
      </article>
    </div>
  )
}
