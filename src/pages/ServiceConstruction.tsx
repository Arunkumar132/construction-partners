import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Building, Home, Factory, Wrench, HardHat, ClipboardCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import serviceConstruction from "@/assets/service-construction.avif";

const features = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom homes and residential projects built to the highest standards.",
  },
  {
    icon: Building,
    title: "Commercial Buildings",
    description: "Office spaces, retail outlets, and commercial complexes.",
  },
  {
    icon: Factory,
    title: "Industrial Facilities",
    description: "Warehouses, factories, and industrial infrastructure.",
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description: "Transforming existing structures with modern upgrades.",
  },
  {
    icon: HardHat,
    title: "Infrastructure Projects",
    description: "Roads, bridges, and large-scale infrastructure development.",
  },
  {
    icon: ClipboardCheck,
    title: "Project Management",
    description: "End-to-end project oversight ensuring timely delivery.",
  },
];

const process = [
  { step: "01", title: "Consultation", description: "Understanding your requirements and vision." },
  { step: "02", title: "Planning & Design", description: "Detailed blueprints and architectural plans." },
  { step: "03", title: "Approvals", description: "Obtaining necessary permits and clearances." },
  { step: "04", title: "Foundation", description: "Laying strong foundations for your structure." },
  { step: "05", title: "Construction", description: "Quality construction with skilled craftsmen." },
  { step: "06", title: "Finishing & Handover", description: "Final inspections and project delivery." },
];

const ServiceConstruction = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
        <div className="absolute inset-0">
          <img
            src={serviceConstruction}
            alt="Construction"
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
              Construction
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Building Strong
              <span className="text-gradient-accent block">Foundations</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl">
              From groundbreaking to completion, we deliver comprehensive construction 
              services that meet the highest standards of quality and safety.
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
            title="Our Construction Services"
            subtitle="Complete construction solutions for every project"
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
            subtitle="A systematic approach to construction excellence"
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
              Ready to Build Your Dream?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Contact us today for a free consultation and quote.
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

export default ServiceConstruction;
