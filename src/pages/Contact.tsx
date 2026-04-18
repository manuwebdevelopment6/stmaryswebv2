import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/site/Seo";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const INFO = [
  { icon: MapPin, label: "Address", value: "St. Mary's Senior School\nP.O. Box 24, Bomet 20400, Kenya" },
  { icon: Phone, label: "Phone", value: "+254 700 000 000\n+254 720 000 000" },
  { icon: Mail, label: "Email", value: "info@stmarysbomet.ac.ke\nadmissions@stmarysbomet.ac.ke" },
  { icon: Clock, label: "Office hours", value: "Mon – Fri: 8am – 5pm\nSat: 9am – 12pm" },
];

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Wired to a real edge function in a later phase.
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thank you! We'll be in touch within 2 working days.");
    }, 700);
  };

  return (
    <SiteLayout>
      <Seo
        title="Contact St. Mary's Senior School Bomet — Phone, Email & Visit"
        description="Get in touch with St. Mary's Senior School in Bomet County, Kenya. Phone, email, WhatsApp and campus visit details for prospective parents and students."
      />

      <section className="relative bg-gradient-forest text-primary-foreground pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="container-prose relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">— Get in touch</span>
            <h1 className="mt-3 font-display font-bold text-display-xl text-balance">We'd love to hear from you.</h1>
            <p className="mt-5 text-lg text-primary-foreground/85">
              Questions about admissions, fees or scheduling a campus visit? Send us a message — most enquiries get a reply within one working day.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-prose grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-card border border-border p-8 sm:p-10 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-foreground">Send a message</h2>
              <p className="text-sm text-muted-foreground mt-2">All fields are required.</p>
              <form onSubmit={onSubmit} className="mt-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone (optional)" name="phone" type="tel" />
                  <Field label="Subject" name="subject" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea required name="message" rows={5} className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <Button type="submit" variant="default" size="lg" disabled={submitting}>
                  {submitting ? "Sending…" : "Send message"}
                </Button>
              </form>
            </div>
          </div>

          {/* Info */}
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
            <a href="https://wa.me/254700000000" className="block rounded-2xl bg-gradient-gold p-6 text-accent-foreground shadow-gold hover:opacity-95 transition-opacity">
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
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

const Field = ({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      className="w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);

export default Contact;
