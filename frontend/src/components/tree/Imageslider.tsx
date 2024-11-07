import React, { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

interface ImageSliderProps {
  images: string[]
}

const Imageslider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleImages, setVisibleImages] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleImages(4) // For large screens (desktop)
      } else if (window.innerWidth >= 768) {
        setVisibleImages(3) // For medium screens (tablet)
      } else {
        setVisibleImages(1) // For small screens (phone)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - visibleImages : prevIndex - 1
      )
    }
  }

  const goToNext = () => {
    if (currentIndex < images.length - visibleImages) {
      setCurrentIndex((prevIndex) =>
        prevIndex >= images.length - visibleImages ? 0 : prevIndex + 1
      )
    }
  }

  const displayedImages = images.slice(
    currentIndex,
    currentIndex + visibleImages
  )
  if (displayedImages.length < visibleImages) {
    displayedImages.push(
      ...images.slice(0, visibleImages - displayedImages.length)
    )
  }

  const totalImages = images.length
  const startIndex = currentIndex + 1
  const endIndex =
    currentIndex + visibleImages <= totalImages
      ? currentIndex + visibleImages
      : totalImages

  const rangeText =
    visibleImages === 1
      ? `${startIndex} von ${totalImages} Bildern`
      : `${startIndex}-${endIndex} von ${totalImages} Bildern`

  return (
    <div className="relative w-full">
      <h2 className="font-bold text-xl mb-4">Hinterlegte Bilder:</h2>

      <div className="flex space-x-4 mb-4 w-full">
        {displayedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${currentIndex + index + 1}`}
            className="w-full sm:w-1/3 md:w-1/4 h-auto rounded-lg shadow-lg object-cover"
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={goToPrevious}
          aria-label="Previous Images"
          disabled={currentIndex === 0}
          className={`flex items-center justify-center p-2 hover:bg-gray-200 transition ${currentIndex === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <ArrowLeft size={24} />
        </button>

        <span className="text-lg">{rangeText}</span>

        <button
          onClick={goToNext}
          aria-label="Next Images"
          disabled={currentIndex >= images.length - visibleImages}
          className={`flex items-center justify-center p-2 hover:bg-gray-200 transition ${currentIndex >= images.length - visibleImages ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default Imageslider
