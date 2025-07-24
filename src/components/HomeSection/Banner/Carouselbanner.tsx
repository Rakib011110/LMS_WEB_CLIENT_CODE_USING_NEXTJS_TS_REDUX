"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

// New set of tech-related images with a "cover" aspect ratio
const bannerImages = [
  "https://www.caddcore.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbkwiwoll%2Fimage%2Fupload%2Fv1746349680%2FArtboard_1_1_-Picsart-AiImageEnhancer_dccum8.png&w=2048&q=75",
  "https://www.caddcore.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbkwiwoll%2Fimage%2Fupload%2Fv1746349680%2FArtboard_1_1_-Picsart-AiImageEnhancer_dccum8.png&w=2048&q=75",
  "https://www.caddcore.net/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdbkwiwoll%2Fimage%2Fupload%2Fv1746349680%2FArtboard_1_1_-Picsart-AiImageEnhancer_dccum8.png&w=2048&q=75",
 
];

/**
 * SliderBanner Component
 * A header carousel with drag-to-change, auto-play, and indicator dots.
 * The height is dynamic based on the image aspect ratio.
 */
export const CarouselBanner = () => {
  const [[page, direction], setPage] = React.useState([0, 0]);

  // The 'wrap' function from popmotion allows us to loop through the images infinitely
  const imageIndex = wrap(0, bannerImages.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Corrected useEffect for reliable auto-sliding.
  // By using an empty dependency array `[]`, this effect runs only once on mount.
  // We use the functional form of setPage to prevent stale state within the interval closure.
  // This ensures the loop continues indefinitely without being reset by user interactions.
  React.useEffect(() => {
    const interval = setInterval(() => {
      // We pass a function to setPage to get the latest state.
      // We set the direction to 1 to always slide to the next image.
      setPage(([currentPage]) => [currentPage + 1, 1]);
    }, 5000); // 5000ms = 5 seconds
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the interval is not reset on re-renders.

  // Animation variants that change based on the direction of pagination
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Threshold for the drag gesture to trigger a slide change
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing mb-10">
      {/* This invisible image acts as a spacer. 
        It sets the container's height based on the current image's aspect ratio.
      */}
      <img src={bannerImages[imageIndex]} alt="" aria-hidden="true" className="w-full h-auto invisible" />

      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={bannerImages[imageIndex]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute top-0 left-0  w-full object-cover"
          alt={`Banner image ${imageIndex + 1}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      
      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {bannerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition ${imageIndex === i ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Optional: Add a subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Optional: Add text or other content on top of the banner */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
          Explore Technology
        </h1>
      </div>
    </div>
  );
};

