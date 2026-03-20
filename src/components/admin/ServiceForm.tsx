import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "./ImageUpload";
import { Building2, Paintbrush, Home, HardHat, Ruler, Hammer, ClipboardCheck, CheckCircle, Smartphone, Globe, Layers, Layout, Award, HelpCircle } from "lucide-react";

import { Service } from "@/hooks/useServices";

interface ServiceFormProps {
  service: Service | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const icons = [
  { name: 'Building2', Icon: Building2 },
  { name: 'Paintbrush', Icon: Paintbrush },
  { name: 'Home', Icon: Home },
  { name: 'HardHat', Icon: HardHat },
  { name: 'Ruler', Icon: Ruler },
  { name: 'Hammer', Icon: Hammer },
  { name: 'ClipboardCheck', Icon: ClipboardCheck },
  { name: 'CheckCircle', Icon: CheckCircle },
  { name: 'Smartphone', Icon: Smartphone },
  { name: 'Globe', Icon: Globe },
  { name: 'Layers', Icon: Layers },
  { name: 'Layout', Icon: Layout },
  { name: 'Award', Icon: Award },
  { name: 'HelpCircle', Icon: HelpCircle },
];

const ServiceForm = ({ service, onSuccess, onCancel }: ServiceFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon_name: "Building2",
    image_url: "",
    link: "",
    display_order: 1,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        description: service.description || "",
        icon_name: service.icon_name || "Building2",
        image_url: service.image_url || "",
        link: service.link || "",
        display_order: service.display_order || 1,
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (service) {
        const { error } = await supabase
          .from("services")
          .update(formData as any)
          .eq("id", service.id);
        if (error) throw error;
        toast({ title: "Success", description: "Service updated successfully." });
      } else {
        const { error } = await supabase.from("services").insert([formData as any]);
        if (error) throw error;
        toast({ title: "Success", description: "Service added successfully." });
      }
      onSuccess();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Select Icon</Label>
        <div className="grid grid-cols-7 gap-2">
          {icons.map(({ name, Icon }) => (
            <button
              key={name}
              type="button"
              className={`p-2 rounded-lg border transition-all ${
                formData.icon_name === name ? "bg-accent border-accent text-accent-foreground" : "hover:bg-accent/10"
              }`}
              onClick={() => setFormData({ ...formData, icon_name: name })}
            >
              <Icon className="h-5 w-5 mx-auto" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <ImageUpload
          label="Service Image"
          value={formData.image_url}
          onChange={(url) => setFormData({ ...formData, image_url: url })}
          folder="services"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="link">Link Path (e.g. /services/interior)</Label>
          <Input
            id="link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="accent" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Service"}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
