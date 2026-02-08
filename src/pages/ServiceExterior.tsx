import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Trees,
  Droplets,
  Sun,
  Footprints,
  Lightbulb,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import serviceExterior from "@/assets/service-exterior.avif";

const features = [
  {
    icon: Home,
    title: "Facade Design",
    description: "Stunning exterior facades blending traditional Indian architecture with modern aesthetics.",
  },
  {
    icon: Trees,
    title: "Landscape Architecture",
    description: "Beautiful gardens and outdoor spaces that harmonize with your property’s design.",
  },
  {
    icon: Sun,
    title: "Outdoor Living Spaces",
    description: "Functional and elegant outdoor areas for relaxation and entertainment.",
  },
  {
    icon: Droplets,
    title: "Pool & Deck Design",
    description: "Luxurious pool concepts with custom decking and water features.",
  },
  {
    icon: Footprints,
    title: "Driveway & Pathways",
    description: "Elegant driveways and walkways built with premium durable materials.",
  },
  {
    icon: Lightbulb,
    title: "Exterior Lighting",
    description: "Strategic lighting that enhances both aesthetics and safety.",
  },
];

const process = [
  { step: "", title: "Site Analysis", description: "Comprehensive assessment of your property and environment." },
  { step: "", title: "Design Concept", description: "Creating concepts that reflect your unique vision." },
  { step: "", title: "Material Selection", description: "Choosing high quality, weather resistant materials." },
  { step: "", title: "Detailed Planning", description: "Preparing technical drawings and landscape blueprints." },
  { step: "", title: "Construction", description: "Executing designs with skilled craftsmanship." },
  { step: "", title: "Finishing & Handover", description: "Final touches, inspection and maintenance guidance." },
];

const ServiceExterior = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={serviceExterior}
            alt="Exterior Design"
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
              Exterior Design
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Creating Lasting
              <span className="text-gradient-accent block">First Impressions</span>
            </h1>

            <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl">
              Design elegant facades and outdoor spaces that enhance curb appeal with
              a perfect balance of modern design and Indian architectural charm.
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
            title="Our Exterior Design Services"
            subtitle="Transform your property's outdoor appeal"
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
            subtitle="A step-by-step journey to design perfection"
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
              Ready to Transform Your Exterior?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-6">
              Let's craft breathtaking outdoor spaces that leave a timeless impression.
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

export default ServiceExterior;
