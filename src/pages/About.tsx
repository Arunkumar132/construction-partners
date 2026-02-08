import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Target, Eye, CheckCircle, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";

const achievements = [
  { icon: Award, title: "Best Construction Company 2023", description: "Regional Excellence Award" },
  { icon: TrendingUp, title: "500+ Projects Delivered", description: "Across residential & commercial" },
  { icon: CheckCircle, title: "ISO 9001:2015 Certified", description: "Quality management systems" },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To deliver exceptional construction services that exceed client expectations while maintaining the highest standards of quality, safety, and sustainability.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be the most trusted and innovative construction company, shaping skylines and building communities that stand the test of time.",
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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              7 Years of Building
              <span className="text-gradient-accent block">Excellence & Trust</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Since 2018, we've been transforming the construction landscape with innovation, 
              dedication, and an unwavering commitment to quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
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
                subtitle="A journey of passion, perseverance, and excellence"
              />
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  BuildCraft was founded in 2018 with a simple yet powerful mission: to redefine 
                  construction excellence. What started as a small team of passionate builders has 
                  grown into one of the region's most trusted construction companies.
                </p>
                <p>
                  Over the past 7 years, we've successfully delivered more than 500 projects, 
                  ranging from residential homes to large-scale commercial complexes. Our commitment 
                  to quality, innovation, and client satisfaction has earned us numerous accolades 
                  and, more importantly, the trust of our clients.
                </p>
                <p>
                  Today, with a team of 50+ skilled professionals, we continue to push boundaries 
                  and set new standards in the construction industry.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-secondary">
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
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <SectionHeading
            badge="Recognition"
            title="Our Achievements"
            subtitle="Milestones that define our journey"
            light
          />
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary-foreground/5 rounded-xl p-8 border border-primary-foreground/10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <achievement.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary-foreground mb-2">
                  {achievement.title}
                </h3>
                <p className="text-primary-foreground/70">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Our Journey"
            title="Milestones Through The Years"
            subtitle="Key moments that shaped BuildCraft"
          />
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-display font-bold">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-accent/20 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Enquiry */}
      <section className="section-padding bg-accent">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-accent-foreground mb-4">
              Have Questions?
            </h2>
            <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto mb-8">
              We'd love to hear from you. Send us an enquiry and our team will get back to you within 24 hours.
            </p>
            <Button variant="default" size="xl" asChild>
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
