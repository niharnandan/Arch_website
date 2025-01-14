import { makeStyles } from '@mui/styles';
import { SetStateAction, useEffect, useState, useRef } from 'react';
import { fetchImages } from '../services/Contentful/contentfulImages';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Paper, useTheme } from '@mui/material';

const useStyles = makeStyles({
  slideContainer: {
    display: 'flex',
    transition: 'transform 1s ease-in-out',
    width: '100%',
    borderRadius: '12px', // Apply rounded edges to the Paper
    height: '100%',
  },
  slideStyles: {
    width: '100%',
    height: '50vh',
    flexShrink: 0,
  },
  rightArrowStyles: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '0px',
    fontSize: '45px',
    zIndex: 1,
    cursor: 'pointer',
  },
  leftArrowStyles: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '0px',
    fontSize: '45px',
    zIndex: 1,
    cursor: 'pointer',
  },
  sliderStyles: {
    position: 'relative',
    height: '500px',
    overflow: 'hidden',
  },
  dotsContainerStyles: {
    display: 'flex',
    justifyContent: 'center',
  },
  dotStyle: {
    margin: '0 3px',
    cursor: 'pointer',
    fontSize: '20px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'opacity 1s ease-in-out',
  },
});

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const intervalId = useRef<NodeJS.Timeout | null>(null); // Using useRef to store the interval ID

  const classes = useStyles();
  const theme = useTheme(); // Get the current theme

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    resetInterval();
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  };

  useEffect(() => {
    const getImages = async () => {
      const imagesFromApi = await fetchImages();
      if (imagesFromApi.length > 0) {
        setImages(imagesFromApi);
      }
    };

    getImages();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [images.length]);

  return (
    <div className={classes.sliderStyles}>
      <div>
        <div onClick={goToPrevious} className={classes.leftArrowStyles}>
          <ArrowLeftIcon
            sx={{
              fontSize: 100,
              color: theme.palette.mode === 'light' ? 'darkgrey' : 'white',
            }}
          />
        </div>
        <div onClick={goToNext} className={classes.rightArrowStyles}>
          <ArrowRightIcon
            sx={{
              fontSize: 100,
              color: theme.palette.mode === 'light' ? 'darkgrey' : 'white',
            }}
          />
        </div>
      </div>

      <div
        className={classes.slideContainer}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((slide: string, index: number) => (
          <Paper
            key={index}
            elevation={3}
            className={classes.slideStyles}
            style={{ height: 'auto' }}
          >
            <img src={slide} alt={`slide ${index}`} className={classes.image} />
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
