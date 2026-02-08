import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Quote, Handshake, MapPin, Play } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { useClients } from "@/hooks/useClients";
import { useCollaborations } from "@/hooks/useCollaborations";
import { useTestimonials } from "@/hooks/useTestimonials";
import { Skeleton } from "@/components/ui/skeleton";

const Clients = () => {
  const { clients, isLoading: clientsLoading } = useClients();
  const { collaborations, isLoading: collaborationsLoading } = useCollaborations();
  const { testimonials, isLoading: testimonialsLoading } = useTestimonials();

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, "_blank");
  };

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
          {clientsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : clients.length === 0 ? (
            <p className="text-center text-muted-foreground">No clients yet. Add clients in the admin dashboard.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow flex flex-col items-center justify-center"
                >
                  {client.logo_url ? (
                    <img 
                      src={client.logo_url} 
                      alt={client.name} 
                      className="h-16 w-auto object-contain mb-4"
                    />
                  ) : (
                    <Building2 className="h-12 w-12 text-accent mb-4" />
                  )}
                  <span className="font-semibold text-foreground text-center">{client.name}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Collaborations */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="Featured Work"
            title="Notable Collaborations"
            subtitle="Projects that showcase our partnership excellence"
          />
          {collaborationsLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : collaborations.length === 0 ? (
            <p className="text-center text-muted-foreground">No collaborations yet. Add collaborations in the admin dashboard.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {collaborations.map((collab, index) => (
                <motion.div
                  key={collab.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-8 shadow-card relative"
                >
                  {/* Client Image in top right corner */}
                  {collab.image_url && (
                    <div className="absolute top-4 right-4">
                      <img 
                        src={collab.image_url} 
                        alt={collab.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4 pr-20">
                    {collab.year && (
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                        {collab.year}
                      </span>
                    )}
                    <Handshake className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                    {collab.name}
                  </h3>
                  {collab.message && (
                    <p className="text-muted-foreground">{collab.message}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
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
          {testimonialsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-primary-foreground/60">No testimonials yet. Add testimonials in the admin dashboard.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => testimonial.video_url && handleVideoClick(testimonial.video_url)}
                  className={`bg-primary-foreground/5 rounded-xl p-8 border border-primary-foreground/10 ${
                    testimonial.video_url ? "cursor-pointer hover:bg-primary-foreground/10 transition-colors" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="h-10 w-10 text-accent" />
                    {testimonial.video_url && (
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                        <Play className="h-5 w-5 text-accent-foreground ml-0.5" />
                      </div>
                    )}
                  </div>
                  <p className="text-primary-foreground/90 mb-6 italic leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center gap-3">
                    {testimonial.client_image_url && (
                      <img 
                        src={testimonial.client_image_url} 
                        alt={testimonial.client_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-display font-bold text-primary-foreground">
                        {testimonial.client_name}
                      </p>
                      {testimonial.location && (
                        <div className="flex items-center gap-1 text-primary-foreground/60 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{testimonial.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
