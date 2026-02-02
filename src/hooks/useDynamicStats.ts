import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  projectsCount: number;
  clientsCount: number;
  teamCount: number;
}

export const useDynamicStats = () => {
  return useQuery({
    queryKey: ["dynamic-stats"],
    queryFn: async (): Promise<Stats> => {
      // Get projects count
      const { count: projectsCount, error: projectsError } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      if (projectsError) throw projectsError;

      // Get unique clients count from projects
      const { data: clientsData, error: clientsError } = await supabase
        .from("projects")
        .select("client")
        .not("client", "is", null);

      if (clientsError) throw clientsError;

      const uniqueClients = new Set(clientsData.map(p => p.client).filter(Boolean));

      // Get team members count
      const { count: teamCount, error: teamError } = await supabase
        .from("team_members")
        .select("*", { count: "exact", head: true });

      if (teamError) throw teamError;

      return {
        projectsCount: projectsCount || 0,
        clientsCount: uniqueClients.size,
        teamCount: teamCount || 0,
      };
    },
  });
};
