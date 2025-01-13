import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { fetchImages } from '../services/Contentful/contentfulImages';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: '8px',
    position: 'relative',
    maxWidth: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 'auto',
    height: '500px',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    transition: 'opacity 1s ease-in-out',
  },
});

const ImageBox: React.FC = () => {
  const classes = useStyles();
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
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
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  if (isLoading) {
    return <Typography>Loading images...</Typography>;
  }

  if (images.length === 0) {
    return <Typography>No images found.</Typography>;
  }

  return (
    <div>
      <Paper elevation={3} className={classes.paper} style={{ height: 'auto' }}>
        <img
          src={images[currentImageIndex]}
          alt={`demo ${currentImageIndex + 1}`}
          className={classes.image}
        />
      </Paper>
    </div>
  );
};

export default ImageBox;
