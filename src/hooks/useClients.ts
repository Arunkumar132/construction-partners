import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Client {
  id: string;
  name: string;
  logo_url: string | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export const useClients = () => {
  const { data: clients = [], isLoading, refetch } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Client[];
    },
  });

  return { clients, isLoading, refetch };
};
