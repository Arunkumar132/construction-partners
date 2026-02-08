import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "./ImageUpload";
import type { Collaboration } from "@/hooks/useCollaborations";

interface CollaborationFormProps {
  collaboration?: Collaboration | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const CollaborationForm = ({ collaboration, onSuccess, onCancel }: CollaborationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: collaboration?.name || "",
    message: collaboration?.message || "",
    year: collaboration?.year || new Date().getFullYear(),
    image_url: collaboration?.image_url || "",
    display_order: collaboration?.display_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      name: formData.name,
      message: formData.message || null,
      year: formData.year,
      image_url: formData.image_url || null,
      display_order: formData.display_order,
    };

    if (collaboration) {
      const { error } = await supabase
        .from("collaborations")
        .update(data)
        .eq("id", collaboration.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Collaboration updated successfully." });
        onSuccess();
      }
    } else {
      const { error } = await supabase.from("collaborations").insert(data);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Collaboration added successfully." });
        onSuccess();
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Collaboration Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={3}
          placeholder="Brief description of the collaboration..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <ImageUpload
        label="Client Image (shown in top right corner)"
        value={formData.image_url}
        onChange={(url) => setFormData({ ...formData, image_url: url })}
        folder="collaborations"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            min="1900"
            max="2100"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="accent" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Saving..." : collaboration ? "Update" : "Add Collaboration"}
        </Button>
      </div>
    </form>
  );
};

export default CollaborationForm;
