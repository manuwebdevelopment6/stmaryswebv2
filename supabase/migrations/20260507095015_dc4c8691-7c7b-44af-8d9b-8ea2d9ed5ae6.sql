
-- Subjects
CREATE TABLE public.subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  grade_level text,
  description text,
  icon text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Admins manage subjects" ON public.subjects FOR ALL
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Staff manage subjects" ON public.subjects FOR ALL
  USING (has_role(auth.uid(),'staff')) WITH CHECK (has_role(auth.uid(),'staff'));

-- Quiz kind
CREATE TYPE public.quiz_kind AS ENUM ('quiz','exam','trivia');

-- Quizzes
CREATE TABLE public.quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject_id uuid REFERENCES public.subjects(id) ON DELETE SET NULL,
  grade_level text,
  kind public.quiz_kind NOT NULL DEFAULT 'quiz',
  time_limit_seconds int,
  xp_reward int NOT NULL DEFAULT 50,
  is_published boolean NOT NULL DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view published quizzes" ON public.quizzes FOR SELECT
  USING (is_published = true);
CREATE POLICY "Staff/Admin view all quizzes" ON public.quizzes FOR SELECT
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));
CREATE POLICY "Staff/Admin manage quizzes" ON public.quizzes FOR ALL
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));
CREATE TRIGGER trg_quizzes_updated BEFORE UPDATE ON public.quizzes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Question kind
CREATE TYPE public.question_kind AS ENUM ('mcq','true_false','multi_select');

-- Questions
CREATE TABLE public.quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  position int NOT NULL DEFAULT 0,
  prompt text NOT NULL,
  kind public.question_kind NOT NULL DEFAULT 'mcq',
  options jsonb NOT NULL DEFAULT '[]'::jsonb, -- [{id,text}]
  correct_option_ids text[] NOT NULL DEFAULT '{}',
  points int NOT NULL DEFAULT 1,
  explanation text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view questions of published quizzes" ON public.quiz_questions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.quizzes q WHERE q.id = quiz_id AND q.is_published = true));
CREATE POLICY "Staff/Admin view all questions" ON public.quiz_questions FOR SELECT
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));
CREATE POLICY "Staff/Admin manage questions" ON public.quiz_questions FOR ALL
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));
CREATE INDEX idx_qq_quiz ON public.quiz_questions(quiz_id, position);

-- Attempts
CREATE TABLE public.quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz,
  score numeric NOT NULL DEFAULT 0,
  max_score numeric NOT NULL DEFAULT 0,
  percentage numeric NOT NULL DEFAULT 0,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  xp_earned int NOT NULL DEFAULT 0
);
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own attempts" ON public.quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Staff/Admin view attempts" ON public.quiz_attempts FOR SELECT
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));
CREATE POLICY "Users insert own attempts" ON public.quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own attempts" ON public.quiz_attempts FOR UPDATE
  USING (auth.uid() = user_id);
CREATE INDEX idx_attempts_user ON public.quiz_attempts(user_id, submitted_at DESC);

-- Assignments
CREATE TABLE public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject_id uuid REFERENCES public.subjects(id) ON DELETE SET NULL,
  grade_level text,
  due_date timestamptz,
  max_points int NOT NULL DEFAULT 100,
  attachment_path text,
  is_published boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view published assignments" ON public.assignments FOR SELECT
  USING (is_published = true);
CREATE POLICY "Staff/Admin view all assignments" ON public.assignments FOR SELECT
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));
CREATE POLICY "Staff/Admin manage assignments" ON public.assignments FOR ALL
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));
CREATE TRIGGER trg_assignments_updated BEFORE UPDATE ON public.assignments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Assignment submissions
CREATE TABLE public.assignment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  file_path text,
  notes text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  grade numeric,
  feedback text,
  graded_by uuid,
  graded_at timestamptz
);
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own submissions" ON public.assignment_submissions FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Staff/Admin view all submissions" ON public.assignment_submissions FOR SELECT
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));
CREATE POLICY "Users create own submissions" ON public.assignment_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own submissions" ON public.assignment_submissions FOR UPDATE
  USING (auth.uid() = user_id AND graded_at IS NULL);
CREATE POLICY "Staff/Admin grade submissions" ON public.assignment_submissions FOR UPDATE
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));

-- Resources
CREATE TYPE public.resource_kind AS ENUM ('note','past_paper','video','link','book');
CREATE TABLE public.learning_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject_id uuid REFERENCES public.subjects(id) ON DELETE SET NULL,
  grade_level text,
  kind public.resource_kind NOT NULL DEFAULT 'note',
  file_path text,
  external_url text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view resources" ON public.learning_resources FOR SELECT USING (true);
CREATE POLICY "Staff/Admin manage resources" ON public.learning_resources FOR ALL
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff'));

-- XP / streaks
CREATE TABLE public.student_xp (
  user_id uuid PRIMARY KEY,
  xp int NOT NULL DEFAULT 0,
  level int NOT NULL DEFAULT 1,
  current_streak int NOT NULL DEFAULT 0,
  longest_streak int NOT NULL DEFAULT 0,
  last_active_date date,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.student_xp ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view xp (leaderboard)" ON public.student_xp FOR SELECT USING (true);
CREATE POLICY "Users upsert own xp" ON public.student_xp FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own xp" ON public.student_xp FOR UPDATE USING (auth.uid() = user_id);

-- Badges
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  icon text NOT NULL DEFAULT 'Award',
  criteria jsonb NOT NULL DEFAULT '{}'::jsonb
);
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Admins manage badges" ON public.badges FOR ALL
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

CREATE TABLE public.user_badges (
  user_id uuid NOT NULL,
  badge_id uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  awarded_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view user badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "Users insert own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('assignment-submissions','assignment-submissions',false)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('learning-resources','learning-resources',true)
  ON CONFLICT (id) DO NOTHING;

-- assignment-submissions: students manage their own folder; staff/admin can read
CREATE POLICY "Students upload own submissions" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'assignment-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Students view own submissions" ON storage.objects FOR SELECT
  USING (bucket_id = 'assignment-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Students update own submissions" ON storage.objects FOR UPDATE
  USING (bucket_id = 'assignment-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Staff/Admin view all submissions storage" ON storage.objects FOR SELECT
  USING (bucket_id = 'assignment-submissions' AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff')));

-- learning-resources: public select; staff/admin write
CREATE POLICY "Public view resource files" ON storage.objects FOR SELECT
  USING (bucket_id = 'learning-resources');
CREATE POLICY "Staff/Admin upload resources" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'learning-resources' AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff')));
CREATE POLICY "Staff/Admin update resources" ON storage.objects FOR UPDATE
  USING (bucket_id = 'learning-resources' AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff')));
CREATE POLICY "Staff/Admin delete resources" ON storage.objects FOR DELETE
  USING (bucket_id = 'learning-resources' AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff')));

-- Seed subjects (CBC senior school core subjects)
INSERT INTO public.subjects (name, slug, grade_level, icon, description) VALUES
  ('Mathematics','mathematics','Grade 10','Calculator','Numbers, algebra, geometry and statistics'),
  ('English','english','Grade 10','BookOpen','Language, comprehension and composition'),
  ('Kiswahili','kiswahili','Grade 10','Languages','Lugha, ufahamu na insha'),
  ('Biology','biology','Grade 10','Leaf','Life, cells, ecology and human biology'),
  ('Chemistry','chemistry','Grade 10','FlaskConical','Matter, reactions and chemical principles'),
  ('Physics','physics','Grade 10','Atom','Mechanics, waves, electricity and modern physics'),
  ('Geography','geography','Grade 10','Globe','Physical and human geography'),
  ('History & Citizenship','history','Grade 10','Landmark','Historical perspectives and civic life'),
  ('Computer Studies','computer-studies','Grade 10','Cpu','Computing, programming and digital literacy'),
  ('Business Studies','business','Grade 10','Briefcase','Entrepreneurship and economics')
ON CONFLICT (slug) DO NOTHING;

-- Seed badges
INSERT INTO public.badges (slug, name, description, icon, criteria) VALUES
  ('first-quiz','First Steps','Completed your first quiz','Sparkles','{"quizzes":1}'),
  ('perfect-score','Perfectionist','Scored 100% on a quiz','Star','{"perfect":1}'),
  ('streak-3','On Fire','3-day learning streak','Flame','{"streak":3}'),
  ('streak-7','Unstoppable','7-day learning streak','Zap','{"streak":7}'),
  ('xp-500','Rising Scholar','Earned 500 XP','Trophy','{"xp":500}'),
  ('xp-2000','Marian Master','Earned 2,000 XP','Crown','{"xp":2000}')
ON CONFLICT (slug) DO NOTHING;
