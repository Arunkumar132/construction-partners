import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, FolderOpen, MessageSquare, Plus, Edit2, Trash2, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useProjects } from "@/hooks/useProjects";
import { useTestimonials } from "@/hooks/useTestimonials";
import TeamMemberForm from "@/components/admin/TeamMemberForm";
import ProjectForm from "@/components/admin/ProjectForm";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const { teamMembers, refetch: refetchTeam } = useTeamMembers();
  const { projects, refetch: refetchProjects } = useProjects();
  const { testimonials, refetch: refetchTestimonials } = useTestimonials();
  const { toast } = useToast();

  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showTestimonialDialog, setShowTestimonialDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

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

  const handleDeleteTestimonial = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Testimonial removed successfully." });
      refetchTestimonials();
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
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
            <TabsList className="grid w-full max-w-xl grid-cols-3">
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Testimonials
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
                          <div className="w-16 h-12 rounded bg-muted overflow-hidden shrink-0">
                            {testimonial.project_image_url ? (
                              <img
                                src={testimonial.project_image_url}
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
    </div>
  );
};

export default Admin;
