import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const clients = [
  { name: "Apex Developers", logo: "🏗️" },
  { name: "Metro Properties", logo: "🏢" },
  { name: "GreenBuild Corp", logo: "🌿" },
  { name: "Urban Spaces", logo: "🏙️" },
  { name: "Premier Estates", logo: "🏠" },
  { name: "Vista Holdings", logo: "🌆" },
  { name: "Capital Realty", logo: "💎" },
  { name: "Horizon Group", logo: "🌅" },
];

const collaborations = [
  {
    name: "City Mall Complex",
    client: "Metro Properties",
    description: "A 500,000 sq ft retail and entertainment complex featuring modern architecture and sustainable design.",
    year: "2023",
  },
  {
    name: "Sunrise Residences",
    client: "Apex Developers",
    description: "Luxury residential towers with 200+ premium apartments and world-class amenities.",
    year: "2023",
  },
  {
    name: "TechPark Office Campus",
    client: "Vista Holdings",
    description: "State-of-the-art corporate campus with LEED certification and smart building features.",
    year: "2022",
  },
  {
    name: "Harbor View Hotel",
    client: "Premier Estates",
    description: "5-star luxury hotel with 350 rooms, conference facilities, and waterfront dining.",
    year: "2022",
  },
];

const testimonials = [
  {
    quote: "BuildCraft delivered our project ahead of schedule and exceeded all our expectations. Their attention to detail is unmatched.",
    author: "Michael Chen",
    position: "CEO, Apex Developers",
  },
  {
    quote: "Working with BuildCraft was a seamless experience. Their team's professionalism and expertise made our vision a reality.",
    author: "Sarah Johnson",
    position: "Director, Metro Properties",
  },
  {
    quote: "From design to delivery, BuildCraft demonstrated excellence at every step. Highly recommended for any construction project.",
    author: "David Park",
    position: "Partner, Vista Holdings",
  },
];

const Clients = () => {
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
              Our Clients
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Trusted by Industry
              <span className="text-gradient-accent block">Leaders</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              We've partnered with leading developers and businesses to create iconic structures 
              that stand the test of time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Partners"
            title="Companies We've Worked With"
            subtitle="Building lasting relationships with industry leaders"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow flex flex-col items-center justify-center"
              >
                <span className="text-5xl mb-4">{client.logo}</span>
                <span className="font-semibold text-foreground text-center">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collaborations */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="Featured Work"
            title="Notable Collaborations"
            subtitle="Projects that showcase our partnership excellence"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {collaborations.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {project.year}
                  </span>
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {project.name}
                </h3>
                <p className="text-accent font-medium mb-3">{project.client}</p>
                <p className="text-muted-foreground">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <SectionHeading
            badge="Testimonials"
            title="What Our Clients Say"
            subtitle="Hear from the partners who trust us"
            light
          />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary-foreground/5 rounded-xl p-8 border border-primary-foreground/10"
              >
                <Quote className="h-10 w-10 text-accent mb-4" />
                <p className="text-primary-foreground/90 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-display font-bold text-primary-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-primary-foreground/60 text-sm">{testimonial.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent-foreground mb-4">
              Become Our Next Partner
            </h2>
            <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto mb-8">
              Join the list of satisfied clients who have trusted BuildCraft with their projects.
            </p>
            <Button variant="default" size="xl" asChild>
              <Link to="/contact">
                Start a Collaboration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Clients;