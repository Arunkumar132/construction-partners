import { Link } from "react-router-dom";
import { Users, Linkedin, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { motion } from "framer-motion";
import { ArrowRight, Award, Target, Eye, CheckCircle, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import { useDynamicStats } from "@/hooks/useDynamicStats";

const achievements = [
  { icon: Award, title: "Best Construction Company 2023", description: "Regional Excellence Award" },
  { icon: TrendingUp, title: "500+ Projects Delivered", description: "Across residential & commercial" },
  { icon: CheckCircle, title: "ISO 9001:2015 Certified", description: "Quality management systems" },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To deliver exceptional construction services that exceed client expectations while maintaining the highest standards of quality, safety and sustainability.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the most trusted and innovative construction company, shaping skylines and building communities that stand the test of time.",
  },
];

const timeline = [
  { year: "2018", title: "Founded", description: "Started with a vision to revolutionize construction" },
  { year: "2019", title: "First Major Project", description: "Completed our first commercial complex" },
  { year: "2020", title: "Team Expansion", description: "Grew to 25+ skilled professionals" },
  { year: "2022", title: "Regional Expansion", description: "Extended operations to 3 new cities" },
  { year: "2024", title: "500+ Projects", description: "Milestone of delivering excellence" },
];

const About = () => {
  // Load dynamic stats
  const { data: stats, isLoading: statsLoading, error: statsError } = useDynamicStats();
  // Load team members
  const { teamMembers, isLoading: teamLoading, error: teamError } = useTeamMembers();
  const leadership = teamMembers.filter((m) => m.is_leadership);

  // Updated achievements using dynamic stats
  const updatedAchievements = [
    { icon: Award, title: "Best Construction Company 2023", description: "Regional Excellence Award" },
    { icon: TrendingUp, title: `${stats?.projectsCount}+ Projects Delivered`, description: "Across residential & commercial" },
    { icon: CheckCircle, title: "ISO 9001:2015 Certified", description: "Quality management systems" },
  ];

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="relative py-24 md:py-28 bg-primary text-primary-foreground">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-accent/20 text-[#F3D299] rounded-full text-sm font-medium mb-5">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#F3D299] leading-tight">
              Crafting Quality Spaces
              <span className="block">Since 7 Years.</span>
            </h1>
            <p className="mt-6 text-lg text-[#F3D299] max-w-xl mx-auto">
              Since 2018, we've been transforming the construction landscape with innovation,
              dedication and an unwavering commitment to quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Leadership"
            title="Meet Our Leaders"
            subtitle="Our dedicated leadership team"
          />
          {/* ---------- Leadership – fully data‑driven ---------- */}
          <div className="flex flex-wrap justify-center gap-8">
            {leadership.length > 0 ? (
              leadership.map((member) => (
                <div
                  key={member.id}
                  className="bg-card rounded-xl p-8 shadow-card max-w-sm text-center flex flex-col items-center"
                >
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                    />
                  ) : (
                    <img
                      src="/assets/ceo.png"
                      alt="Placeholder"
                      className="w-48 h-48 rounded-full mx-auto mb-4 object-cover opacity-30"
                    />
                  )}

                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {member.name || "Unnamed Leader"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {member.position || "Leadership Role"}
                  </p>

                  {member.bio && (
                    <p className="text-muted-foreground">{member.bio}</p>
                  )}

                  <div className="flex gap-3 mt-2">
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
              ))
            ) : (
              <p className="text-muted-foreground">No leadership data available.</p>
            )}
          </div>
        </div>
      </section>

      {/* ================= DYNAMIC STATS SECTION ================= */}
      <section className="relative py-6 md:py-6 bg-primary text-[#F3D299]">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-[#F3D299]">
              Dynamic Company Statistics
            </h2>
            <p className="mt-4 text-lg text-[#F3D299]/70">
              Updated automatically from our latest records
            </p>
          </div>

          {statsLoading ? (
            <p className="text-center text-[#F3D299]">Loading stats...</p>
          ) : statsError ? (
            <p className="text-center text-red-500">Failed to load statistics.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <StatCard number={String(stats?.yearsExperience)} suffix="+" label="Years Experience" delay={0} labelColor="white" />
              <StatCard number={String(stats?.projectsCount)} suffix="+" label="Projects Completed" delay={0.1} labelColor="white" />
              <StatCard number={String(stats?.clientsCount)} suffix="+" label="Happy Clients" delay={0.2} labelColor="white" />
              <StatCard number={String(stats?.teamCount)} suffix="+" label="Team Members" delay={0.3} labelColor="white" />
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background border-t border-accent/10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                badge="Our Story"
                title="From Vision to Reality"
                subtitle="A journey of passion, perseverance and excellence"
              />

              {/* Story content */}
              {teamLoading ? (
                <p className="text-center text-muted-foreground mt-4">Loading team data...</p>
              ) : teamError ? (
                <p className="text-center text-red-500 mt-4">Failed to load team stats.</p>
              ) : (
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-justify [text-justify:inter-word]">
                  <p>
                    At Shree Vaari Spaces, we have been delivering trusted construction and interior solutions for the past 7 years. Our expertise covers construction, interiors, fabrication, electrical works, communication systems, and custom furniture.
                  </p>
                  <p>
                    We believe that every project is unique. That is why we work closely with our clients to understand their needs and transform their ideas into practical and beautiful spaces.
                  </p>
                  <p>
                    With a strong commitment to quality, innovation, and timely project completion, we continue to build long-term relationships with our clients.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container-custom">
          <SectionHeading
            badge="Our Purpose"
            title="Mission & Vision"
            subtitle="Guided by our values, driven by excellence"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-card"
              >
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-justify [text-justify:inter-word]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Recognition"
            title="Our Achievements"
            subtitle="Milestones that define our journey"
          />

          {/* Achievements content */}
          {teamLoading ? (
            <p className="text-center text-muted-foreground mt-4">Loading team data...</p>
          ) : teamError ? (
            <p className="text-center text-red-500 mt-4">Failed to load achievements.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {updatedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card shadow-card hover:shadow-card-hover transition-all duration-300 rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <achievement.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-12 md:py-16 bg-accent/80">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Have Questions?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              We'd love to hear from you. Send us an enquiry and our team will get back to you within 24 hours.
            </p>
            <Button variant="default" size="xl" asChild className="hover:scale-105 transition-all duration-300 font-bold bg-primary text-primary-foreground shadow-lg">
              <Link to="/contact">
                Send an Enquiry
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
