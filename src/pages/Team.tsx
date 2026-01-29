import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import teamGroup from "@/assets/team-group.jpg";

const leadership = [
  {
    name: "Robert Martinez",
    position: "Founder & CEO",
    bio: "With 20+ years in construction, Robert founded BuildCraft with a vision to redefine industry standards.",
    image: "👨‍💼",
  },
  {
    name: "Sarah Williams",
    position: "Chief Operations Officer",
    bio: "Sarah ensures seamless project delivery with her expertise in operations and project management.",
    image: "👩‍💼",
  },
  {
    name: "David Chen",
    position: "Chief Architect",
    bio: "David leads our design team, bringing innovative architectural solutions to every project.",
    image: "👨‍🔧",
  },
  {
    name: "Emily Thompson",
    position: "Director of Engineering",
    bio: "Emily oversees all engineering operations, ensuring structural excellence and safety.",
    image: "👩‍🔧",
  },
];

const departments = [
  { name: "Architecture & Design", count: 12 },
  { name: "Project Management", count: 8 },
  { name: "Engineering", count: 15 },
  { name: "Interior Design", count: 6 },
  { name: "Site Operations", count: 10 },
  { name: "Quality Assurance", count: 4 },
];

const values = [
  {
    title: "Excellence",
    description: "We strive for excellence in every detail, from planning to execution.",
  },
  {
    title: "Integrity",
    description: "Honesty and transparency guide all our interactions and decisions.",
  },
  {
    title: "Innovation",
    description: "We embrace new technologies and methods to deliver better results.",
  },
  {
    title: "Teamwork",
    description: "Collaboration is at the heart of everything we accomplish.",
  },
];

const Team = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
        <div className="absolute inset-0">
          <img
            src={teamGroup}
            alt="BuildCraft Team"
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
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              The People Behind
              <span className="text-gradient-accent block">BuildCraft</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl">
              A dedicated team of 50+ professionals united by a passion for construction excellence 
              and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Leadership"
            title="Meet Our Leaders"
            subtitle="The visionaries driving BuildCraft forward"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group"
              >
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-5xl mx-auto mb-6">
                  {member.image}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium mb-3">{member.position}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section-padding bg-secondary">
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

      {/* Our Values */}
      <section className="section-padding bg-primary">
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
                  <span className="text-3xl font-display font-bold text-accent">
                    {index + 1}
                  </span>
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

      {/* Join Our Team CTA */}
      <section className="section-padding bg-accent">
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