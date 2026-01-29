import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building, Paintbrush, Home, CheckCircle, Hammer, Ruler, HardHat } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import serviceConstruction from "@/assets/service-construction.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceExterior from "@/assets/service-exterior.jpg";

const services = [
  {
    id: "construction",
    icon: Building,
    title: "Construction",
    subtitle: "Building Strong Foundations",
    description: "From groundbreaking to completion, we deliver comprehensive construction services that meet the highest standards of quality and safety.",
    image: serviceConstruction,
    features: [
      "Residential Construction",
      "Commercial Buildings",
      "Industrial Facilities",
      "Infrastructure Projects",
      "Renovation & Remodeling",
      "Project Management",
    ],
  },
  {
    id: "interiors",
    icon: Paintbrush,
    title: "Interior Design",
    subtitle: "Crafting Beautiful Spaces",
    description: "Transform your interiors with our expert design services that blend aesthetics, functionality, and your personal style.",
    image: serviceInterior,
    features: [
      "Space Planning",
      "Custom Furniture Design",
      "Lighting Design",
      "Material Selection",
      "Color Consultation",
      "3D Visualization",
    ],
  },
  {
    id: "exteriors",
    icon: Home,
    title: "Exterior Design",
    subtitle: "Creating Lasting Impressions",
    description: "Design stunning facades and outdoor spaces that enhance curb appeal and create memorable first impressions.",
    image: serviceExterior,
    features: [
      "Facade Design",
      "Landscape Architecture",
      "Outdoor Living Spaces",
      "Pool & Deck Design",
      "Driveway & Pathways",
      "Exterior Lighting",
    ],
  },
];

const process = [
  {
    step: "01",
    icon: Ruler,
    title: "Consultation",
    description: "We discuss your vision, requirements, and budget to create a tailored plan.",
  },
  {
    step: "02",
    icon: HardHat,
    title: "Planning & Design",
    description: "Our team develops detailed blueprints and 3D visualizations for your approval.",
  },
  {
    step: "03",
    icon: Hammer,
    title: "Construction",
    description: "Expert craftsmen bring your project to life with precision and quality.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Delivery",
    description: "Final inspection, handover, and after-sales support for your peace of mind.",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 bg-hero-gradient">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Comprehensive Solutions for
              <span className="text-gradient-accent block">Every Project</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              From construction to design, we offer end-to-end services that bring your vision to life 
              with excellence and precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index !== services.length - 1 ? "mb-24" : ""
              } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-accent" />
                </div>
                <span className="text-accent font-semibold">{service.subtitle}</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-8">{service.description}</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="accent" size="lg" asChild>
                  <Link to="/contact">
                    Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-xl shadow-card-hover w-full aspect-[4/3] object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="How We Work"
            title="Our Process"
            subtitle="A streamlined approach to deliver excellence at every step"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
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
              Let's Build Something Amazing
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Ready to start your project? Contact us today for a free consultation and quote.
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

export default Services;