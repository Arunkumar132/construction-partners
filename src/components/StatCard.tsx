import { motion } from "framer-motion";

interface StatCardProps {
  number: string;
  label: string;
  suffix?: string;
  delay?: number;
  labelColor?: "white" | "dark";
}

const StatCard = ({ number, label, suffix = "", delay = 0, labelColor = "white" }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent">
        {number}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className={`mt-2 font-medium ${labelColor === "dark" ? "text-muted-foreground" : "text-white"}`}>{label}</p>
    </motion.div>
  );
};

export default StatCard;
