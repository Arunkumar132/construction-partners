import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface TestimonialCardProps {
  clientName: string;
  location?: string;
  testimonial: string;
  clientImageUrl?: string;
  index?: number;
}

const TestimonialCard = ({
  clientName,
  location,
  testimonial,
  clientImageUrl,
  index = 0,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 p-6"
    >
      <div className="flex items-start gap-4">
        {/* Client Image */}
        <div className="shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
            <img
              src={clientImageUrl || "/placeholder.svg"}
              alt={clientName}
              className="w-full h-full object-cover"
            />
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
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
