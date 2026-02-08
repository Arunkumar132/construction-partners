import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  projectsCount: number;
  clientsCount: number;
  teamCount: number;
  yearsExperience: number;
}

// Base values to add to dynamic counts
const BASE_PROJECTS = 31;
const BASE_CLIENTS = 11;
const BASE_TEAMS = 10;
const START_YEAR = 2018;
 // Company founding year

export const useDynamicStats = () => {
  return useQuery({
    queryKey: ["dynamic-stats"],
    queryFn: async (): Promise<Stats> => {
      // Get projects count
      const { count: projectsCount, error: projectsError } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      if (projectsError) throw projectsError;

      // Get clients count from clients table
      const { count: clientsCount, error: clientsError } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });

      if (clientsError) throw clientsError;

      // Get team members count
      const { count: teamCount, error: teamError } = await supabase
        .from("team_members")
        .select("*", { count: "exact", head: true });

      if (teamError) throw teamError;

      // Calculate years of experience based on Feb 1 anniversary
      const today = new Date();
      const currentYear = today.getFullYear();
      const anniversaryThisYear = new Date(currentYear, 1, 1); // Feb 1 of current year
      
      let yearsExperience = currentYear - START_YEAR;
      if (today < anniversaryThisYear) {
        yearsExperience -= 1;
      }

      return {
        projectsCount: BASE_PROJECTS + (projectsCount || 0),
        clientsCount: BASE_CLIENTS + (clientsCount || 0),
        teamCount:  BASE_TEAMS + (teamCount || 0),
        yearsExperience,
      };
    },
  });
};
