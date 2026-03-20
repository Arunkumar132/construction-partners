import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Service = Tables<"services">;

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        throw error;
      }
      setServices(data || []);
    } catch (err: any) {
      console.error("Error fetching services:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("services_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "services" },
        () => {
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { services, isLoading, error, refetch: fetchServices };
};
