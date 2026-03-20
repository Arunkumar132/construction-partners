import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building,
  Paintbrush,
  Home,
  Award,
  Users,
  HardHat,
  CheckCircle,
  Ruler,
  Hammer,
  Truck,
  ClipboardCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import HeroSlideshow from "@/components/HeroSlideshow";
import { useDynamicStats } from "@/hooks/useDynamicStats";
import { useServices } from "@/hooks/useServices";
import serviceConstruction from "@/assets/service-construction.avif";
import serviceInterior from "@/assets/service-interior.avif";
import serviceExterior from "@/assets/service-exterior.avif";

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

const STATIC_SERVICES = [
  {
    id: "static-1",
    icon_name: "Building",
    title: "Construction",
    description:
      "Complete construction services from foundation to finishing, delivering quality structures on time.",
    image_url: serviceConstruction,
    link: "/services/construction",
  },
  {
    id: "static-2",
    icon_name: "Paintbrush",
    title: "Interior Design",
    description:
      "Transform spaces with our expert interior design services, blending aesthetics with functionality.",
    image_url: serviceInterior,
    link: "/services/interior",
  },
  {
    id: "static-3",
    icon_name: "Home",
    title: "Exterior Design",
    description:
      "Create stunning facades and outdoor spaces that make lasting impressions.",
    image_url: serviceExterior,
    link: "/services/exterior",
  },
];

const heroTextPoints = [
  {
    badge: "Welcome to Shree Vaari Spaces",
    title: "Building Tomorrow's",
    highlight: "Landmarks Today",
    description: "Shree Vaari Spaces is a trusted company with 7 years of experience in delivering professional construction, interior design, fabrication, electrical, communication, and furniture works.",
  },
  {
    badge: "Complete Solutions",
    title: "From Planning to ",
    highlight: "Project Completion",
    description: "We provide complete solutions from planning to project completion, ensuring every space we create is functional, modern, and built to last.",
  },
  {
    badge: "Driven By Excellence",
    title: "High-Quality ",
    highlight: "Services & Designs",
    description: "Our mission is to deliver high-quality services, innovative designs, and customer satisfaction in every project we undertake.",
  }
];

const Index = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const { data: stats } = useDynamicStats();
  const { services: fetchedServices, isLoading: servicesLoading } = useServices();

  const displayServices = fetchedServices && fetchedServices.length > 0 ? fetchedServices : STATIC_SERVICES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroTextPoints.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const processInterval = setInterval(() => {
      setCurrentProcessIndex((prev) => (prev + 1) % process.length);
    }, 5000);
    return () => clearInterval(processInterval);
  }, []);

  useEffect(() => {
    if (displayServices && displayServices.length > 0) {
      const serviceInterval = setInterval(() => {
        setCurrentServiceIndex((prev) => (prev + 1) % displayServices.length);
      }, 5000);
      return () => clearInterval(serviceInterval);
    }
  }, [displayServices]);

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
      case "Award":
        return Award;
      default:
        return Building;
    }
  };

  const baseProjects = 30;
  const totalProjects = (stats?.projectsCount ?? 0) + baseProjects;

  const reasons = [
    {
      title: "Experienced Team",
      description: "Our professionals bring years of expertise in construction, interiors, and technical works.",
    },
    {
      title: "Quality Workmanship",
      description: "We focus on delivering durable and high-quality work using the best materials and techniques.",
    },
    {
      title: "On-Time Completion",
      description: "We respect deadlines and ensure projects are completed as scheduled.",
    },
    {
      title: "Customized Solutions",
      description: "Every project is designed according to the client’s requirements and budget.",
    },
    {
      title: "Customer Satisfaction",
      description: "Our priority is to build long-term relationships through trust and excellent service.",
    },
  ];

  return (
    <Layout>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] flex items-center pb-8">
        <HeroSlideshow />
        <div className="container-custom relative z-10 py-12 min-h-[300px] grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl col-start-1 row-start-1 w-full"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
                {heroTextPoints[currentHeroIndex].badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
                {heroTextPoints[currentHeroIndex].title}
                <span className="text-gradient-accent block">
                  {heroTextPoints[currentHeroIndex].highlight}
                </span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-xl text-justify italic [text-justify:inter-word]">
                {heroTextPoints[currentHeroIndex].description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="bg-primary py-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              number={String(stats?.yearsExperience || 7)}
              suffix="+"
              label="Years Experience"
              delay={0}
            />
            <StatCard
              number={String(totalProjects)}
              suffix="+"
              label="Projects Completed"
              delay={0.1}
            />
            <StatCard
              number={String(stats?.clientsCount || 11)}
              suffix="+"
              label="Happy Clients"
              delay={0.2}
            />
            <StatCard
              number={String(stats?.teamCount || 10)}
              suffix="+"
              label="Expert Team"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="What We Do"
            title="Our Core Services"
            subtitle="Comprehensive construction and design solutions tailored to your needs"
          />
          
          {servicesLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <>
              {/* MOBILE VIEW: SLIDER */}
              <div className="md:hidden">
                <div className="relative min-h-[440px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentServiceIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full"
                    >
                      <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 relative">
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <Link to={displayServices[currentServiceIndex].link || "#"} className="block w-full h-full">
                            <img
                              src={displayServices[currentServiceIndex].image_url || ""}
                              alt={displayServices[currentServiceIndex].title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                          
                          {/* Arrows */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentServiceIndex((prev) => (prev - 1 + displayServices.length) % displayServices.length);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/40 transition-colors z-20"
                            aria-label="Previous service"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentServiceIndex((prev) => (prev + 1) % displayServices.length);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/40 transition-colors z-20"
                            aria-label="Next service"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>

                        <Link to={displayServices[currentServiceIndex].link || "#"} className="block p-5">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                            {(() => {
                              const Icon = getIcon(displayServices[currentServiceIndex].icon_name);
                              return <Icon className="h-5 w-5 text-accent" />;
                            })()}
                          </div>
                          <h3 className="text-lg font-display font-bold text-foreground mb-1">
                            {displayServices[currentServiceIndex].title}
                          </h3>
                          <p className="text-muted-foreground text-sm h-[40px] overflow-hidden">
                            {displayServices[currentServiceIndex].description}
                          </p>
                          <span className="inline-flex items-center mt-3 text-accent font-semibold group-hover:gap-2 transition-all text-sm">
                            Learn More <ArrowRight className="ml-1 h-4 w-4" />
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* DESKTOP VIEW: GRID */}
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {displayServices.map((service, index) => {
                  const ServiceIcon = getIcon(service.icon_name);
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <Link to={service.link || "#"} className="block w-full h-full">
                          <img
                            src={service.image_url || ""}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      </div>
                      <Link to={service.link || "#"} className="p-6 flex flex-col flex-1">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 shrink-0 group-hover:bg-accent/20 transition-colors">
                          <ServiceIcon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center text-accent font-bold group-hover:gap-2 transition-all">
                          Learn More <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ================= WHY CHOOSE US SECTION ================= */}
      <section className="pt-4 pb-8 md:pb-12 md:pt-20 bg-gradient-to-b from-secondary to-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-24 items-start">

            {/* Left Column: Visual Anchor */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-video md:aspect-auto md:h-[700px] overflow-hidden rounded-2xl md:sticky md:top-24"
            >
              <img
                src={serviceConstruction}
                alt="Why Choose Us"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-sm font-semibold tracking-widest uppercase mb-2 opacity-80">Since 2017</p>
                <h4 className="text-2xl font-display font-medium">Built on Integrity.</h4>
              </div>
            </motion.div>

            {/* Right Column: Narrative Content */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Section Header */}
                <div className="mb-8 md:mb-12">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-3 md:mb-4">
                    Why Us
                  </span>
                  <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-[1.1] mb-5 md:mb-6">
                    Why We Are <br /> Chosen.
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed border-l-2 border-accent/20 pl-5 md:pl-6 text-justify [text-justify:inter-word]">
                    We believe in more than just doing the job—it's the realization of human potential through design, precision, and unwavering reliability.
                  </p>
                </div>

                {/* Mapping through Reasons */}
                <div className="space-y-10 md:space-y-16 mt-10 md:mt-16">
                  {reasons.map((reason, index) => (
                    <motion.div
                      key={reason.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-start gap-6 md:gap-8">
                        {/* Number Indicator */}
                        <span className="text-muted-foreground/30 font-display font-bold text-2xl md:text-3xl leading-none mt-1 group-hover:text-accent/40 transition-colors">
                           0{index + 1}
                        </span>
                        <div>
                          <h4 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 md:mb-3 group-hover:text-accent transition-colors">
                            {reason.title}
                          </h4>
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Call to Action / Mini-Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 md:mt-20 pt-10 md:pt-16 border-t border-secondary"
                >
                  <div className="flex flex-wrap items-center gap-8 md:gap-12">
                    <div>
                      <h5 className="text-base md:text-lg font-bold text-foreground mb-1">Expert Team</h5>
                      <p className="text-muted-foreground text-xs md:text-sm">50+ dedicated souls</p>
                    </div>
                    {/* Overlapping Avatar Icons */}
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                          <Users className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center mt-6 md:mt-8 text-accent p-0 font-bold text-base md:text-lg hover:gap-3 transition-all"
                  >
                    Initiate a conversation <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR PROCESS SECTION ================= */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-10 bg-secondary relative overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="text-center mb-6 md:mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-3">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              At Shree Vaari Spaces, we follow a systematic and transparent process to ensure every
              project is completed successfully with precision and care.
            </p>
          </div>

          {/* MOBILE / TABLET VIEW: SLIDER */}
          <div className="lg:hidden">
            <div className="relative min-h-[340px] md:min-h-[280px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProcessIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="bg-card rounded-2xl p-6 md:p-8 shadow-card absolute w-full max-w-3xl text-center border-y-4 border-accent/50"
                >
                  {(() => {
                    const CurrentIcon = process[currentProcessIndex].icon;
                    return (
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/80 flex items-center justify-center mx-auto mb-4 shrink-0 transition-transform hover:scale-110 shadow-lg shadow-accent/30">
                        <CurrentIcon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                    );
                  })()}

                  <div className="text-accent/80 text-sm md:text-base font-bold tracking-widest uppercase mb-2 text-center">
                     STEP {process[currentProcessIndex].step}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 md:mb-4 text-center">
                    {process[currentProcessIndex].title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed text-center">
                    {process[currentProcessIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-6 md:mt-8 gap-3 relative z-10">
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
          <div className="hidden lg:block relative mt-12">
            {/* Connecting Line extending across all cards */}
            <div className="absolute left-10 right-10 top-16 h-[1px] bg-accent/20 z-0"></div>

            <div className="grid lg:grid-cols-5 gap-4 relative z-10">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-2 border-b-4 border-b-transparent hover:border-b-accent transition-all duration-300 relative group flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                    <item.icon className="h-7 w-7 text-accent" />
                  </div>

                  <div className="flex-1">
                    <div className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
                       STEP {item.step}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-[15px] leading-relaxed flex-grow text-justify hyphens-auto [text-justify:inter-word]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR EXPERIENCE SECTION ================= */}
      <section className="pt-4 pb-10 md:pt-6 md:pb-16 bg-background relative overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Narrative Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-6">
                 Our Legacy
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-bold text-foreground mb-8 leading-[1.1]">
                Our Experience &<br />Achievements
              </h2>

              <div className="space-y-6 text-muted-foreground text-[17px] leading-relaxed text-justify">
                <p>
                  With 7 years of industry experience, Shree Vaari Spaces has successfully delivered
                  high-quality construction and interior solutions for a wide range of clients.
                </p>
                <p>
                  Over the years, we have built a strong reputation for reliability, craftsmanship,
                  and customer satisfaction. Our projects include residential homes, office interiors,
                  commercial spaces, and customized fabrication works.
                </p>
                <p>
                  Our experience allows us to understand client requirements clearly and deliver
                  solutions that are durable, functional, and aesthetically appealing.
                </p>
              </div>
            </motion.div>

            {/* Right Highlights Block: Stat + Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex flex-row md:flex-col items-center gap-4 md:gap-8"
            >
              {/* Big Stat */}
              <div className="flex flex-col shrink-0 md:items-center md:text-center">
                <div className="text-[60px] sm:text-[80px] md:text-[120px] lg:text-[150px] font-display font-bold text-primary leading-none tracking-tighter">
                  7+
                </div>
                <div className="text-[8px] sm:text-[10px] md:text-xs font-display font-bold text-foreground mt-1 max-w-[50px] sm:max-w-[100px] md:max-w-full leading-tight uppercase tracking-wider">
                  YEARS OF SUCCESSFUL PROJECT DELIVERY
                </div>
              </div>

              <div className="relative flex-1 md:flex-none md:w-full">
                {/* Soft underlying glow */}
                <div className="absolute inset-0 bg-accent/10 blur-[60px] rounded-full translate-x-6 -translate-y-4" />
                <div className="bg-card border border-accent/20 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 shadow-card relative z-10 w-full">
                  <h3 className="text-sm sm:text-lg md:text-2xl font-display font-bold text-foreground mb-6 md:mb-10 text-center lg:text-left">
                    Highlights Panel
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-1 sm:gap-4 lg:gap-8">
                    {[
                      "Expertise in Multiple Services",
                      "Focus on Quality & Durability",
                      "Trusted by Many Satisfied Clients"
                    ].map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                        className="flex flex-col items-center text-center group"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full bg-accent/10 flex items-center justify-center mb-2 md:mb-4 shrink-0 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
                        </div>
                        <span className="text-foreground text-[8px] sm:text-[11px] md:text-base font-bold leading-tight group-hover:text-accent transition-colors duration-300">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <TestimonialsSection />

      {/* ================= CTA SECTION ================= */}
      <section className="py-12 bg-accent/80">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HardHat className="h-14 w-14 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Ready to Start Your Project?
            </h2>
            <p className="text-base text-white/90 max-w-xl mx-auto mb-6">
              Let's discuss your vision and bring it to life. Get a free
              consultation and quote today.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="default" size="lg" asChild className="hover:scale-105 transition-all duration-300 font-bold bg-primary text-primary-foreground">
                <Link to="/contact">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild className="border-white text-white hover:bg-white/10 backdrop-blur-sm">
                <a href="tel:+91 97883 23394">Call Us Now</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
