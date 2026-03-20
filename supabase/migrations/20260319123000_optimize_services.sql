-- Optimization for services table
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);

-- Enable realtime for services table if not already enabled
ALTER PUBLICATION supabase_realtime ADD TABLE services;
