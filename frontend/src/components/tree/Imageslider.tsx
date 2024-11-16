import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

interface ImageSliderProps {
  images: string[];
}

const Imageslider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(4);

  const options = {
    type: 'slide',
    perPage: visibleImages,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    arrows: false,
  };

  const splideRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleImages(4);
      } else if (window.innerWidth >= 1024) {
        setVisibleImages(3);
      } else if (window.innerWidth >= 768) {
        setVisibleImages(2);
      } else {
        setVisibleImages(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMoved = (splide: any) => {
    setCurrentIndex(splide.index);
  };

  return (
    <div className="relative w-full">
      <h2 className="font-bold text-xl mb-4">Hinterlegte Bilder:</h2>

      <Splide
        options={options}
        aria-label="Image Slider"
        ref={splideRef}
        onMoved={handleMoved}
        className="w-full"
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full aspect-square object-cover rounded-lg shadow-lg"
            />
          </SplideSlide>
        ))}
      </Splide>

      {images.length > 1 && (
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => splideRef.current?.splide?.go('<')}
            aria-label="Previous Images"
            disabled={currentIndex === 0}
            className={`flex items-center justify-center p-2 hover:bg-gray-200 transition ${
              currentIndex === 0 ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <ArrowLeft size={24} />
          </button>
          <span className="text-lg">
            {`${currentIndex + 1}-${Math.min(
              currentIndex + visibleImages,
              images.length
            )} von ${images.length} Bildern`}
          </span>
          <button
            onClick={() => splideRef.current?.splide?.go('>')}
            aria-label="Next Images"
            disabled={currentIndex >= images.length - visibleImages}
            className={`flex items-center justify-center p-2 hover:bg-gray-200 transition ${
              currentIndex >= images.length - visibleImages
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Imageslider;