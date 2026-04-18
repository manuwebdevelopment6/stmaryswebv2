import { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Floating "Stella" AI assistant button. UI shell only — wired to the
 * Lovable AI Gateway in a later phase.
 */
export const ChatFab = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] sm:w-96 rounded-2xl border border-border bg-card shadow-elevated animate-fade-in-up overflow-hidden">
          <div className="bg-gradient-forest text-primary-foreground p-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-display text-base font-semibold leading-tight">Stella</p>
              <p className="text-xs text-primary-foreground/75">School AI assistant · English & Kiswahili</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-8 w-8 place-items-center rounded-full hover:bg-primary-foreground/10">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5 space-y-3 text-sm">
            <div className="rounded-xl rounded-tl-sm bg-secondary px-4 py-3 text-foreground max-w-[85%]">
              Hi! I'm Stella. I can help with admissions, fees, KCSE results, or book a campus visit. What would you like to know?
            </div>
            <p className="text-xs text-muted-foreground italic pt-2">
              💬 Conversational AI is being prepared — it goes live in Phase 5.
            </p>
          </div>
          <div className="border-t border-border p-3 bg-muted/40">
            <input
              disabled
              placeholder="Ask Stella anything…"
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/70 disabled:opacity-60"
            />
          </div>
        </div>
      )}

      <Button
        onClick={() => setOpen((v) => !v)}
        size="icon"
        variant="gold"
        className={cn("fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full shadow-gold")}
        aria-label={open ? "Close chat with Stella" : "Open chat with Stella"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>
    </>
  );
};
