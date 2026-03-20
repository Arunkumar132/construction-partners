-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon_name TEXT, -- e.g., 'Building', 'Paintbrush', 'Home'
    image_url TEXT,
    link TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON public.services
    FOR SELECT USING (true);

CREATE POLICY "Allow admin all access" ON public.services
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Add sample data (from Index.tsx)
INSERT INTO public.services (title, description, icon_name, image_url, link, display_order)
VALUES 
('Construction', 'Complete construction services from foundation to finishing, delivering quality structures on time.', 'Building', 'https://shreevaari.com/assets/service-construction.avif', '/services/construction', 1),
('Interior Design', 'Transform spaces with our expert interior design services, blending aesthetics with functionality.', 'Paintbrush', 'https://shreevaari.com/assets/service-interior.avif', '/services/interior', 2),
('Exterior Design', 'Create stunning facades and outdoor spaces that make lasting impressions.', 'Home', 'https://shreevaari.com/assets/service-exterior.avif', '/services/exterior', 3)
ON CONFLICT DO NOTHING;
