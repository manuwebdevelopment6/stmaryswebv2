import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const INFO = [
  { icon: MapPin, label: "Address", value: "St. Mary's Mixed Junior & Senior School\nP.O. Box 329-20300\nBomet, Kenya" },
  { icon: Phone, label: "Phone", value: "+254 721 771 568\n+254 714 749 123" },
  { icon: Mail, label: "Email", value: "stmaryssecbomet@gmail.com" },
  { icon: Clock, label: "Office hours", value: "Mon – Fri: 7:30 AM – 5:00 PM\nSaturday: 8:00 AM – 1:00 PM\nSunday: Closed" },
];

const DEPTS = [
  { label: "General Inquiry", email: "stmaryssecbomet@gmail.com" },
  { label: "Admissions", email: "stmaryssecbomet@gmail.com" },
  { label: "Academic Affairs", email: "stmaryssecbomet@gmail.com" },
  { label: "Finance Department", email: "stmaryssecbomet@gmail.com" },
  { label: "Transport Services", email: "stmaryssecbomet@gmail.com" },
  { label: "Principal's Office", email: "gabmache@gmail.com" },
];

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thank you! We'll be in touch within 1 working day.");
    }, 700);
  };

  return (
    <SiteLayout>
      <Seo
        title="Contact St. Mary's Bomet — Phone, Email & Visit"
        description="Get in touch with St. Mary's Mixed Junior & Senior School in Bomet, Kenya. Phone +254 721 771 568, email stmaryssecbomet@gmail.com, P.O. Box 329-20300."
      />

      <section className="relative bg-primary-deep text-primary-foreground pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="aurora-orb h-[360px] w-[360px] right-0 top-10 bg-accent opacity-25" />
        <div className="container-prose relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Contact Us</span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">We'd love to hear from you.</h1>
            <p className="mt-5 text-lg text-primary-foreground/85">
              Get in touch for admissions inquiries, general questions or to schedule a visit to our school.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-prose grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card border border-border p-8 sm:p-10 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-foreground">Send us a message</h2>
              <p className="text-sm text-muted-foreground mt-2">We respond within 24 hours on working days.</p>
              <form onSubmit={onSubmit} className="mt-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full name *" name="name" required />
                  <Field label="Email *" name="email" type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone (optional)" name="phone" type="tel" />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                    <select required name="subject" defaultValue="" className="w-full h-10 rounded-md border border-input bg-background px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="" disabled>Select subject</option>
                      <option>Admissions Inquiry</option>
                      <option>Academic Information</option>
                      <option>Fee Structure</option>
                      <option>Transport Services</option>
                      <option>General Inquiry</option>
                      <option>Complaint / Feedback</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                  <textarea required name="message" rows={5} className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <Button type="submit" variant="default" size="lg" disabled={submitting}>
                  {submitting ? "Sending…" : "Send message"}
                </Button>
              </form>
            </div>

            {/* Departments */}
            <div className="mt-8 rounded-2xl bg-gradient-soft border border-border p-8">
              <h3 className="font-display text-xl font-semibold text-foreground">Department contacts</h3>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {DEPTS.map(d => (
                  <a key={d.label} href={`mailto:${d.email}`} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-card border border-border hover:border-accent transition-colors">
                    <span className="text-sm font-medium text-foreground">{d.label}</span>
                    <span className="text-xs font-mono text-primary truncate">{d.email}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            {INFO.map((i) => (
              <div key={i.label} className="rounded-2xl bg-secondary border border-border p-6 flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <i.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{i.label}</p>
                  <p className="mt-1 text-foreground whitespace-pre-line text-sm leading-relaxed">{i.value}</p>
                </div>
              </div>
            ))}
            <a href="https://wa.me/254721771568" target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-gradient-cyan p-6 text-accent-foreground shadow-cyan hover:opacity-95 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-foreground/15">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold leading-tight">Chat on WhatsApp</p>
                  <p className="text-sm opacity-80">Fastest way to reach the admissions desk.</p>
                </div>
              </div>
            </a>

            {/* Directions */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Directions</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>• Only 5 minutes from Bomet Town</li>
                <li>• Close to Bomet Police Station</li>
                <li>• Accessible via tarmacked road</li>
                <li>• Secure on-campus parking available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

const Field = ({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
    <input id={name} name={name} type={type} required={required} className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
  </div>
);

export default Contact;
