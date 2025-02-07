import React, { useState, useEffect } from 'react';
import { CreateMediaImagePropsInterface } from '../../types/create-media-images-interface';
import { MediaImagesContainer } from '../media-images-container';
import { Backdrop } from '../../types/media-images-interface';

const CreateMediaImages: React.FC<CreateMediaImagePropsInterface> = ({ media, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || (!media.posters && !media.backdrops)) {
    return null;
  }

  const images: Backdrop[] = [...media.backdrops, ...media.posters];

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="flex items-center justify-center relative w-full h-80 md:h-full ">
      {images.length > 1 ? (
        images.map((mediaImg, index) => (
          <MediaImagesContainer
            image={mediaImg}
            key={index}
            className={`absolute w-full md:w-4/5 h-full transition-opacity duration-[2500ms] ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))
      ) : (
        <h3>There are no additional posters</h3>
      )}
    </div>
  );
};

export { CreateMediaImages };