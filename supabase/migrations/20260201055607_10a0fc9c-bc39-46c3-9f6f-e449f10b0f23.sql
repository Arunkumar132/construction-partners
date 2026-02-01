-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    location TEXT,
    testimonial TEXT NOT NULL,
    project_image_url TEXT,
    client_image_url TEXT,
    video_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for testimonials
CREATE POLICY "Anyone can view testimonials" 
ON public.testimonials 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Only admins can update testimonials" 
ON public.testimonials 
FOR UPDATE 
USING (is_admin());

CREATE POLICY "Only admins can delete testimonials" 
ON public.testimonials 
FOR DELETE 
USING (is_admin());

-- Enable realtime for testimonials
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;

-- Add updated_at trigger
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();