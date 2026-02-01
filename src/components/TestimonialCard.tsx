import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface TestimonialCardProps {
  clientName: string;
  location?: string;
  testimonial: string;
  projectImageUrl?: string;
  clientImageUrl?: string;
  videoUrl?: string;
  index?: number;
}

const TestimonialCard = ({
  clientName,
  location,
  testimonial,
  projectImageUrl,
  clientImageUrl,
  videoUrl,
  index = 0,
}: TestimonialCardProps) => {
  const handleVideoClick = () => {
    if (videoUrl) {
      window.open(videoUrl, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Project Image with Video Button */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={projectImageUrl || "/placeholder.svg"}
          alt={`Project by ${clientName}`}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button */}
        {videoUrl && (
          <button
            onClick={handleVideoClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent/90 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <Play className="h-7 w-7 text-accent-foreground fill-accent-foreground ml-1" />
          </button>
        )}

        {/* Client Image Overlay */}
        {clientImageUrl && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-card shadow-lg">
              <img
                src={clientImageUrl}
                alt={clientName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-display font-bold text-foreground">
          {clientName}
        </h3>
        {location && (
          <p className="text-muted-foreground text-sm mt-1">{location}</p>
        )}
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          {testimonial}
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
