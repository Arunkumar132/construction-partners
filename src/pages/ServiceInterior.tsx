import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Paintbrush, Palette, Lightbulb, Sofa, Ruler, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import serviceInterior from "@/assets/service-interior.avif";

const features = [
  {
    icon: Palette,
    title: "Space Planning",
    description: "Optimizing layouts for maximum functionality and flow in your living or working spaces.",
  },
  {
    icon: Sofa,
    title: "Custom Furniture Design",
    description: "Bespoke furniture pieces tailored to your exact specifications and style preferences.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Strategic lighting solutions that enhance ambiance and complement your interior theme.",
  },
  {
    icon: Ruler,
    title: "Material Selection",
    description: "Premium materials carefully chosen for durability, aesthetics, and sustainability.",
  },
  {
    icon: Paintbrush,
    title: "Color Consultation",
    description: "Expert color palette selection to create the perfect mood and atmosphere.",
  },
  {
    icon: Eye,
    title: "3D Visualization",
    description: "Realistic 3D renders to help you visualize your dream space before construction.",
  },
];

const process = [
  { step: "01", title: "Initial Consultation", description: "Understanding your vision, lifestyle, and requirements." },
  { step: "02", title: "Concept Development", description: "Creating mood boards and initial design concepts." },
  { step: "03", title: "Design Refinement", description: "Detailed drawings and 3D visualizations for your approval." },
  { step: "04", title: "Material Procurement", description: "Sourcing premium materials and custom furnishings." },
  { step: "05", title: "Execution", description: "Expert craftsmen bring the design to life with precision." },
  { step: "06", title: "Final Styling", description: "Adding finishing touches and styling for the perfect look." },
];

const ServiceInterior = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
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
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6">
              Interior Design
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Crafting Beautiful
              <span className="text-gradient-accent block">Living Spaces</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl">
              Transform your interiors with our expert design services that blend traditional Indian 
              aesthetics with modern functionality.
            </p>
            <Button variant="hero" size="xl" className="mt-8" asChild>
              <Link to="/contact">
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="What We Offer"
            title="Our Interior Design Services"
            subtitle="Comprehensive solutions for residential and commercial spaces"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="Our Process"
            title="How We Work"
            subtitle="A systematic approach to creating your dream interiors"
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

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Contact us today for a free consultation and let's create your dream interior.
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
