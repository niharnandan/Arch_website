import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { fetchImages } from '../services/Contentful/contentfulImages';
import { clsx } from 'clsx';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetInterval();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      resetInterval();
    } else {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
  };

  const resetInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    if (isPlaying) {
      intervalId.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }
  };

  useEffect(() => {
    const getImages = async () => {
      const imagesFromApi = await fetchImages();
      if (imagesFromApi.length > 0) {
        setImages(imagesFromApi);
        setImageLoaded(new Array(imagesFromApi.length).fill(false));
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
    if (images.length > 0) {
      resetInterval();
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [images.length, isPlaying]);

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  if (images.length === 0) {
    return (
      <div className="relative h-[500px] w-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading portfolio images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full group animate-fade-in">
      {/* Main Slider Container */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl bg-black">
        {/* Image Container */}
        <div 
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative"
            >
              {/* Loading Skeleton */}
              {!imageLoaded[index] && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
              )}
              
              {/* Image */}
              <img
                src={image}
                alt={`Architecture showcase ${index + 1}`}
                className={clsx(
                  "w-full h-full object-cover transition-all duration-500",
                  imageLoaded[index] ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => handleImageLoad(index)}
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass-effect text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass-effect text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 p-2 rounded-full glass-effect text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-effect text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={clsx(
              "w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125",
              index === currentIndex
                ? "bg-blue-500 dark:bg-blue-400 shadow-lg shadow-blue-500/50"
                : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="mt-4 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress"
          />
        </div>
      )}
    </div>
  );
};

export default ImageSlider;