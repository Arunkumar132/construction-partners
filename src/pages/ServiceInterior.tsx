import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Paintbrush,
  Palette,
  Lightbulb,
  Sofa,
  Ruler,
  Eye,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import serviceInterior from "@/assets/service-interior.avif";

const features = [
  {
    icon: Palette,
    title: "Space Planning",
    description:
      "Smartly optimized layouts to enhance comfort, utility, and natural flow within every room.",
  },
  {
    icon: Sofa,
    title: "Custom Furniture Design",
    description:
      "Tailor-made furniture pieces designed to reflect your personality and fit your space perfectly.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description:
      "Layered lighting plans that highlight key design features and create the right mood.",
  },
  {
    icon: Ruler,
    title: "Material Selection",
    description:
      "Sourcing premium, sustainable materials that combine durability with aesthetic appeal.",
  },
  {
    icon: Paintbrush,
    title: "Color Consultation",
    description:
      "Expertly curated color palettes that harmonize with your architecture and lifestyle.",
  },
  {
    icon: Eye,
    title: "3D Visualization",
    description:
      "Photo realistic 3D renders that let you preview and fine tune your dream interiors before execution.",
  },
];

const process = [
  { step: "", title: "Initial Consultation", description: "We begin by understanding your goals, taste, and budget." },
  { step: "", title: "Concept Development", description: "Our designers craft initial ideas and visual direction." },
  { step: "", title: "Design Refinement", description: "Detailed drawings and 3D mockups for your approval." },
  { step: "", title: "Material Procurement", description: "Curating and sourcing premium materials and furnishings." },
  { step: "", title: "Execution", description: "Seamless implementation handled by expert craftsmen." },
  { step: "", title: "Final Styling", description: "The finishing touches that make your space truly yours." },
];

const ServiceInterior = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={serviceInterior}
            alt="Interior Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-overlay-gradient" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>

            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
              Interior Design
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Crafting Beautiful
              <span className="text-gradient-accent block">Living Spaces</span>
            </h1>

            <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl">
              Transform your interiors with timeless designs that blend modern functionality
              and traditional Indian elegance.
            </p>

            <Button variant="hero" size="xl" className="mt-6" asChild>
              <Link to="/contact">
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="What We Offer"
            title="Our Interior Design Services"
            subtitle="Complete design and decor solutions for every kind of space"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="Our Process"
            title="How We Work"
            subtitle="From idea to reality — a structured design journey"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-card rounded-xl p-6 shadow-card"
              >
                <div className="absolute -top-4 -left-2 text-6xl font-display font-bold text-accent/10">
                  {item.step}
                </div>
                <div className="relative">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-3">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-6">
              Let’s bring your vision to life with interiors that are functional, elegant
              and uniquely yours.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceInterior;
