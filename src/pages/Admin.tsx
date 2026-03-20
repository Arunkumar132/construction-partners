import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, FolderOpen, MessageSquare, Plus, Edit2, Trash2, LogOut, Home, Building2, Handshake, Image, Briefcase, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useProjects } from "@/hooks/useProjects";
import { useServices } from "@/hooks/useServices";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useClients, Client } from "@/hooks/useClients";
import { useCollaborations, Collaboration } from "@/hooks/useCollaborations";
import { useHeroSlides, HeroSlide } from "@/hooks/useHeroSlides";
import TeamMemberForm from "@/components/admin/TeamMemberForm";
import ProjectForm from "@/components/admin/ProjectForm";
import ServiceForm from "@/components/admin/ServiceForm";
import TestimonialForm from "@/components/admin/TestimonialForm";
import ClientForm from "@/components/admin/ClientForm";
import CollaborationForm from "@/components/admin/CollaborationForm";
import HeroSlideForm from "@/components/admin/HeroSlideForm";
import AccountSettings from "@/components/admin/AccountSettings";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
type Service = any;

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const { teamMembers, refetch: refetchTeam } = useTeamMembers();
  const { projects, refetch: refetchProjects } = useProjects();
  const { services, refetch: refetchServices } = useServices();
  const { testimonials, refetch: refetchTestimonials } = useTestimonials();
  const { clients, refetch: refetchClients } = useClients();
  const { collaborations, refetch: refetchCollaborations } = useCollaborations();
  const { slides: heroSlides, refetch: refetchHeroSlides } = useHeroSlides();
  const { toast } = useToast();

  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showTestimonialDialog, setShowTestimonialDialog] = useState(false);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showCollaborationDialog, setShowCollaborationDialog] = useState(false);
  const [showHeroSlideDialog, setShowHeroSlideDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editingCollaboration, setEditingCollaboration] = useState<Collaboration | null>(null);
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              You don't have admin access. Please contact an administrator.
            </p>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDeleteMember = async (id: string) => {
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Team member removed successfully." });
      refetchTeam();
    }
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Project removed successfully." });
      refetchProjects();
    }
  };

  const handleDeleteService = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Service removed successfully." });
      refetchServices();
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Testimonial removed successfully." });
      refetchTestimonials();
    }
  };

  const handleDeleteClient = async (id: string) => {
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Client removed successfully." });
      refetchClients();
    }
  };

  const handleDeleteCollaboration = async (id: string) => {
    const { error } = await supabase.from("collaborations").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Collaboration removed successfully." });
      refetchCollaborations();
    }
  };

  const handleDeleteHeroSlide = async (id: string) => {
    const { error } = await supabase.from("hero_slides").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Slide removed successfully." });
      refetchHeroSlides();
    }
  };

  return (
    <div className="min-h-screen bg-secondary uppercase-none">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-display font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="team" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto p-1 bg-muted/50 w-full lg:grid lg:grid-cols-7 gap-1">
              <TabsTrigger value="team" className="flex items-center gap-2 py-2.5">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2 py-2.5">
                <FolderOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2 py-2.5">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
              <TabsTrigger value="clients" className="flex items-center gap-2 py-2.5">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clients</span>
              </TabsTrigger>
              <TabsTrigger value="collaborations" className="flex items-center gap-2 py-2.5">
                <Handshake className="h-4 w-4" />
                <span className="hidden sm:inline">Collaborations</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-2 py-2.5">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Testimonials</span>
              </TabsTrigger>
              <TabsTrigger value="hero-slides" className="flex items-center gap-2 py-2.5">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Banners</span>
              </TabsTrigger>
            </TabsList>

            {/* Team Members Tab */}
            <TabsContent value="team">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Team Members ({teamMembers.length})</CardTitle>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      setEditingMember(null);
                      setShowTeamDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </CardHeader>
                <CardContent>
                  {teamMembers.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No team members yet. Add your first team member!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-4 p-4 bg-background rounded-lg border"
                        >
                          <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
                            {member.image_url ? (
                              <img
                                src={member.image_url}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <Users className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{member.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {member.position}
                              {member.is_leadership && (
                                <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">
                                  Leadership
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingMember(member);
                                setShowTeamDialog(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete team member?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete {member.name} from the team.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteMember(member.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Projects ({projects.length})</CardTitle>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      setEditingProject(null);
                      setShowProjectDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No projects yet. Add your first project!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center gap-4 p-4 bg-background rounded-lg border"
                        >
                          <div className="w-16 h-12 rounded bg-muted overflow-hidden shrink-0">
                            {project.image_url ? (
                              <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <FolderOpen className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{project.title}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {project.category}
                              {project.is_featured && (
                                <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">
                                  Featured
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingProject(project);
                                setShowProjectDialog(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete project?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete "{project.title}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Core Services ({services.length})</CardTitle>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      setEditingService(null);
                      setShowServiceDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </CardHeader>
                <CardContent>
                  {services.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No services yet. Add your first core service!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {services.map((service: any) => (
                        <div
                          key={service.id}
                          className="flex items-center gap-4 p-4 bg-background rounded-lg border"
                        >
                          <div className="w-16 h-12 rounded bg-muted overflow-hidden shrink-0">
                            {service.image_url ? (
                              <img
                                src={service.image_url}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <Briefcase className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{service.title}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              Order: {service.display_order} • Icon: {service.icon_name}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingService(service);
                                setShowServiceDialog(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete service?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete "{service.title}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteService(service.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Clients ({clients.length})</CardTitle>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      setEditingClient(null);
                      setShowClientDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </CardHeader>
                <CardContent>
                  {clients.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No clients yet. Add your first client!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {clients.map((client) => (
                        <div
                          key={client.id}
                          className="flex items-center gap-4 p-4 bg-background rounded-lg border"
                        >
                          <div className="w-16 h-12 rounded bg-muted overflow-hidden shrink-0">
                            {client.logo_url ? (
                              <img
                                src={client.logo_url}
                                alt={client.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <Building2 className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{client.name}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingClient(client);
                                setShowClientDialog(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete client?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete "{client.name}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteClient(client.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Collaborations Tab */}
            <TabsContent value="collaborations">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Collaborations ({collaborations.length})</CardTitle>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      setEditingCollaboration(null);
                      setShowCollaborationDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Collaboration
                  </Button>
                </CardHeader>
                <CardContent>
                  {collaborations.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No collaborations yet. Add your first collaboration!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {collaborations.map((collab) => (
                        <div
                          key={collab.id}
                          className="flex items-center gap-4 p-4 bg-background rounded-lg border"
                        >
                          <div className="w-12 h-12 rounded bg-muted overflow-hidden shrink-0 flex items-center justify-center text-muted-foreground">
                            <Handshake className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{collab.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {collab.year && <span className="text-accent">{collab.year}</span>}
                              {collab.message && <span className="ml-2">• {collab.message}</span>}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingCollaboration(collab);
                                setShowCollaborationDialog(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete collaboration?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete "{collab.name}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteCollaboration(collab.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Testimonials ({testimonials.length})</CardTitle>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      setEditingTestimonial(null);
                      setShowTestimonialDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </CardHeader>
                <CardContent>
                  {testimonials.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No testimonials yet. Add your first testimonial!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {testimonials.map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="flex items-center gap-4 p-4 bg-background rounded-lg border"
                        >
                          <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
                            {testimonial.client_image_url ? (
                              <img
                                src={testimonial.client_image_url}
                                alt={testimonial.client_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <MessageSquare className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{testimonial.client_name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {testimonial.location || "No location"}
                              {testimonial.is_featured && (
                                <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">
                                  Featured
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingTestimonial(testimonial);
                                setShowTestimonialDialog(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete testimonial?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the testimonial from {testimonial.client_name}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteTestimonial(testimonial.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hero Slides Tab */}
            <TabsContent value="hero-slides">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Banner Slides ({heroSlides.length})</CardTitle>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => {
                      setEditingHeroSlide(null);
                      setShowHeroSlideDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slide
                  </Button>
                </CardHeader>
                <CardContent>
                  {heroSlides.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No banner slides yet. Default images will be used until you add slides here.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {heroSlides.map((slide) => (
                        <div key={slide.id} className="flex items-center gap-4 p-4 bg-background rounded-lg border">
                          <div className="w-24 h-14 rounded bg-muted overflow-hidden shrink-0">
                            <img src={slide.image_url} alt="Slide" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">Slide (Order: {slide.display_order})</p>
                            <p className="text-sm text-muted-foreground">{slide.is_active ? "Active" : "Inactive"}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button variant="outline" size="icon" onClick={() => { setEditingHeroSlide(slide); setShowHeroSlideDialog(true); }}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete slide?</AlertDialogTitle>
                                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteHeroSlide(slide.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Team Member Dialog */}
      <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          <TeamMemberForm
            member={editingMember}
            onSuccess={() => {
              setShowTeamDialog(false);
              refetchTeam();
            }}
            onCancel={() => setShowTeamDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={editingProject}
            onSuccess={() => {
              setShowProjectDialog(false);
              refetchProjects();
            }}
            onCancel={() => setShowProjectDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add Service"}
            </DialogTitle>
          </DialogHeader>
          <ServiceForm
            service={editingService}
            onSuccess={() => {
              setShowServiceDialog(false);
              refetchServices();
            }}
            onCancel={() => setShowServiceDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Client Dialog */}
      <Dialog open={showClientDialog} onOpenChange={setShowClientDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? "Edit Client" : "Add Client"}
            </DialogTitle>
          </DialogHeader>
          <ClientForm
            client={editingClient}
            onSuccess={() => {
              setShowClientDialog(false);
              refetchClients();
            }}
            onCancel={() => setShowClientDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Collaboration Dialog */}
      <Dialog open={showCollaborationDialog} onOpenChange={setShowCollaborationDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCollaboration ? "Edit Collaboration" : "Add Collaboration"}
            </DialogTitle>
          </DialogHeader>
          <CollaborationForm
            collaboration={editingCollaboration}
            onSuccess={() => {
              setShowCollaborationDialog(false);
              refetchCollaborations();
            }}
            onCancel={() => setShowCollaborationDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Testimonial Dialog */}
      <Dialog open={showTestimonialDialog} onOpenChange={setShowTestimonialDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <TestimonialForm
            testimonial={editingTestimonial}
            onSuccess={() => {
              setShowTestimonialDialog(false);
              refetchTestimonials();
            }}
            onCancel={() => setShowTestimonialDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Hero Slide Dialog */}
      <Dialog open={showHeroSlideDialog} onOpenChange={setShowHeroSlideDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingHeroSlide ? "Edit Slide" : "Add Slide"}
            </DialogTitle>
          </DialogHeader>
          <HeroSlideForm
            slide={editingHeroSlide}
            onSuccess={() => {
              setShowHeroSlideDialog(false);
              refetchHeroSlides();
            }}
            onCancel={() => setShowHeroSlideDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
