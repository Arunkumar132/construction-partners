import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Building, Paintbrush, Home, CheckCircle, Ruler, HardHat, Hammer, Briefcase, Truck, ClipboardCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { useServices } from "@/hooks/useServices";
import serviceConstruction from "@/assets/service-construction.avif";
import serviceInterior from "@/assets/service-interior.avif";
import serviceExterior from "@/assets/service-exterior.avif";

const STATIC_SERVICES = [
  {
    id: "static-1",
    title: "Construction",
    description: "From groundbreaking to completion, we deliver comprehensive construction services that meet the highest standards of quality and safety.",
    image_url: serviceConstruction,
    icon_name: "Building",
    link: "/services/construction",
  },
  {
    id: "static-2",
    title: "Interior Design",
    description: "Transform your interiors with our expert design services that blend aesthetics, functionality and your personal style.",
    image_url: serviceInterior,
    icon_name: "Paintbrush",
    link: "/services/interior",
  },
  {
    id: "static-3",
    title: "Exterior Design",
    description: "Design stunning facades and outdoor spaces that enhance curb appeal and create memorable first impressions.",
    image_url: serviceExterior,
    icon_name: "Home",
    link: "/services/exterior",
  },
];

const process = [
  {
    step: "01",
    icon: Ruler,
    title: "Consultation",
    description: "We discuss the client's requirements, ideas, budget, and project goals to understand their exact needs.",
  },
  {
    step: "02",
    icon: HardHat,
    title: "Planning & Design",
    description: "Our team prepares detailed plans, design concepts, and technical layouts to create the perfect solution for the project.",
  },
  {
    step: "03",
    icon: Hammer,
    title: "Project Execution",
    description: "We begin the construction or installation process using quality materials and skilled workmanship.",
  },
  {
    step: "04",
    icon: ClipboardCheck,
    title: "Quality Check",
    description: "Every stage of the project is monitored carefully to ensure safety, quality standards, and accuracy.",
  },
  {
    step: "05",
    icon: CheckCircle,
    title: "Final Delivery",
    description: "After completion, we ensure the project meets the client's expectations and deliver the finished space on time.",
  },
];

const Services = () => {
  const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
  const { services: fetchedServices, isLoading: servicesLoading } = useServices();

  const displayServices = fetchedServices && fetchedServices.length > 0 ? fetchedServices : STATIC_SERVICES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProcessIndex((prev) => (prev + 1) % process.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (iconName: string | null) => {
    switch (iconName) {
      case "Building":
      case "Building2":
        return Building;
      case "Paintbrush":
        return Paintbrush;
      case "Home":
        return Home;
      case "HardHat":
        return HardHat;
      case "Ruler":
        return Ruler;
      case "Hammer":
        return Hammer;
      default:
        return Briefcase;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-28 bg-hero-gradient">
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
              From construction to design, we offer end to end services that bring your vision to life
              with excellence and precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-14 md:py-18 bg-background">
        <div className="container-custom">
          {servicesLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            displayServices.map((service, index) => {
              const ServiceIcon = getIcon(service.icon_name);
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index !== displayServices.length - 1 ? "mb-20" : ""
                  } ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <ServiceIcon className="h-7 w-7 text-accent" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <Button variant="accent" size="lg" asChild className="group">
                      <Link to={service.link || "#"}>
                        View Details
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                  <div className={`relative group ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="absolute inset-0 bg-accent/5 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                    <img
                      src={service.image_url || ""}
                      alt={service.title}
                      className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover relative z-10 group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-secondary relative overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-6">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Our Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              At Shree Vaari Spaces, we follow a systematic and transparent process to ensure every
              project is completed successfully with precision and care.
            </p>
          </div>

          {/* MOBILE VIEW: SLIDER */}
          <div className="lg:hidden">
            <div className="relative min-h-[340px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProcessIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="bg-card rounded-2xl p-6 shadow-card absolute w-full max-w-3xl text-center border-y-4 border-accent/50"
                >
                  {(() => {
                    const CurrentIcon = process[currentProcessIndex].icon;
                    return (
                      <div className="w-16 h-16 rounded-2xl bg-accent/80 flex items-center justify-center mx-auto mb-4 shrink-0 transition-transform hover:scale-110 shadow-lg shadow-accent/30">
                        <CurrentIcon className="h-8 w-8 text-white" />
                      </div>
                    );
                  })()}
                  <div className="text-accent/80 text-sm font-bold tracking-widest uppercase mb-2">
                    STEP {process[currentProcessIndex].step}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                    {process[currentProcessIndex].title}
                  </h3>
                  <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
                    {process[currentProcessIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-6 gap-3">
              {process.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentProcessIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentProcessIndex ? "w-8 bg-accent/80" : "w-2.5 bg-accent/30 hover:bg-accent/50"
                  }`}
                  aria-label={`Go to process step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* DESKTOP VIEW: GRID */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="hidden lg:block absolute left-10 right-10 top-20 h-[1px] bg-accent/20 z-0"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
                {process.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-6 lg:p-7 shadow-card hover:shadow-card-hover hover:-translate-y-2 border-b-4 border-b-transparent hover:border-b-accent transition-all duration-300 relative group flex flex-col h-full"
                  >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                      <item.icon className="h-6 w-6 lg:h-7 lg:w-7 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
                        STEP {item.step}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-display font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-4 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm lg:text-[15px] leading-relaxed flex-grow text-justify hyphens-auto [text-justify:inter-word]">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-10 pb-12 md:pt-14 md:pb-16 bg-accent/80">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Ready to start your project? Contact us today for a free consultation and quote.
            </p>
            <Button variant="default" size="xl" asChild className="font-bold shadow-lg">
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
