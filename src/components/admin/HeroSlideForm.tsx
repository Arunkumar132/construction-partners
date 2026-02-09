import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "./ImageUpload";
import type { HeroSlide } from "@/hooks/useHeroSlides";

interface HeroSlideFormProps {
  slide?: HeroSlide | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const HeroSlideForm = ({ slide, onSuccess, onCancel }: HeroSlideFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    image_url: slide?.image_url || "",
    display_order: slide?.display_order || 0,
    is_active: slide?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      image_url: formData.image_url,
      display_order: formData.display_order,
      is_active: formData.is_active,
    };

    if (slide) {
      const { error } = await supabase.from("hero_slides").update(data).eq("id", slide.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Slide updated." });
        onSuccess();
      }
    } else {
      const { error } = await supabase.from("hero_slides").insert(data);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Slide added." });
        onSuccess();
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageUpload
        label="Banner Image *"
        value={formData.image_url}
        onChange={(url) => setFormData({ ...formData, image_url: url })}
        folder="hero-slides"
      />

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
        <div className="flex items-center gap-2 pt-7">
          <Switch
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <Label>Active</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" variant="accent" disabled={isSubmitting || !formData.image_url} className="flex-1">
          {isSubmitting ? "Saving..." : slide ? "Update" : "Add Slide"}
        </Button>
      </div>
    </form>
  );
};

export default HeroSlideForm;
