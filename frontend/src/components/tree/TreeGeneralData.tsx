import { Tree } from '@green-ecolution/backend-client'
import { format } from 'date-fns'
import Imageslider from '@/components/tree/Imageslider' // Import the ImageSlider component

// Import local images
import image1 from '@/images/image1.jpg'
import image2 from '@/images/image2.jpg'
import image3 from '@/images/image3.jpg'
import image4 from '@/images/image4.jpg'
import image5 from '@/images/image5.jpg'

interface TreeGeneralData {
  tree?: Tree
}

const TreeGeneralData: React.FC<TreeGeneralData> = ({ tree }) => {
  const updatedDate = tree?.updatedAt
    ? format(new Date(tree?.updatedAt), 'dd.MM.yyyy')
    : 'Keine Angabe'

  const treeData = [
    {
      label: 'Baumart',
      value: tree?.species ?? 'Keine Angabe',
    },
    {
      label: 'Pflanzjahr',
      value: tree?.plantingYear ?? 'Keine Angabe',
    },
    {
      label: 'Art der Erstellung',
      value: tree?.readonly ? 'importiert' : 'Manuell erstellt',
    },
    {
      label: 'Latitude',
      value: tree?.latitude ?? 'Keine Angabe',
    },
    {
      label: 'Longitude',
      value: tree?.longitude ?? 'Keine Angabe',
    },
    {
      label: 'Letztes Update',
      value: updatedDate,
    },
  ]

  const localImages = [image1, image2, image3, image4, image5]

  return (
    <>
      <dl className="text-lg md:columns-2 md:gap-x-11">
        {treeData.map((data, index) => (
          <div
            key={index}
            className={`py-4 border-b border-b-dark-200 group md:last:border-b-transparent 
              ${treeData.length / 2 === index + 1 ? 'md:border-b-transparent' : ''}`}
          >
            <dt className="font-bold sm:inline">{data.label}:</dt>
            <dd className="sm:inline sm:px-2">{data.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-16">
        <Imageslider images={localImages} />
      </section>
    </>
  )
}

export default TreeGeneralData
