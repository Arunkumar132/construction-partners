import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building, Paintbrush, Home, Award, Users, HardHat, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import HeroSlideshow from "@/components/HeroSlideshow";
import { useDynamicStats } from "@/hooks/useDynamicStats";
import serviceConstruction from "@/assets/service-construction.avif";
import serviceInterior from "@/assets/service-interior.avif";
import serviceExterior from "@/assets/service-exterior.avif";

const services = [
  {
    icon: Building,
    title: "Construction",
    description: "Complete construction services from foundation to finishing, delivering quality structures on time.",
    image: serviceConstruction,
    link: "/services/construction",
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Transform spaces with our expert interior design services, blending aesthetics with functionality.",
    image: serviceInterior,
    link: "/services/interior",
  },
  {
    icon: Home,
    title: "Exterior Design",
    description: "Create stunning facades and outdoor spaces that make lasting impressions.",
    image: serviceExterior,
    link: "/services/exterior",
  },
];

const reasons = [
  "7+ years of industry excellence",
  "500+ projects completed successfully",
  "Licensed and insured professionals",
  "On-time delivery guaranteed",
  "Transparent pricing",
  "24/7 customer support",
];

const Index = () => {
  const { data: stats } = useDynamicStats();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <HeroSlideshow />
        <div className="container-custom relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6">
              Excellence in Construction
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-primary-foreground leading-tight">
              Building Tomorrow's
              <span className="text-gradient-accent block">Landmarks Today</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-xl">
              With {stats?.yearsExperience || 7} years of expertise, we transform architectural visions into reality. 
              Quality craftsmanship meets innovative design.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number={String(stats?.yearsExperience || 7)} suffix="+" label="Years Experience" delay={0} />
            <StatCard number={String(stats?.projectsCount || 31)} suffix="+" label="Projects Completed" delay={0.1} />
            <StatCard number={String(stats?.clientsCount || 11)} suffix="+" label="Happy Clients" delay={0.2} />
            <StatCard number={String(stats?.teamCount || 0)} suffix="+" label="Expert Team" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="What We Do"
            title="Our Core Services"
            subtitle="Comprehensive construction and design solutions tailored to your needs"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={service.title} to={service.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">{service.description}</p>
                    <span className="inline-flex items-center mt-4 text-accent font-semibold group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                badge="Why Us"
                title="Why Choose BuildCraft?"
                subtitle="We combine expertise, quality, and dedication to deliver exceptional results"
                centered={false}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-foreground">{reason}</span>
                  </motion.div>
                ))}
              </div>
              <Button variant="accent" size="lg" className="mt-8" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-accent rounded-xl p-6 text-accent-foreground">
                  <Award className="h-10 w-10 mb-4" />
                  <h4 className="font-display font-bold text-lg">Award Winning</h4>
                  <p className="text-sm opacity-90">Recognized for excellence</p>
                </div>
                <img
                  src={serviceConstruction}
                  alt="Construction work"
                  className="rounded-xl w-full aspect-square object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src={serviceInterior}
                  alt="Interior design"
                  className="rounded-xl w-full aspect-square object-cover"
                />
                <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                  <Users className="h-10 w-10 mb-4" />
                  <h4 className="font-display font-bold text-lg">Expert Team</h4>
                  <p className="text-sm opacity-70">{stats?.teamCount || 0}+ professionals</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HardHat className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Let's discuss your vision and bring it to life. Get a free consultation and quote today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="tel:+1234567890">Call Us Now</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
