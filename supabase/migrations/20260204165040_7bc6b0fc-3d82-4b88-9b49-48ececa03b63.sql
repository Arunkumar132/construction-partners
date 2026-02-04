-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create collaborations table
CREATE TABLE public.collaborations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT,
  year INTEGER,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Enable RLS on collaborations
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;

-- Clients policies
CREATE POLICY "Anyone can view clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Only admins can insert clients" ON public.clients FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Only admins can update clients" ON public.clients FOR UPDATE USING (is_admin());
CREATE POLICY "Only admins can delete clients" ON public.clients FOR DELETE USING (is_admin());

-- Collaborations policies
CREATE POLICY "Anyone can view collaborations" ON public.collaborations FOR SELECT USING (true);
CREATE POLICY "Only admins can insert collaborations" ON public.collaborations FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Only admins can update collaborations" ON public.collaborations FOR UPDATE USING (is_admin());
CREATE POLICY "Only admins can delete collaborations" ON public.collaborations FOR DELETE USING (is_admin());

-- Triggers for updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_collaborations_updated_at BEFORE UPDATE ON public.collaborations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Remove video_url and project_image_url from testimonials
ALTER TABLE public.testimonials DROP COLUMN IF EXISTS video_url;
ALTER TABLE public.testimonials DROP COLUMN IF EXISTS project_image_url;