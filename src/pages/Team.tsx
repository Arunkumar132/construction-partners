import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Mail, Users } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useDynamicStats } from "@/hooks/useDynamicStats";
const departments = [
  { name: "Architecture & Design", count: 2 },
  { name: "Project Management", count: 2 },
  { name: "Engineering", count: 2 },
  { name: "Interior Design", count: 2 },
  { name: "Site Operations", count: 2 },
  { name: "Quality Assurance", count: 2 },
];

const values = [
  { title: "Excellence", description: "We strive for excellence in every detail, from planning to execution." },
  { title: "Integrity", description: "Honesty and transparency guide all our interactions and decisions." },
  { title: "Innovation", description: "We embrace new technologies and methods to deliver better results." },
  { title: "Teamwork", description: "Collaboration is at the heart of everything we accomplish." },
];

const Team = () => {
  const { teamMembers, isLoading } = useTeamMembers();

  const leadership = teamMembers.filter((m) => m.is_leadership);
  const expertTeam = teamMembers.filter((m) => !m.is_leadership);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-hero-gradient">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-5">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              The People Behind
              <span className="text-gradient-accent block">Sree Vaari Spaces</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              A dedicated team of 12+ professionals united by a passion for construction excellence
              and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expert Team */}
      {expertTeam.length > 0 && (
        <section className="py-8 md:py-10 bg-background">
          <div className="container-custom">
            <SectionHeading
              badge="Our Experts"
              title="Expert Team Members"
              subtitle="Skilled professionals delivering excellence"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertTeam.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-accent/20">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Users className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-display font-bold text-foreground">{member.name}</h3>
                    <p className="text-accent font-medium mb-3">{member.position}</p>
                    {member.bio && <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>}
                    <div className="flex justify-center gap-3">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leadership */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="Leadership"
            title="Meet Our Leaders"
            subtitle="The visionaries driving Sree Vaari Spaces forward"
          />

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card rounded-xl p-6 shadow-card">
                  <Skeleton className="w-32 h-32 rounded-full mx-auto mb-6" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto mb-3" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : leadership.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-accent/20">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Users className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-display font-bold text-foreground">{member.name}</h3>
                    <p className="text-accent font-medium mb-3">{member.position}</p>
                    {member.bio && <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>}
                    <div className="flex justify-center gap-3">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No leadership team members added yet.</p>
              <p className="text-sm mt-2">Add team members in the admin panel and mark them as "Leadership".</p>
            </div>
          )}
        </div>
      </section>

      {/* Departments */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Our Departments"
            title="50+ Experts Across 6 Departments"
            subtitle="Specialized teams working together to deliver excellence"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 shadow-card flex items-center justify-between"
              >
                <span className="font-semibold text-foreground">{dept.name}</span>
                <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-bold">
                  {dept.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container-custom">
          <SectionHeading
            badge="Our Culture"
            title="Values We Live By"
            subtitle="The principles that guide our team every day"
            light
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-display font-bold text-accent">{index + 1}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-primary-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-primary-foreground/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-accent">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent-foreground mb-4">
              Join Our Growing Team
            </h2>
            <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for excellence.
            </p>
            <Button variant="default" size="xl" asChild>
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
