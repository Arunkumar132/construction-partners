import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { Skeleton } from "@/components/ui/skeleton";

const TestimonialsSection = () => {
  const { testimonials, isLoading } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide for mobile
  useEffect(() => {
    if (!isLoading && testimonials.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length, isLoading]);

  if (isLoading) {
    return (
      <section className="pt-4 pb-10 md:pt-6 md:pb-12 bg-muted relative overflow-hidden">
        <div className="container-custom">
          <SectionHeading
            badge="Testimonials"
            title="Hear from our happy customers"
          />
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden p-5">
                <div className="flex gap-4">
                  <Skeleton className="w-14 h-14 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-14 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-12 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-80 h-80 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading
          badge="Testimonials"
          title="Hear from our happy customers"
          subtitle="Real stories from clients who trusted us with their construction dreams"
        />

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id}>
              <TestimonialCard
                clientName={testimonial.client_name}
                location={testimonial.location || undefined}
                testimonial={testimonial.testimonial}
                clientImageUrl={testimonial.client_image_url || undefined}
                projectImageUrl={(testimonial as any).project_image_url || undefined}
                videoUrl={testimonial.video_url || undefined}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Mobile View Slider */}
        <div className="md:hidden mt-8 overflow-hidden relative min-h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full px-12"
            >
              <TestimonialCard
                clientName={testimonials[currentIndex].client_name}
                location={testimonials[currentIndex].location || undefined}
                testimonial={testimonials[currentIndex].testimonial}
                clientImageUrl={testimonials[currentIndex].client_image_url || undefined}
                projectImageUrl={(testimonials[currentIndex] as any).project_image_url || undefined}
                videoUrl={testimonials[currentIndex].video_url || undefined}
                index={currentIndex}
              />
              
              {/* Arrows outside the box, positioned "below the image" area */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                }}
                className="absolute left-1 top-[65%] -translate-y-1/2 w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center backdrop-blur-sm z-30 shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) => (prev + 1) % testimonials.length);
                }}
                className="absolute right-1 top-[65%] -translate-y-1/2 w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center backdrop-blur-sm z-30 shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
