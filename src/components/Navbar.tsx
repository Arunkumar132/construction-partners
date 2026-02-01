import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Clients", path: "/clients" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-accent" />
            <span className="text-xl font-display font-bold text-primary-foreground">
              BuildCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="accent" asChild>
              <Link to="/contact">Get a Quote</Link>
            </Button>
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Button variant="ghost" size="sm" asChild className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                    <Link to="/admin">Dashboard</Link>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={signOut}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" asChild className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/admin/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "bg-accent text-accent-foreground"
                        : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="accent" className="w-full" asChild>
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                  {user ? (
                    <>
                      {isAdmin && (
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/admin" onClick={() => setIsOpen(false)}>
                            Admin Dashboard
                          </Link>
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        className="w-full text-primary-foreground/80"
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Admin Login
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
