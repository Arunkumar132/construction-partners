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

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const TestimonialForm = ({ testimonial, onSuccess, onCancel }: TestimonialFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    client_name: testimonial?.client_name || "",
    location: testimonial?.location || "",
    testimonial: testimonial?.testimonial || "",
    client_image_url: testimonial?.client_image_url || "",
    project_image_url: (testimonial as any)?.project_image_url || "",
    video_url: testimonial?.video_url || "",
    display_order: testimonial?.display_order || 0,
    is_featured: testimonial?.is_featured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      client_name: formData.client_name,
      location: formData.location || null,
      testimonial: formData.testimonial,
      client_image_url: formData.client_image_url || null,
      project_image_url: formData.project_image_url || null,
      video_url: formData.video_url || null,
      display_order: formData.display_order,
      is_featured: formData.is_featured,
    } as any;

    if (testimonial) {
      const { error } = await supabase
        .from("testimonials")
        .update(data)
        .eq("id", testimonial.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Testimonial updated successfully." });
        onSuccess();
      }
    } else {
      const { error } = await supabase.from("testimonials").insert(data);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Testimonial added successfully." });
        onSuccess();
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_name">Client Name *</Label>
          <Input
            id="client_name"
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., Kerala"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="testimonial">Testimonial *</Label>
        <Textarea
          id="testimonial"
          rows={4}
          value={formData.testimonial}
          onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
          required
        />
      </div>

      <ImageUpload
        label="Client Photo (small)"
        value={formData.client_image_url}
        onChange={(url) => setFormData({ ...formData, client_image_url: url })}
        folder="testimonials"
      />

      <ImageUpload
        label="Project/House Photo (large background)"
        value={formData.project_image_url}
        onChange={(url) => setFormData({ ...formData, project_image_url: url })}
        folder="testimonials"
      />

      <div className="space-y-2">
        <Label htmlFor="video_url">YouTube Video URL</Label>
        <Input
          id="video_url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          When clicked, the testimonial will redirect to this YouTube video.
        </p>
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
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="accent" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Saving..." : testimonial ? "Update" : "Add Testimonial"}
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;
