import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { fetchImages } from '../services/Contentful/contentfulImages';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    width: '100%',            
    height: '500px',          
    overflow: 'hidden',       
    borderRadius: '8px',      
    position: 'relative',
  }
  
})

const ImageBox: React.FC = () => {

  const classes = useStyles();
  const [images, setImages] = useState<string[]>([]); // Array of image URLs
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // Index for the current image
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop over images
    }, 5000); // Change image every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [images.length]); // Dependency on images length to avoid unnecessary rerenders

  if (isLoading) {
    return <Typography>Loading images...</Typography>;
  }

  if (images.length === 0) {
    return <Typography>No images found.</Typography>;
  }

  return (
    <div className="image-box-container" style={{ textAlign: 'center' }}>
      <Paper
        elevation={3}
        className={classes.paper}
      >
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          style={{
            width: 'auto',            // Ensure image fills the container width
            height: '100%',           // Ensure image fills the container height
            objectFit: 'contain',       // Maintain aspect ratio, but crop if needed
            transition: 'opacity 1s ease-in-out', // Smooth fade transition
          }}
        />
      </Paper>
    </div>
  );
};

export default ImageBox;
