import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Handshake, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { useClients } from "@/hooks/useClients";
import { useCollaborations } from "@/hooks/useCollaborations";
import { Skeleton } from "@/components/ui/skeleton";

const Clients = () => {
  const { clients, isLoading: clientsLoading } = useClients();
  const { collaborations, isLoading: collaborationsLoading } = useCollaborations();
  
  const [currentClientIndex, setCurrentClientIndex] = useState(0);
  const [currentCollabIndex, setCurrentCollabIndex] = useState(0);

  // Auto-slide for partners
  useEffect(() => {
    if (!clientsLoading && clients.length > 1) {
      const timer = setInterval(() => {
        setCurrentClientIndex((prev) => (prev + 1) % clients.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [clients.length, clientsLoading]);

  // Auto-slide for collaborations
  useEffect(() => {
    if (!collaborationsLoading && collaborations.length > 1) {
      const timer = setInterval(() => {
        setCurrentCollabIndex((prev) => (prev + 1) % collaborations.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [collaborations.length, collaborationsLoading]);

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
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-5">
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
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Partners"
            title="Companies We've Worked With"
            subtitle="Building lasting relationships with industry leaders"
          />
          {clientsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : clients.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No clients yet. Add clients in the admin dashboard.
            </p>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Mobile Slider View */}
              <div className="md:hidden">
                <div className="relative h-[220px] flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentClientIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute w-full px-12"
                    >
                      <div className="bg-card rounded-xl p-8 shadow-card flex flex-col items-center justify-center min-h-[180px] relative">
                        {clients[currentClientIndex].logo_url ? (
                          <img
                            src={clients[currentClientIndex].logo_url}
                            alt={clients[currentClientIndex].name}
                            className="h-16 w-auto object-contain mb-4"
                          />
                        ) : (
                          <Building2 className="h-12 w-12 text-accent mb-4" />
                        )}
                        <span className="font-semibold text-foreground text-center">{clients[currentClientIndex].name}</span>
                      </div>
                      
                      {/* Arrows outside the box */}
                      <button
                        onClick={() => setCurrentClientIndex((prev) => (prev - 1 + clients.length) % clients.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center backdrop-blur-sm z-20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentClientIndex((prev) => (prev + 1) % clients.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center backdrop-blur-sm z-20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Collaborations */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="Featured Work"
            title="Notable Collaborations"
            subtitle="Projects that showcase our partnership excellence"
          />
          {collaborationsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : collaborations.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No collaborations yet. Add collaborations in the admin dashboard.
            </p>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collaborations.map((collab, index) => (
                  <motion.div
                    key={collab.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-xl p-8 shadow-card relative"
                  >
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

              {/* Mobile Slider View */}
              <div className="md:hidden">
                <div className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCollabIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute w-full px-12"
                    >
                      <div className="bg-card rounded-xl p-8 shadow-card relative min-h-[260px]">
                        {collaborations[currentCollabIndex].image_url && (
                          <div className="absolute top-4 right-4">
                            <img
                              src={collaborations[currentCollabIndex].image_url}
                              alt={collaborations[currentCollabIndex].name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-4 pr-20">
                          {collaborations[currentCollabIndex].year && (
                            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                              {collaborations[currentCollabIndex].year}
                            </span>
                          )}
                          <Handshake className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                          {collaborations[currentCollabIndex].name}
                        </h3>
                        {collaborations[currentCollabIndex].message && (
                          <p className="text-muted-foreground">{collaborations[currentCollabIndex].message}</p>
                        )}
                      </div>
                      
                      {/* Arrows outside the box */}
                      <button
                        onClick={() => setCurrentCollabIndex((prev) => (prev - 1 + collaborations.length) % collaborations.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center backdrop-blur-sm z-20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentCollabIndex((prev) => (prev + 1) % collaborations.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center backdrop-blur-sm z-20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </>
          )}
        </div>
      </section>



      {/* CTA */}
      <section className="py-12 md:py-16 bg-accent/80">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Become Our Next Partner
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Join the list of satisfied clients who have trusted BuildCraft with their projects.
            </p>
            <Button variant="default" size="xl" asChild className="font-bold shadow-lg">
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
