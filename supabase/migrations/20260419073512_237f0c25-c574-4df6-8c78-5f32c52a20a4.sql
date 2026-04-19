-- Application status enum
CREATE TYPE public.application_status AS ENUM ('draft','submitted','under_review','accepted','declined','waitlisted');

CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.application_status NOT NULL DEFAULT 'draft',

  -- Applicant
  applicant_first_name TEXT,
  applicant_last_name TEXT,
  applicant_dob DATE,
  applicant_gender TEXT,
  applicant_nationality TEXT DEFAULT 'Kenyan',

  -- Previous school
  previous_school TEXT,
  kcpe_index_no TEXT,
  kcpe_marks INTEGER,
  kcpe_year INTEGER,

  -- Guardian
  guardian_full_name TEXT,
  guardian_relationship TEXT,
  guardian_phone TEXT,
  guardian_email TEXT,
  guardian_id_number TEXT,
  guardian_address TEXT,

  -- Preferences
  boarding_preference TEXT,         -- boarder / day
  intended_form TEXT DEFAULT 'Form 1',
  notes TEXT,

  -- Documents (storage paths)
  document_paths JSONB DEFAULT '[]'::jsonb,

  current_step INTEGER NOT NULL DEFAULT 1,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_applications_user ON public.applications(user_id);
CREATE INDEX idx_applications_status ON public.applications(status);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Owner policies
CREATE POLICY "Users can view their own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON public.applications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications"
  ON public.applications FOR DELETE
  USING (auth.uid() = user_id);

-- Staff/admin policies
CREATE POLICY "Staff can view all applications"
  ON public.applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage all applications"
  ON public.applications FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- submitted_at stamper
CREATE OR REPLACE FUNCTION public.stamp_application_submitted()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'submitted' AND (OLD.status IS DISTINCT FROM 'submitted') THEN
    NEW.submitted_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER stamp_application_submitted_trigger
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.stamp_application_submitted();

-- Storage bucket for application documents (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Each user uploads to a folder named with their auth uid
CREATE POLICY "Users can read their own application documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'application-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own application documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'application-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own application documents"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'application-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own application documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'application-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Staff can read all application documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'application-documents' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff')));