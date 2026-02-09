import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import heroSlide1 from "@/assets/hero-slide-1.avif";
import heroSlide2 from "@/assets/hero-slide-2.avif";
import heroSlide3 from "@/assets/hero-slide-3.avif";

const fallbackSlides = [heroSlide1, heroSlide2, heroSlide3];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { slides: dbSlides, isLoading } = useHeroSlides();

  const slideUrls = dbSlides.length > 0 ? dbSlides.map(s => s.image_url) : fallbackSlides;

  useEffect(() => {
    if (slideUrls.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideUrls.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideUrls.length]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [dbSlides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={slideUrls[currentSlide]}
          alt="Construction showcase"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full object-cover absolute inset-0"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-overlay-gradient" />
      
      {slideUrls.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slideUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-accent w-8" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlideshow;
