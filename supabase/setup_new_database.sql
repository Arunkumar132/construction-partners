
-- ==================== Migration: 20260131061200_6c9cff71-e8d8-4c32-8419-583295ac9771.sql ====================
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
$$;

-- Create team_members table
CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    linkedin_url TEXT,
    email TEXT,
    display_order INTEGER DEFAULT 0,
    is_leadership BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    client TEXT,
    location TEXT,
    completed_at DATE,
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles (only admins can view/manage roles)
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.is_admin() OR user_id = auth.uid());

CREATE POLICY "Only admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- RLS Policies for team_members
CREATE POLICY "Anyone can view team members"
ON public.team_members FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert team members"
ON public.team_members FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update team members"
ON public.team_members FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete team members"
ON public.team_members FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS Policies for projects
CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert projects"
ON public.projects FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update projects"
ON public.projects FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete projects"
ON public.projects FOR DELETE
TO authenticated
USING (public.is_admin());

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply triggers
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;

-- ==================== Migration: 20260201055607_10a0fc9c-bc39-46c3-9f6f-e449f10b0f23.sql ====================
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

-- ==================== Migration: 20260202034506_972b17a9-0458-40a4-89c2-ab2e8afa9a9d.sql ====================
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Allow public access to view images
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated admins to upload images
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND public.is_admin());

-- Allow authenticated admins to update images
CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images' AND public.is_admin());

-- Allow authenticated admins to delete images
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND public.is_admin());

-- ==================== Migration: 20260204165040_7bc6b0fc-3d82-4b88-9b49-48ececa03b63.sql ====================
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

-- ==================== Migration: 20260208053239_add543a5-467a-43a3-bbf9-960aef91cbfe.sql ====================
-- Add video_url column to testimonials table for YouTube links
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS video_url text;

-- Add image_url column to collaborations table for client images
ALTER TABLE public.collaborations 
ADD COLUMN IF NOT EXISTS image_url text;

-- ==================== Migration: 20260209175925_932e3bbb-62db-4435-b33b-a8c8961d043d.sql ====================

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


-- ==================== Migration: 20260210170744_2b02b6d9-ad0d-4f63-8184-b8432c9b39f7.sql ====================

-- Add project_image_url to testimonials for the large background photo
ALTER TABLE public.testimonials ADD COLUMN project_image_url TEXT;


-- ==================== Migration: 20260318205500_create_services_table.sql ====================
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


-- ==================== Migration: 20260319123000_optimize_services.sql ====================
-- Optimization for services table
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);

-- Enable realtime for services table if not already enabled
ALTER PUBLICATION supabase_realtime ADD TABLE services;


-- ==================== Migration: 20260320045802_8ad99a95-edbd-46bf-9b3a-f3386a553a51.sql ====================

CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    image_url TEXT,
    link TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.services
    FOR SELECT USING (true);

CREATE POLICY "Allow admin all access" ON public.services
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);

ALTER PUBLICATION supabase_realtime ADD TABLE services;


-- ==================== Migration: 20231126000100_add_extra_image_urls.sql ====================

