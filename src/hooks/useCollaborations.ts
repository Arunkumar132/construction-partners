import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Collaboration {
  id: string;
  name: string;
  message: string | null;
  year: number | null;
  image_url: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export const useCollaborations = () => {
  const { data: collaborations = [], isLoading, refetch } = useQuery({
    queryKey: ["collaborations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collaborations")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Collaboration[];
    },
  });

  return { collaborations, isLoading, refetch };
};
