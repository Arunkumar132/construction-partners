import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "./ImageUpload";
import type { Client } from "@/hooks/useClients";

interface ClientFormProps {
  client?: Client | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ClientForm = ({ client, onSuccess, onCancel }: ClientFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: client?.name || "",
    logo_url: client?.logo_url || "",
    display_order: client?.display_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      name: formData.name,
      logo_url: formData.logo_url || null,
      display_order: formData.display_order,
    };

    if (client) {
      const { error } = await supabase
        .from("clients")
        .update(data)
        .eq("id", client.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Client updated successfully." });
        onSuccess();
      }
    } else {
      const { error } = await supabase.from("clients").insert(data);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Client added successfully." });
        onSuccess();
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Client Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <ImageUpload
        label="Logo"
        value={formData.logo_url}
        onChange={(url) => setFormData({ ...formData, logo_url: url })}
        folder="clients"
      />

      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="accent" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Saving..." : client ? "Update" : "Add Client"}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
