import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { useProjects } from "@/hooks/useProjects";
import { useTestimonials } from "@/hooks/useTestimonials";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

const Clients = () => {
  const { projects, isLoading: projectsLoading } = useProjects();
  const { testimonials, isLoading: testimonialsLoading } = useTestimonials();

  // Extract unique clients from projects
  const uniqueClients = useMemo(() => {
    const clientSet = new Set<string>();
    projects.forEach((project) => {
      if (project.client) {
        clientSet.add(project.client);
      }
    });
    return Array.from(clientSet);
  }, [projects]);

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
          {projectsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : uniqueClients.length === 0 ? (
            <p className="text-center text-muted-foreground">No clients yet. Add projects with client names in the admin dashboard.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {uniqueClients.map((client, index) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow flex flex-col items-center justify-center"
                >
                  <Building2 className="h-12 w-12 text-accent mb-4" />
                  <span className="font-semibold text-foreground text-center">{client}</span>
                </motion.div>
              ))}
            </div>
          )}
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
          {projectsLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-center text-muted-foreground">No projects yet. Add projects in the admin dashboard.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-8 shadow-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      {project.completed_at ? new Date(project.completed_at).getFullYear() : "Ongoing"}
                    </span>
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  {project.client && (
                    <p className="text-accent font-medium mb-3">{project.client}</p>
                  )}
                  {project.description && (
                    <p className="text-muted-foreground">{project.description}</p>
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
                  className="bg-primary-foreground/5 rounded-xl p-8 border border-primary-foreground/10"
                >
                  <Quote className="h-10 w-10 text-accent mb-4" />
                  <p className="text-primary-foreground/90 mb-6 italic leading-relaxed">
                    "{testimonial.testimonial}"
                  </p>
                  <div>
                    <p className="font-display font-bold text-primary-foreground">
                      {testimonial.client_name}
                    </p>
                    {testimonial.location && (
                      <p className="text-primary-foreground/60 text-sm">{testimonial.location}</p>
                    )}
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