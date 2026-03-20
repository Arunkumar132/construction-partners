import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Mail, Users, Award, Shield, Lightbulb } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeamMembers } from "@/hooks/useTeamMembers";

const departments = [
  { name: "Architecture & Design", count: 2 },
  { name: "Project Management", count: 2 },
  { name: "Engineering", count: 2 },
  { name: "Interior Design", count: 2 },
  { name: "Site Operations", count: 2 },
  { name: "Quality Assurance", count: 2 },
];

const values = [
  { step: "01", icon: Award, title: "Excellence", description: "We strive for excellence in every detail, from planning to execution." },
  { step: "02", icon: Shield, title: "Integrity", description: "Honesty and transparency guide all our interactions and decisions." },
  { step: "03", icon: Lightbulb, title: "Innovation", description: "We embrace new technologies and methods to deliver better results." },
  { step: "04", icon: Users, title: "Teamwork", description: "Collaboration is at the heart of everything we accomplish." },
];

const Team = () => {
  const { teamMembers, isLoading } = useTeamMembers();
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

  const leadership = teamMembers.filter((m) => m.is_leadership);
  const expertTeam = teamMembers.filter((m) => !m.is_leadership);

  // Auto-slide for mobile values section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % values.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
              <span className="text-gradient-accent block">Shree Vaari Spaces</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              A dedicated team of professionals united by a passion for construction excellence
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
            subtitle="The visionaries driving Shree Vaari Spaces forward"
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
            title="Experts Across 6 Departments"
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

      {/* Values Redesign */}
      <section className="py-12 md:py-24 bg-secondary overflow-hidden">
        <div className="container-custom">
          <SectionHeading
            badge="Our Culture"
            title="Values We Live By"
            subtitle="The principles that guide our team every day"
          />
          
          {/* MOBILE VIEW: SLIDER (Matches Our Process) */}
          <div className="lg:hidden mt-8">
            <div className="relative h-[320px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentValueIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="bg-card rounded-2xl p-6 md:p-8 shadow-card absolute w-full max-w-sm text-center border-y-4 border-accent/50"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent/80 flex items-center justify-center mx-auto mb-4 shrink-0 shadow-lg shadow-accent/30">
                    {(() => {
                      const Icon = values[currentValueIndex].icon;
                      return <Icon className="h-8 w-8 text-white" />;
                    })()}
                  </div>

                  <div className="text-accent/80 text-sm font-bold tracking-widest uppercase mb-2">
                     VALUE {values[currentValueIndex].step}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                    {values[currentValueIndex].title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {values[currentValueIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-6 gap-3">
              {values.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentValueIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentValueIndex ? "w-8 bg-accent/80" : "w-2.5 bg-accent/30 hover:bg-accent/50"
                  }`}
                  aria-label={`Go to value ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* DESKTOP VIEW: GRID WITH CONNECTING LINE (Matches Our Process) */}
          <div className="hidden lg:block relative mt-16">
            <div className="absolute left-10 right-10 top-16 h-[1px] bg-accent/20 z-0"></div>

            <div className="grid lg:grid-cols-4 gap-6 relative z-10">
              {values.map((item, index) => (
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
                       {item.step}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-[15px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-accent/80">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Join Our Growing Team
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who share our passion for excellence.
            </p>
            <Button variant="default" size="xl" asChild className="hover:scale-105 transition-all duration-300 font-bold bg-primary text-primary-foreground shadow-lg">
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
