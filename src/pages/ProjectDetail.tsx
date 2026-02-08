import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Building, Play, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, isLoading } = useProjects();
  
  const project = projects.find((p) => p.id === id);

  if (isLoading) {
    return (
      <Layout>
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-custom">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <section className="pt-32 pb-16 bg-primary">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4">
              Project Not Found
            </h1>
            <p className="text-primary-foreground/80 mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Button variant="hero" asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
        <div className="absolute inset-0">
          <img
            src={project.image_url || "/placeholder.svg"}
            alt={project.title}
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
              to="/projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
            {project.category && (
              <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6">
                {project.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 mt-6">
              {project.client && (
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Building className="h-5 w-5 text-accent" />
                  <span>{project.client}</span>
                </div>
              )}
              {project.location && (
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.completed_at && (
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>{new Date(project.completed_at).getFullYear()}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Project Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.description || "No description available for this project."}
                </p>
              </motion.div>

              {/* Project Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-12"
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Project Gallery
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-xl p-6 shadow-card sticky top-24"
              >
                <h3 className="text-xl font-display font-bold text-foreground mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  {project.client && (
                    <div>
                      <span className="text-sm text-muted-foreground">Client</span>
                      <p className="font-semibold text-foreground">{project.client}</p>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <span className="text-sm text-muted-foreground">Location</span>
                      <p className="font-semibold text-foreground">{project.location}</p>
                    </div>
                  )}
                  {project.category && (
                    <div>
                      <span className="text-sm text-muted-foreground">Category</span>
                      <p className="font-semibold text-foreground">{project.category}</p>
                    </div>
                  )}
                  {project.completed_at && (
                    <div>
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <p className="font-semibold text-foreground">
                        {new Date(project.completed_at).toLocaleDateString("en-IN", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </div>
                <Button variant="accent" size="lg" className="w-full mt-6" asChild>
                  <Link to="/contact">
                    Start Similar Project
                  </Link>
                </Button>
              </motion.div>
            </div>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Interested in a Similar Project?
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Contact us today and let's discuss how we can bring your vision to life.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get a Quote
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
