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

type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];

interface TeamMemberFormProps {
  member?: TeamMember | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const TeamMemberForm = ({ member, onSuccess, onCancel }: TeamMemberFormProps) => {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    position: member?.position || "",
    bio: member?.bio || "",
    image_url: member?.image_url || "",
    linkedin_url: member?.linkedin_url || "",
    email: member?.email || "",
    display_order: member?.display_order || 0,
    is_leadership: member?.is_leadership || false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const operation = member
      ? supabase.from("team_members").update(formData).eq("id", member.id)
      : supabase.from("team_members").insert(formData);

    const { error } = await operation;

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: member ? "Team member updated" : "Team member added",
        description: "Changes saved successfully.",
      });
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={3}
        />
      </div>

      <ImageUpload
        label="Profile Image"
        value={formData.image_url}
        onChange={(url) => setFormData({ ...formData, image_url: url })}
        folder="team"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input
            id="linkedin_url"
            type="url"
            value={formData.linkedin_url}
            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            id="is_leadership"
            checked={formData.is_leadership}
            onCheckedChange={(checked) => setFormData({ ...formData, is_leadership: checked })}
          />
          <Label htmlFor="is_leadership">Leadership Member</Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="accent" disabled={isLoading} className="flex-1">
          {isLoading ? "Saving..." : member ? "Update" : "Add Member"}
        </Button>
      </div>
    </form>
  );
};

export default TeamMemberForm;
