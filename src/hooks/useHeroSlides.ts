import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HeroSlide {
  id: string;
  image_url: string;
  display_order: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useHeroSlides = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlides = async () => {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error) {
      setSlides(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSlides();

    const channel = supabase
      .channel("hero_slides_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "hero_slides" }, () => {
        fetchSlides();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { slides, isLoading, refetch: fetchSlides };
};
