import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Building } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";

const Projects = () => {
  const { projects, isLoading } = useProjects();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-5">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4">
              Our <span className="text-accent">Projects</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Explore our completed projects showcasing excellence in construction,
              interior design and exterior works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Portfolio"
            title="Featured Projects"
            subtitle="Each project represents our commitment to quality and client satisfaction"
          />

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden">
                  <Skeleton className="aspect-video" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground text-lg">
                No projects available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
                  >
                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Category Badge */}
                      {project.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                            {project.category}
                          </span>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {project.is_featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {project.client && (
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            <span>{project.client}</span>
                          </div>
                        )}
                        {project.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{project.location}</span>
                          </div>
                        )}
                        {project.completed_at && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(project.completed_at).getFullYear()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-accent/80">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Let's bring your vision to life. Contact us today for a free consultation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
