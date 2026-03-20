import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png"; // your logo path here

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* ======= 1. Company Info ======= */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-3 mb-6 whitespace-nowrap"
            >
              <img
                src={logo}
                alt="Shree Vaari Spaces Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-display font-bold tracking-tight">
                Shree Vaari Spaces
              </span>
            </Link>

            <p className="text-primary-foreground/70 leading-relaxed mb-10">
              Building excellence for over 7 years — turning visions into reality
              through precision, quality and dedication.
            </p>
          </div>

          {/* ======= 2. Quick Links ======= */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["About Us", "Services", "Clients", "Team", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-").replace("about-us", "about")}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ======= 3. Services ======= */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Construction", path: "/services/construction" },
                { name: "Interior Design", path: "/services/interior" },
                { name: "Exterior Design", path: "/services/exterior" },
                { name: "Consulting", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ======= 4. Contact Info ======= */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-lg font-display font-semibold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 leading-snug">
                  No: 26-A, Bishop Amburose Nagar, Arasur, Sulur, Coimbatore – 641 407
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <a
                  href="tel:+919788323394"
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  +91 97883 23394
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <a
                  href="mailto:info@shreevaarispaces.com"
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  info@shreevaarispaces.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ======= Bottom Bar ======= */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Shree Vaari Spaces. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
