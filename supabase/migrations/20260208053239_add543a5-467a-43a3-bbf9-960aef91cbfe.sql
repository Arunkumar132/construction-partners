-- Add video_url column to testimonials table for YouTube links
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS video_url text;

-- Add image_url column to collaborations table for client images
ALTER TABLE public.collaborations 
ADD COLUMN IF NOT EXISTS image_url text;