import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "./ImageUpload";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSuccess, onCancel }: ProjectFormProps) => {
  // Extract up to 3 images from comma-separated image_url
  const initialImages = (project?.image_url || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const [images, setImages] = useState<string[]>([
    initialImages[0] || "",
    initialImages[1] || "",
    initialImages[2] || "",
  ]);

  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || "",
    client: project?.client || "",
    location: project?.location || "",
    completed_at: project?.completed_at || "",
    display_order: project?.display_order || 0,
    is_featured: project?.is_featured || false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const combinedImageUrl = images.filter(Boolean).join(",") || null;

    const dataToSubmit = {
      title: formData.title,
      description: formData.description || null,
      image_url: combinedImageUrl,
      category: formData.category || null,
      client: formData.client || null,
      location: formData.location || null,
      completed_at: formData.completed_at || null,
      display_order: formData.display_order,
      is_featured: formData.is_featured,
    };

    const operation = project
      ? supabase.from("projects").update(dataToSubmit).eq("id", project.id)
      : supabase.from("projects").insert(dataToSubmit);

    const { error } = await operation;

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: project ? "Project updated" : "Project added",
        description: "Changes saved successfully.",
      });
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Project Images (Up to 3)</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageUpload
            label="Image 1 (Main Cover)"
            value={images[0] || ""}
            onChange={(url) => {
              const next = [...images];
              next[0] = url;
              setImages(next);
            }}
            folder="projects"
          />
          <ImageUpload
            label="Image 2"
            value={images[1] || ""}
            onChange={(url) => {
              const next = [...images];
              next[1] = url;
              setImages(next);
            }}
            folder="projects"
          />
          <ImageUpload
            label="Image 3"
            value={images[2] || ""}
            onChange={(url) => {
              const next = [...images];
              next[2] = url;
              setImages(next);
            }}
            folder="projects"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Commercial, Residential, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client">Client</Label>
          <Input
            id="client"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="completed_at">Completion Date</Label>
          <Input
            id="completed_at"
            type="date"
            value={formData.completed_at}
            onChange={(e) => setFormData({ ...formData, completed_at: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label htmlFor="is_featured">Featured Project</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="accent" disabled={isLoading} className="flex-1">
          {isLoading ? "Saving..." : project ? "Update" : "Add Project"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
