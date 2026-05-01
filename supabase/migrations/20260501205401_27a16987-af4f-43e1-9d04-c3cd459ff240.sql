-- =====================================================================
-- CMS: pages + page_blocks with Draft/Publish workflow (admins only edit)
-- =====================================================================

-- Status enum for pages
CREATE TYPE public.page_status AS ENUM ('draft', 'published');

-- Pages table: one row per route/page on the site
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,                -- e.g. 'home', 'about', 'academics'
  title TEXT NOT NULL,
  description TEXT,                         -- SEO meta description
  status public.page_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Anyone (public) can read pages that are published
CREATE POLICY "Public can view published pages"
  ON public.pages FOR SELECT
  USING (status = 'published');

-- Admins can do everything
CREATE POLICY "Admins manage pages"
  ON public.pages FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER pages_set_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Page blocks: ordered list of typed content blocks per page
CREATE TABLE public.page_blocks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL,                  -- 'hero','richtext','stats','gallery','cta','testimonials','cards','faq','image','video','breaking_news'
  position INTEGER NOT NULL DEFAULT 0,       -- order within page
  draft_data JSONB NOT NULL DEFAULT '{}'::jsonb,      -- working copy
  published_data JSONB,                      -- last published snapshot (NULL = never published)
  is_visible BOOLEAN NOT NULL DEFAULT true,  -- hide block without deleting
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX page_blocks_page_position_idx ON public.page_blocks(page_id, position);

ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

-- Public can read only published blocks (have a published_data) on published pages
CREATE POLICY "Public can view published blocks"
  ON public.page_blocks FOR SELECT
  USING (
    published_data IS NOT NULL
    AND is_visible = true
    AND EXISTS (
      SELECT 1 FROM public.pages p
      WHERE p.id = page_blocks.page_id AND p.status = 'published'
    )
  );

-- Admins can do everything
CREATE POLICY "Admins manage page blocks"
  ON public.page_blocks FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER page_blocks_set_updated_at
  BEFORE UPDATE ON public.page_blocks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for CMS-uploaded media (images, hero photos, gallery, etc.)
INSERT INTO storage.buckets (id, name, public)
  VALUES ('page-media', 'page-media', true)
  ON CONFLICT (id) DO NOTHING;

-- Public can read media
CREATE POLICY "Public can read page media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'page-media');

-- Admins can upload/update/delete media
CREATE POLICY "Admins upload page media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'page-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update page media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'page-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete page media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'page-media' AND public.has_role(auth.uid(), 'admin'));

-- Seed empty pages for every route on the site (admins can immediately add blocks)
INSERT INTO public.pages (slug, title, description, status, published_at) VALUES
  ('home',           'Home',                 'St. Mary''s Senior School, Bomet — shaping tomorrow''s leaders today.', 'published', now()),
  ('about',          'About Us',             'Founded 1990 by the Catholic Diocese of Kericho.',                    'published', now()),
  ('academics',      'Academics',            'CBE-aligned curriculum, Junior & Senior Secondary pathways.',         'published', now()),
  ('admissions',     'Admissions',           'How to apply, fees, open days.',                                      'published', now()),
  ('school-life',    'School Life',          'Boarding, sports, music, clubs and arts.',                            'published', now()),
  ('news',           'News & Events',        'Latest from St. Mary''s, Bomet.',                                     'published', now()),
  ('contact',        'Contact',              'Reach the school office, departments and campus.',                    'published', now()),
  ('virtual-tour',   'Virtual Tour',         'Walk through the St. Mary''s campus online.',                         'published', now()),
  ('exam-downloads', 'Exam Downloads',       'Past papers, marking schemes and revision resources.',                'published', now()),
  ('gallery',        'Gallery',              'Photos and event highlights from across the school.',                 'published', now())
ON CONFLICT (slug) DO NOTHING;