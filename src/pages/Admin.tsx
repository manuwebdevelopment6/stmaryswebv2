import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Users, FileText, Search, Loader2, CheckCircle2, XCircle,
  Clock, UserCog, Trash2, Eye, ChevronDown, BarChart3, LogOut, Layers,
  Download, ExternalLink, FileImage, File as FileIcon, Paperclip,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoles, AppRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AppStatus = "draft" | "submitted" | "under_review" | "accepted" | "declined" | "waitlisted";

type Application = {
  id: string;
  user_id: string;
  status: AppStatus;
  current_step: number;
  applicant_first_name: string | null;
  applicant_last_name: string | null;
  applicant_dob: string | null;
  applicant_gender: string | null;
  applicant_nationality: string | null;
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
  intended_form: string | null;
  notes: string | null;
  document_paths: { name: string; path: string; size?: number }[] | null;
  submitted_at: string | null;
  updated_at: string;
  created_at: string;
};

type RoleRow = {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
};

type ProfileRow = {
  user_id: string;
  display_name: string | null;
  phone: string | null;
};

const STATUSES: AppStatus[] = ["draft", "submitted", "under_review", "accepted", "declined", "waitlisted"];

const STATUS_STYLES: Record<AppStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  submitted: "bg-info/15 text-info",
  under_review: "bg-warning/15 text-warning",
  accepted: "bg-success/15 text-success",
  declined: "bg-destructive/15 text-destructive",
  waitlisted: "bg-accent/15 text-accent",
};

const Admin = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { hasRole, loading: roleLoading } = useUserRoles();
  const navigate = useNavigate();

  const isStaff = hasRole("admin") || hasRole("staff");
  const isAdmin = hasRole("admin");

  if (authLoading || roleLoading) {
    return (
      <SiteLayout>
        <div className="min-h-screen grid place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  if (!user) {
    return (
      <SiteLayout>
        <Seo title="Admin — St. Mary's Bomet" description="Staff dashboard" />
        <section className="pt-40 pb-24 bg-primary-deep text-primary-foreground">
          <div className="container-prose text-center">
            <Shield className="h-12 w-12 mx-auto text-accent" />
            <h1 className="mt-4 font-display text-3xl font-bold">Staff sign-in required</h1>
            <p className="mt-2 text-primary-foreground/80">Please sign in to access the admin dashboard.</p>
            <Button asChild variant="hero" className="mt-6">
              <Link to="/auth">Sign in</Link>
            </Button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (!isStaff) {
    return (
      <SiteLayout>
        <Seo title="Access denied — St. Mary's Bomet" description="Restricted area" />
        <section className="pt-40 pb-24">
          <div className="container-prose text-center max-w-lg">
            <XCircle className="h-12 w-12 mx-auto text-destructive" />
            <h1 className="mt-4 font-display text-3xl font-bold text-foreground">Access denied</h1>
            <p className="mt-3 text-muted-foreground">
              You do not have staff or admin privileges. Contact the ICT office at{" "}
              <span className="text-primary font-semibold">stmaryssecbomet@gmail.com</span> if you
              believe this is an error.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild variant="outline"><Link to="/">Go home</Link></Button>
              <Button onClick={async () => { await signOut(); navigate("/"); }} variant="default">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Seo
        title="Admin Dashboard — St. Mary's Bomet"
        description="Staff dashboard for managing applications and user roles."
      />

      {/* Hero */}
      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="container-prose relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              — Staff Console
            </span>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <h1 className="font-display font-bold text-display-lg text-balance">
                Admin <span className="text-gradient-aurora italic">dashboard</span>
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                {isAdmin && (
                  <Button asChild variant="gold" size="sm">
                    <Link to="/admin/pages"><Layers className="h-4 w-4" /> Manage website pages</Link>
                  </Button>
                )}
                <div className="text-sm text-primary-foreground/80">
                  Signed in as <span className="font-semibold">{user.email}</span>
                  {isAdmin && <span className="ml-2 px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-mono uppercase">Admin</span>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-background">
        <div className="container-prose">
          <Tabs defaultValue="applications">
            <TabsList className="mb-8">
              <TabsTrigger value="applications">
                <FileText className="h-4 w-4 mr-1.5" /> Applications
              </TabsTrigger>
              <TabsTrigger value="roles" disabled={!isAdmin}>
                <UserCog className="h-4 w-4 mr-1.5" /> User Roles {!isAdmin && "(admin only)"}
              </TabsTrigger>
              <TabsTrigger value="overview">
                <BarChart3 className="h-4 w-4 mr-1.5" /> Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="applications">
              <ApplicationsTable isAdmin={isAdmin} />
            </TabsContent>

            <TabsContent value="roles">
              {isAdmin ? <RolesPanel /> : <p className="text-muted-foreground">Admin only.</p>}
            </TabsContent>

            <TabsContent value="overview">
              <OverviewPanel />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </SiteLayout>
  );
};

// ============== APPLICATIONS ==============
const ApplicationsTable = ({ isAdmin }: { isAdmin: boolean }) => {
  const [apps, setApps] = useState<Application[] | null>(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AppStatus>("all");
  const [viewing, setViewing] = useState<Application | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchApps = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) return toast.error(error.message);
    setApps((data ?? []) as Application[]);
  };

  useEffect(() => { fetchApps(); }, []);

  const filtered = useMemo(() => {
    if (!apps) return [];
    return apps.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (!q) return true;
      const hay = [
        a.applicant_first_name, a.applicant_last_name,
        a.guardian_full_name, a.guardian_phone, a.guardian_email,
        a.kcpe_index_no, a.previous_school, a.intended_form,
      ].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [apps, q, statusFilter]);

  const updateStatus = async (id: string, status: AppStatus) => {
    if (!isAdmin) return toast.error("Only admins can change status");
    setUpdating(id);
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id);
    setUpdating(null);
    if (error) return toast.error(error.message);
    toast.success(`Status set to ${status.replace("_", " ")}`);
    fetchApps();
    if (viewing?.id === id) setViewing({ ...viewing, status });
  };

  const removeApp = async (id: string) => {
    if (!isAdmin) return toast.error("Only admins can delete");
    if (!confirm("Permanently delete this application?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Application deleted");
    fetchApps();
    setViewing(null);
  };

  if (!apps) {
    return <div className="grid place-items-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, email, KCPE no…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          {filtered.length} of {apps.length}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="text-left p-3 font-semibold">Applicant</th>
                <th className="text-left p-3 font-semibold">Form</th>
                <th className="text-left p-3 font-semibold">Guardian</th>
                <th className="text-left p-3 font-semibold">Status</th>
                <th className="text-left p-3 font-semibold">Submitted</th>
                <th className="text-right p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No applications match.</td></tr>
              ) : filtered.map((a) => (
                <tr key={a.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="p-3">
                    <div className="font-semibold text-foreground">
                      {`${a.applicant_first_name ?? ""} ${a.applicant_last_name ?? ""}`.trim() || "—"}
                    </div>
                    <div className="text-xs text-muted-foreground">{a.kcpe_index_no || "no KCPE no"}</div>
                  </td>
                  <td className="p-3 text-muted-foreground">{a.intended_form || "—"}</td>
                  <td className="p-3">
                    <div className="text-foreground">{a.guardian_full_name || "—"}</div>
                    <div className="text-xs text-muted-foreground">{a.guardian_phone || ""}</div>
                  </td>
                  <td className="p-3">
                    <span className={cn("text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded", STATUS_STYLES[a.status])}>
                      {a.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {a.submitted_at ? new Date(a.submitted_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => setViewing(a)}>
                      <Eye className="h-3.5 w-3.5" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">
                  {`${viewing.applicant_first_name ?? ""} ${viewing.applicant_last_name ?? ""}`.trim() || "Application"}
                </DialogTitle>
                <DialogDescription>
                  Submitted {viewing.submitted_at ? new Date(viewing.submitted_at).toLocaleString() : "— still draft"}
                </DialogDescription>
              </DialogHeader>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <Field label="DOB" value={viewing.applicant_dob} />
                <Field label="Gender" value={viewing.applicant_gender} />
                <Field label="Nationality" value={viewing.applicant_nationality} />
                <Field label="Intended form" value={viewing.intended_form} />
                <Field label="Boarding" value={viewing.boarding_preference} />
                <Field label="Previous school" value={viewing.previous_school} />
                <Field label="KCPE index" value={viewing.kcpe_index_no} />
                <Field label="KCPE marks" value={viewing.kcpe_marks?.toString()} />
                <Field label="KCPE year" value={viewing.kcpe_year?.toString()} />
                <div className="sm:col-span-2 border-t border-border pt-3 mt-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Guardian</div>
                </div>
                <Field label="Name" value={viewing.guardian_full_name} />
                <Field label="Relationship" value={viewing.guardian_relationship} />
                <Field label="Phone" value={viewing.guardian_phone} />
                <Field label="Email" value={viewing.guardian_email} />
                <Field label="ID number" value={viewing.guardian_id_number} />
                <Field label="Address" value={viewing.guardian_address} />
                {viewing.notes && (
                  <div className="sm:col-span-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Notes</div>
                    <p className="mt-1 text-sm text-foreground whitespace-pre-wrap">{viewing.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="mt-6 flex-wrap gap-2 sm:gap-2">
                {isAdmin ? (
                  <>
                    <Select
                      value={viewing.status}
                      onValueChange={(v: AppStatus) => updateStatus(viewing.id, v)}
                      disabled={updating === viewing.id}
                    >
                      <SelectTrigger className="w-44">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => removeApp(viewing.id)}>
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Read-only — admin role required to change status.</p>
                )}
                <Button variant="default" onClick={() => setViewing(null)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const Field = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div>
    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className="mt-0.5 text-sm text-foreground">{value || <span className="text-muted-foreground italic">—</span>}</div>
  </div>
);

// ============== ROLES ==============
const ROLES: AppRole[] = ["admin", "staff", "parent", "student", "alumnus"];

const RolesPanel = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<(RoleRow & { profile?: ProfileRow })[] | null>(null);
  const [grantUserId, setGrantUserId] = useState("");
  const [grantRole, setGrantRole] = useState<AppRole>("staff");
  const [busy, setBusy] = useState(false);

  const fetchRoles = async () => {
    const { data: roleRows, error } = await supabase
      .from("user_roles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return toast.error(error.message);

    const userIds = Array.from(new Set((roleRows ?? []).map((r) => r.user_id)));
    let profiles: ProfileRow[] = [];
    if (userIds.length) {
      const { data: profs } = await supabase
        .from("profiles")
        .select("user_id, display_name, phone")
        .in("user_id", userIds);
      profiles = (profs ?? []) as ProfileRow[];
    }
    const profileMap = new Map(profiles.map((p) => [p.user_id, p]));
    setRows((roleRows ?? []).map((r) => ({ ...r as RoleRow, profile: profileMap.get(r.user_id) })));
  };

  useEffect(() => { fetchRoles(); }, []);

  const grantRoleToUser = async () => {
    if (!grantUserId.trim()) return toast.error("Paste a user ID");
    setBusy(true);
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: grantUserId.trim(), role: grantRole });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`Granted ${grantRole}`);
    setGrantUserId("");
    fetchRoles();
  };

  const revokeRole = async (id: string, userId: string, role: AppRole) => {
    if (userId === user?.id && role === "admin") {
      if (!confirm("You are about to revoke YOUR OWN admin role. Continue?")) return;
    } else {
      if (!confirm(`Revoke ${role} from this user?`)) return;
    }
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Role revoked");
    fetchRoles();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold text-foreground">Grant a role</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Paste the user's UUID (find it in their Auth record) and pick the role to assign.
        </p>
        <div className="mt-4 grid sm:grid-cols-[1fr_180px_auto] gap-3">
          <Input
            placeholder="User UUID e.g. 7f3a…"
            value={grantUserId}
            onChange={(e) => setGrantUserId(e.target.value)}
          />
          <Select value={grantRole} onValueChange={(v: AppRole) => setGrantRole(v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={grantRoleToUser} disabled={busy} variant="default">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Grant"}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">All role assignments</h3>
          <span className="text-xs text-muted-foreground">{rows?.length ?? 0} total</span>
        </div>
        {!rows ? (
          <div className="p-8 grid place-items-center"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="text-left p-3 font-semibold">User</th>
                <th className="text-left p-3 font-semibold">User ID</th>
                <th className="text-left p-3 font-semibold">Role</th>
                <th className="text-left p-3 font-semibold">Granted</th>
                <th className="text-right p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No role assignments yet.</td></tr>
              ) : rows.map((r) => (
                <tr key={r.id}>
                  <td className="p-3 text-foreground">
                    {r.profile?.display_name || <span className="italic text-muted-foreground">no profile name</span>}
                    {r.profile?.phone && <div className="text-xs text-muted-foreground">{r.profile.phone}</div>}
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">{r.user_id.slice(0, 8)}…</td>
                  <td className="p-3">
                    <span className={cn(
                      "text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded",
                      r.role === "admin" ? "bg-destructive/15 text-destructive" :
                      r.role === "staff" ? "bg-primary/15 text-primary" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {r.role}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => revokeRole(r.id, r.user_id, r.role)}>
                      <Trash2 className="h-3.5 w-3.5" /> Revoke
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// ============== OVERVIEW ==============
const OverviewPanel = () => {
  const [stats, setStats] = useState<{ status: AppStatus; count: number }[] | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("applications").select("status");
      if (!data) return;
      const counts = new Map<AppStatus, number>();
      data.forEach((r: any) => counts.set(r.status, (counts.get(r.status) ?? 0) + 1));
      setStats(STATUSES.map((s) => ({ status: s, count: counts.get(s) ?? 0 })));
      setTotal(data.length);
    })();
  }, []);

  if (!stats) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Stat icon={FileText} label="Total applications" value={total} accent="primary" />
      <Stat icon={Clock} label="Awaiting review" value={(stats.find((s) => s.status === "submitted")?.count ?? 0) + (stats.find((s) => s.status === "under_review")?.count ?? 0)} accent="warning" />
      <Stat icon={CheckCircle2} label="Accepted" value={stats.find((s) => s.status === "accepted")?.count ?? 0} accent="success" />
      {stats.map((s) => (
        <div key={s.status} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className={cn("text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded", STATUS_STYLES[s.status])}>
              {s.status.replace("_", " ")}
            </span>
            <span className="font-mono text-2xl font-bold text-foreground">{s.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Stat = ({ icon: Icon, label, value, accent }: { icon: any; label: string; value: number; accent: string }) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className={cn(
      "grid h-10 w-10 place-items-center rounded-lg mb-3",
      accent === "primary" && "bg-primary/10 text-primary",
      accent === "warning" && "bg-warning/15 text-warning",
      accent === "success" && "bg-success/15 text-success",
    )}>
      <Icon className="h-5 w-5" />
    </div>
    <div className="font-mono text-3xl font-bold text-foreground">{value}</div>
    <div className="text-sm text-muted-foreground mt-1">{label}</div>
  </div>
);

export default Admin;
