import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, GraduationCap, User, Users, Loader2, Send, Plus, Pencil, Trash2, Paperclip, Upload, X as XIcon, Download } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type DocItem = { name: string; path: string; size?: number };

type App = {
  id: string;
  status: string;
  current_step: number;
  applicant_first_name: string | null;
  applicant_last_name: string | null;
  applicant_dob: string | null;
  applicant_gender: string | null;
  previous_school: string | null;
  kcpe_index_no: string | null;
  kcpe_marks: number | null;
  kcpe_year: number | null;
  guardian_full_name: string | null;
  guardian_relationship: string | null;
  guardian_phone: string | null;
  guardian_email: string | null;
  guardian_id_number: string | null;
  guardian_address: string | null;
  boarding_preference: string | null;
  notes: string | null;
  document_paths: DocItem[] | null;
  submitted_at: string | null;
  updated_at: string;
};

const STEPS = [
  { n: 1, label: "Applicant", icon: User },
  { n: 2, label: "Previous School", icon: GraduationCap },
  { n: 3, label: "Guardian", icon: Users },
  { n: 4, label: "Documents", icon: Paperclip },
  { n: 5, label: "Review", icon: FileText },
];

const FEES = [
  { row: "Registration (one-time)", t1: "1,000", t2: "—", t3: "—", total: "1,000" },
  { row: "Boarding (Grade 7-10)", t1: "Contact", t2: "Contact", t3: "Contact", total: "On request" },
  { row: "Day Scholar", t1: "Contact", t2: "Contact", t3: "Contact", total: "On request" },
];

const Admissions = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState<App[] | null>(null);
  const [editing, setEditing] = useState<App | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchApps = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    setApps((data ?? []) as unknown as App[]);
  };

  useEffect(() => { fetchApps(); /* eslint-disable-next-line */ }, [user]);

  const startNew = async () => {
    if (!user) { navigate("/auth?mode=signup"); return; }
    setBusy(true);
    const { data, error } = await supabase
      .from("applications")
      .insert({ user_id: user.id, status: "draft", current_step: 1 })
      .select()
      .single();
    setBusy(false);
    if (error) return toast.error(error.message);
    setEditing(data as unknown as App);
    fetchApps();
  };

  const removeApp = async (id: string) => {
    if (!confirm("Delete this draft? This cannot be undone.")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Draft deleted");
    fetchApps();
  };

  return (
    <SiteLayout>
      <Seo
        title="Admissions Grade 7-10 (2026) — Apply Online | St. Mary's Bomet"
        description="Apply for Grade 7, 8, 9 or 10 at St. Mary's Mixed Junior & Senior School Bomet. Multi-step online application, document upload, fee info and entrance interview booking."
      />

      {/* Hero */}
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="aurora-orb h-[400px] w-[400px] right-0 top-10 bg-accent opacity-30" />
        <div className="container-prose relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Admissions 2026</span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">
              Apply for <span className="text-gradient-aurora italic">Grade 7-10</span>.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl">
              Join our vibrant school community. Online applications take ~10 minutes and save automatically. Rolling admissions — apply anytime. Terms begin <span className="text-accent font-semibold">January, May & September</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={startNew} variant="hero" size="xl" disabled={busy || authLoading}>
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4" /> Start application</>}
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <a href="#fees">View fee information</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Auth gate / Drafts list / Editor */}
      <section className="py-20 bg-background">
        <div className="container-prose">
          {!user && !authLoading && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center max-w-2xl mx-auto shadow-card">
              <h2 className="font-display text-2xl font-semibold text-foreground">Sign in to start your application</h2>
              <p className="mt-3 text-muted-foreground">Your progress saves automatically so you can finish anytime.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button asChild variant="default"><Link to="/auth?mode=signup">Create account</Link></Button>
                <Button asChild variant="outline"><Link to="/auth">Sign in</Link></Button>
              </div>
            </div>
          )}

          {user && editing && (
            <ApplicationEditor app={editing} onClose={() => { setEditing(null); fetchApps(); }} />
          )}

          {user && !editing && apps && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">Your applications</h2>
                <Button onClick={startNew} variant="default" size="sm" disabled={busy}>
                  <Plus className="h-4 w-4" /> New
                </Button>
              </div>
              {apps.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                  No applications yet. Click "Start application" above.
                </div>
              ) : (
                <div className="grid gap-3">
                  {apps.map((a) => (
                    <div key={a.id} className="rounded-xl border border-border bg-card p-5 flex flex-wrap items-center gap-4 shadow-card">
                      <div className="flex-1 min-w-[200px]">
                        <div className="font-display text-lg font-semibold text-foreground">
                          {a.applicant_first_name || a.applicant_last_name
                            ? `${a.applicant_first_name ?? ""} ${a.applicant_last_name ?? ""}`.trim()
                            : "Untitled application"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Updated {new Date(a.updated_at).toLocaleString()} · Step {a.current_step}/5
                        </div>
                      </div>
                      <StatusBadge status={a.status} />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditing(a)} disabled={a.status !== "draft"}>
                          <Pencil className="h-3.5 w-3.5" /> {a.status === "draft" ? "Edit" : "View"}
                        </Button>
                        {a.status === "draft" && (
                          <Button size="sm" variant="ghost" onClick={() => removeApp(a.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="py-24 bg-gradient-soft">
        <div className="container-prose">
          <div className="max-w-2xl mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Fee Information</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Transparent &amp; affordable.</h2>
            <p className="mt-4 text-muted-foreground">Termly fees are payable at the beginning of each term. Contact the finance office for the current detailed structure.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-secondary-foreground">
                <tr>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-right p-4 font-semibold">Term 1</th>
                  <th className="text-right p-4 font-semibold">Term 2</th>
                  <th className="text-right p-4 font-semibold">Term 3</th>
                  <th className="text-right p-4 font-semibold">Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {FEES.map((f) => (
                  <tr key={f.row}>
                    <td className="p-4 font-medium text-foreground">{f.row}</td>
                    <td className="p-4 text-right font-mono">{f.t1}</td>
                    <td className="p-4 text-right font-mono">{f.t2}</td>
                    <td className="p-4 text-right font-mono">{f.t3}</td>
                    <td className="p-4 text-right font-mono font-bold text-primary">{f.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li>• Registration fee: KES 1,000 (one-time payment)</li>
            <li>• Uniform and books are additional</li>
            <li>• Payment plans available on request</li>
            <li>• Scholarships available for exceptional students</li>
            <li>• Multiple payment methods accepted</li>
            <li>• All applications reviewed within 24 hours</li>
          </ul>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Required Documents</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>• Completed application form</li>
                <li>• Birth certificate (original &amp; copy)</li>
                <li>• Previous school report cards</li>
                <li>• Transfer certificate (if applicable)</li>
                <li>• Medical certificate</li>
                <li>• 4 passport-size photographs</li>
                <li>• Parent/Guardian ID copies</li>
                <li>• KJSEA Results (Grade 10 applicants)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Important Dates</h3>
              <ul className="mt-3 space-y-3 text-sm">
                <li><span className="font-semibold text-foreground">Application Deadline:</span> <span className="text-muted-foreground">Rolling admissions — apply anytime</span></li>
                <li><span className="font-semibold text-foreground">Term Starts:</span> <span className="text-muted-foreground">January, May, September</span></li>
                <li><span className="font-semibold text-foreground">Grade 10 Entrance Exam:</span> <span className="text-muted-foreground">December &amp; March sessions</span></li>
                <li><span className="font-semibold text-foreground">Term 1 (2026):</span> <span className="text-muted-foreground">5 January 2026</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Open days / Entrance interviews */}
      <section id="open-days" className="py-24 bg-background">
        <div className="container-prose grid lg:grid-cols-2 gap-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">— Entrance Interviews</span>
            <h2 className="mt-3 font-display font-bold text-display-lg text-foreground text-balance">Visit before you apply.</h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Walk the campus, meet the principal, sit in on a class and see the boarding houses for yourself. Book your slot early.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { d: "Sat 8 Nov 2025", t: "9 am – 3 pm", n: "Entrance Interviews — Session 1" },
              { d: "Sat 15 Nov 2025", t: "9 am – 3 pm", n: "Entrance Interviews — Session 2" },
              { d: "Sat 22 Nov 2025", t: "9 am – 3 pm", n: "Entrance Interviews — Session 3" },
              { d: "Mon 5 Jan 2026", t: "7 am", n: "Term 1 Begins — 2026" },
            ].map((o) => (
              <div key={o.d} className="rounded-xl border border-border bg-card p-5 flex items-center justify-between hover-lift">
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">{o.d}</p>
                  <p className="text-sm text-muted-foreground">{o.t} · {o.n}</p>
                </div>
                <Button asChild variant="outline" size="sm"><Link to="/contact">Book</Link></Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    submitted: "bg-info/15 text-info",
    under_review: "bg-warning/15 text-warning",
    accepted: "bg-success/15 text-success",
    declined: "bg-destructive/15 text-destructive",
    waitlisted: "bg-accent/15 text-accent",
  };
  return (
    <span className={cn("text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md", map[status] ?? "bg-muted")}>
      {status.replace("_", " ")}
    </span>
  );
};

// =================== EDITOR ===================
const ApplicationEditor = ({ app, onClose }: { app: App; onClose: () => void }) => {
  const [data, setData] = useState<App>(app);
  const [step, setStep] = useState(app.current_step);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof App>(k: K, v: App[K]) => setData((d) => ({ ...d, [k]: v }));

  const save = async (next?: number) => {
    setSaving(true);
    const payload: any = { ...data, current_step: next ?? step };
    delete payload.id; delete payload.updated_at; delete payload.submitted_at;
    const { error } = await supabase.from("applications").update(payload).eq("id", app.id);
    setSaving(false);
    if (error) { toast.error(error.message); return false; }
    return true;
  };

  const next = async () => {
    if (step === 1 && (!data.applicant_first_name || !data.applicant_last_name || !data.applicant_dob)) {
      toast.error("Please fill applicant name and date of birth"); return;
    }
    if (step === 2 && (!data.previous_school || !data.kcpe_marks)) {
      toast.error("Please fill previous school and KCPE marks"); return;
    }
    if (step === 3 && (!data.guardian_full_name || !data.guardian_phone)) {
      toast.error("Please fill guardian name and phone"); return;
    }
    const ok = await save(step + 1);
    if (ok) setStep(step + 1);
  };

  const submit = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("applications")
      .update({ ...stripMeta(data), status: "submitted", current_step: 5 })
      .eq("id", app.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Application submitted! We'll be in touch within 5 working days.");
    onClose();
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
      {/* Stepper */}
      <div className="bg-secondary px-6 py-5">
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((s, i) => {
            const active = step === s.n;
            const done = step > s.n;
            return (
              <div key={s.n} className="flex items-center gap-3 flex-1">
                <div className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm font-bold transition-all",
                  done ? "bg-success text-success-foreground" :
                  active ? "bg-gradient-cyan text-accent-foreground shadow-cyan" :
                  "bg-background text-muted-foreground border border-border"
                )}>
                  {done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
                </div>
                <div className="hidden sm:block text-xs">
                  <div className={cn("font-semibold", active ? "text-foreground" : "text-muted-foreground")}>{s.label}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-0.5", done ? "bg-success" : "bg-border")} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {step === 1 && (
          <Section title="Applicant details">
            <Grid>
              <TextField label="First name *" value={data.applicant_first_name ?? ""} onChange={(v) => set("applicant_first_name", v)} />
              <TextField label="Last name *" value={data.applicant_last_name ?? ""} onChange={(v) => set("applicant_last_name", v)} />
              <TextField label="Date of birth *" type="date" value={data.applicant_dob ?? ""} onChange={(v) => set("applicant_dob", v)} />
              <SelectField label="Gender" value={data.applicant_gender ?? ""} onChange={(v) => set("applicant_gender", v)} options={["Male", "Female"]} />
            </Grid>
          </Section>
        )}
        {step === 2 && (
          <Section title="Previous school & KCPE">
            <Grid>
              <TextField label="Previous primary school *" value={data.previous_school ?? ""} onChange={(v) => set("previous_school", v)} />
              <TextField label="KCPE index number" value={data.kcpe_index_no ?? ""} onChange={(v) => set("kcpe_index_no", v)} />
              <TextField label="KCPE marks (out of 500) *" type="number" value={data.kcpe_marks?.toString() ?? ""} onChange={(v) => set("kcpe_marks", v ? parseInt(v) : null)} />
              <TextField label="KCPE year" type="number" value={data.kcpe_year?.toString() ?? ""} onChange={(v) => set("kcpe_year", v ? parseInt(v) : null)} />
              <SelectField label="Boarding preference" value={data.boarding_preference ?? ""} onChange={(v) => set("boarding_preference", v)} options={["Boarder", "Day"]} />
            </Grid>
          </Section>
        )}
        {step === 3 && (
          <Section title="Parent / Guardian">
            <Grid>
              <TextField label="Full name *" value={data.guardian_full_name ?? ""} onChange={(v) => set("guardian_full_name", v)} />
              <SelectField label="Relationship" value={data.guardian_relationship ?? ""} onChange={(v) => set("guardian_relationship", v)} options={["Father", "Mother", "Guardian", "Other"]} />
              <TextField label="Phone *" type="tel" value={data.guardian_phone ?? ""} onChange={(v) => set("guardian_phone", v)} />
              <TextField label="Email" type="email" value={data.guardian_email ?? ""} onChange={(v) => set("guardian_email", v)} />
              <TextField label="National ID" value={data.guardian_id_number ?? ""} onChange={(v) => set("guardian_id_number", v)} />
              <TextField label="Address" value={data.guardian_address ?? ""} onChange={(v) => set("guardian_address", v)} />
            </Grid>
            <div className="mt-5">
              <Label>Notes (optional)</Label>
              <textarea
                rows={3}
                value={data.notes ?? ""}
                onChange={(e) => set("notes", e.target.value)}
                className="w-full mt-1.5 rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </Section>
        )}
        {step === 4 && (
          <Section title="Supporting documents">
            <p className="text-sm text-muted-foreground -mt-3 mb-5">
              Upload scans or photos of: birth certificate, KCPE/KJSEA result slip, last school report, passport photo, guardian ID. PDF, JPG or PNG, max 10MB each. Documents are private — only you and school staff can view them.
            </p>
            <DocumentUploader app={app} data={data} setData={setData} />
          </Section>
        )}
        {step === 5 && (
          <Section title="Review & submit">
            <ReviewBlock title="Applicant" rows={[
              ["Name", `${data.applicant_first_name ?? ""} ${data.applicant_last_name ?? ""}`.trim() || "—"],
              ["Date of birth", data.applicant_dob ?? "—"],
              ["Gender", data.applicant_gender ?? "—"],
              ["Boarding", data.boarding_preference ?? "—"],
            ]} />
            <ReviewBlock title="Previous school" rows={[
              ["School", data.previous_school ?? "—"],
              ["KCPE index", data.kcpe_index_no ?? "—"],
              ["KCPE marks", data.kcpe_marks?.toString() ?? "—"],
              ["KCPE year", data.kcpe_year?.toString() ?? "—"],
            ]} />
            <ReviewBlock title="Guardian" rows={[
              ["Name", data.guardian_full_name ?? "—"],
              ["Phone", data.guardian_phone ?? "—"],
              ["Email", data.guardian_email ?? "—"],
              ["Address", data.guardian_address ?? "—"],
            ]} />
            <ReviewBlock title="Documents" rows={[
              ["Files attached", `${data.document_paths?.length ?? 0} file(s)`],
            ]} />
            <p className="mt-6 text-xs text-muted-foreground">
              By submitting, you confirm the information is accurate. We'll contact your guardian within 5 working days.
            </p>
          </Section>
        )}

        {/* Footer actions */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={onClose}>Save & exit</Button>
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={async () => { await save(step - 1); setStep(step - 1); }} disabled={saving}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            )}
            {step < 5 && (
              <Button variant="default" onClick={next} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue <ArrowRight className="h-4 w-4" /></>}
              </Button>
            )}
            {step === 5 && (
              <Button variant="hero" onClick={submit} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4" /> Submit application</>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const stripMeta = (a: App) => {
  const { id, updated_at, submitted_at, ...rest } = a as any;
  return rest;
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-display text-xl font-semibold text-foreground mb-5">{title}</h3>
    {children}
  </div>
);
const Grid = ({ children }: { children: React.ReactNode }) => <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
const Label = ({ children }: { children: React.ReactNode }) => <label className="block text-sm font-medium text-foreground">{children}</label>;
const TextField = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div>
    <Label>{label}</Label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={200}
      className="w-full mt-1.5 rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);
const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div>
    <Label>{label}</Label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1.5 rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <option value="">— Select —</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);
const ReviewBlock = ({ title, rows }: { title: string; rows: [string, string][] }) => (
  <div className="mb-6 rounded-xl border border-border bg-secondary/40 p-5">
    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{title}</p>
    <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4 py-1 border-b border-border/40 last:border-0">
          <dt className="text-muted-foreground">{k}</dt>
          <dd className="font-medium text-foreground text-right">{v}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const MAX_FILE_BYTES = 10 * 1024 * 1024;

const DocumentUploader = ({
  app, data, setData,
}: { app: App; data: App; setData: React.Dispatch<React.SetStateAction<App>> }) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const docs: DocItem[] = data.document_paths ?? [];

  const handleFiles = async (files: FileList | null) => {
    if (!files || !user) return;
    setUploading(true);
    const next: DocItem[] = [...docs];
    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_BYTES) {
        toast.error(`${file.name} is larger than 10MB`);
        continue;
      }
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${user.id}/${app.id}/${Date.now()}-${safeName}`;
      const { error } = await supabase.storage
        .from("application-documents")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (error) { toast.error(`${file.name}: ${error.message}`); continue; }
      next.push({ name: file.name, path, size: file.size });
    }
    const { error: updErr } = await supabase
      .from("applications")
      .update({ document_paths: next as any })
      .eq("id", app.id);
    if (updErr) toast.error(updErr.message);
    else {
      setData((d) => ({ ...d, document_paths: next }));
      toast.success("Uploaded");
    }
    setUploading(false);
  };

  const removeDoc = async (path: string) => {
    if (!confirm("Remove this document?")) return;
    const { error } = await supabase.storage.from("application-documents").remove([path]);
    if (error) return toast.error(error.message);
    const next = docs.filter((d) => d.path !== path);
    await supabase.from("applications").update({ document_paths: next as any }).eq("id", app.id);
    setData((d) => ({ ...d, document_paths: next }));
    toast.success("Removed");
  };

  const downloadDoc = async (path: string, name: string) => {
    const { data: signed, error } = await supabase.storage
      .from("application-documents")
      .createSignedUrl(path, 60);
    if (error || !signed) return toast.error(error?.message ?? "Could not get URL");
    const a = document.createElement("a");
    a.href = signed.signedUrl;
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
  };

  return (
    <div>
      <label className="block">
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          className="sr-only"
          onChange={(e) => { handleFiles(e.target.files); e.currentTarget.value = ""; }}
          disabled={uploading}
        />
        <div className={cn(
          "rounded-2xl border-2 border-dashed border-border bg-secondary/40 p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-secondary/60 transition-colors",
          uploading && "opacity-60 pointer-events-none"
        )}>
          {uploading ? (
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
          ) : (
            <Upload className="h-8 w-8 mx-auto text-primary" />
          )}
          <p className="mt-3 font-display text-base font-semibold text-foreground">
            {uploading ? "Uploading…" : "Click to upload documents"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PDF, JPG or PNG · max 10MB each · select multiple files
          </p>
        </div>
      </label>

      {docs.length > 0 && (
        <ul className="mt-5 space-y-2">
          {docs.map((d) => (
            <li
              key={d.path}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                {d.size && (
                  <p className="text-xs text-muted-foreground">
                    {(d.size / 1024).toFixed(0)} KB
                  </p>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => downloadDoc(d.path, d.name)}
                aria-label="Download"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeDoc(d.path)}
                aria-label="Remove"
              >
                <XIcon className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admissions;

