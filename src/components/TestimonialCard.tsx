import { motion } from "framer-motion";
import { MapPin, Play } from "lucide-react";

interface TestimonialCardProps {
  clientName: string;
  location?: string;
  testimonial: string;
  clientImageUrl?: string;
  projectImageUrl?: string;
  videoUrl?: string;
  index?: number;
}

const TestimonialCard = ({
  clientName,
  location,
  testimonial,
  clientImageUrl,
  projectImageUrl,
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
      className={`bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 ${
        videoUrl ? "cursor-pointer" : ""
      }`}
    >
      {/* Project/House Photo with Play Button */}
      {projectImageUrl && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={projectImageUrl}
            alt={`${clientName}'s project`}
            className="w-full h-full object-cover"
          />
          {videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-lg hover:bg-accent transition-colors">
                <Play className="h-7 w-7 text-accent-foreground ml-1" fill="currentColor" />
              </div>
            </div>
          )}
          {/* Small client image overlapping at bottom center */}
          {clientImageUrl && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10">
              <div className="w-20 h-20 rounded-lg overflow-hidden border-4 border-card shadow-md">
                <img
                  src={clientImageUrl}
                  alt={clientName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Client Info & Feedback */}
      <div className={`p-5 text-center ${projectImageUrl && clientImageUrl ? "pt-12" : ""}`}>
        {/* If no project image, show client image inline */}
        {!projectImageUrl && clientImageUrl && (
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent mx-auto mb-3">
            <img src={clientImageUrl} alt={clientName} className="w-full h-full object-cover" />
          </div>
        )}
        <h3 className="text-lg font-display font-bold text-foreground">
          {clientName}
        </h3>
        {location && (
          <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        )}
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {testimonial}
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
