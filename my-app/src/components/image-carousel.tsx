import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@mui/material';
import { fetchImages } from '../services/Contentful/contentfulImages';

const ImageCarousel: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // Array of image URLs
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getImages = async () => {
      const imagesFromApi = await fetchImages();
      if (imagesFromApi.length > 0) {
        setImages(imagesFromApi);
      }
      setIsLoading(false);
    };

    getImages();
  }, []);

  if (isLoading) {
    return <Typography>Loading images...</Typography>;
  }

  if (images.length === 0) {
    return <Typography>No images found.</Typography>;
  }

  return (
    <div className="carousel-container">
      <Carousel
        navButtonsAlwaysVisible
        indicators={false}
        autoPlay
        interval={4000}
        animation="slide"
      >
        {images.map((imageUrl, index) => (
          <Paper key={index}>
            <img
              src={imageUrl}
              alt={`Carousel Image ${index + 1}`}
              style={{
                width: '100%',            // Make image fill the container width
                height: '350px',          // Fixed height (adjust as needed)
                objectFit: 'cover',       // Ensure the aspect ratio is maintained, but image is cropped if necessary
                borderRadius: 8,          // Optional: Rounded corners
              }}
            />
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;