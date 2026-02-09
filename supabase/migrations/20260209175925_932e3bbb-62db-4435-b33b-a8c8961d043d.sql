
-- Create hero_slides table for admin-managed banner images
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Hero slides are viewable by everyone"
ON public.hero_slides FOR SELECT USING (true);

-- Admin insert/update/delete via authenticated users
CREATE POLICY "Admins can manage hero slides"
ON public.hero_slides FOR ALL
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.hero_slides;
