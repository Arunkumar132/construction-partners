import { motion } from "framer-motion";
import { MapPin, Play } from "lucide-react";

interface TestimonialCardProps {
  clientName: string;
  location?: string;
  testimonial: string;
  clientImageUrl?: string;
  videoUrl?: string;
  index?: number;
}

const TestimonialCard = ({
  clientName,
  location,
  testimonial,
  clientImageUrl,
  videoUrl,
  index = 0,
}: TestimonialCardProps) => {
  const handleClick = () => {
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
      onClick={handleClick}
      className={`bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 p-6 ${
        videoUrl ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Client Image */}
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent relative">
            <img
              src={clientImageUrl || "/placeholder.svg"}
              alt={clientName}
              className="w-full h-full object-cover"
            />
            {videoUrl && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-display font-bold text-foreground">
            {clientName}
          </h3>
          {location && (
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          )}
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            "{testimonial}"
          </p>
          {videoUrl && (
            <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-3">
              <Play className="h-4 w-4" />
              Watch Video
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
