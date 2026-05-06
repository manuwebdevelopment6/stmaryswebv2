import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Sparkles, Send, Loader2, RotateCcw, Copy, Check, Phone } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I apply for Grade 7?",
  "Ada za shule ni ngapi?",
  "What pathways are offered at Grade 10?",
  "Boarding au day scholar?",
  "When is the next open day?",
  "Tell me about the ICT lab",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "👋 Hello, I'm **Marian AI** — your St. Mary's Bomet assistant. *Karibu!*\n\nI can help with **admissions, fees, CBE pathways, school life, news and contacts**. Ask me anything in **English or Kiswahili** — I'll respond in the same language.",
};

const STORAGE_KEY = "marian-ai-history-v1";
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stella-chat`;

export const ChatFab = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [GREETING];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch { /* ignore */ }
    return [GREETING];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  // Persist conversation
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch { /* ignore quota */ }
  }, [messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    let assembled = "";
    let assistantStarted = false;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next
            .filter((m, i) => !(i === 0 && m.role === "assistant" && m.content === GREETING.content))
            .map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      if (resp.status === 429) {
        toast.error("Marian AI is busy. Please try again in a moment.");
        setLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI credits exhausted. Please contact the school.");
        setLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        toast.error("Couldn't reach Marian AI. Please try again.");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let streamDone = false;

      const upsert = (chunk: string) => {
        assembled += chunk;
        setMessages((prev) => {
          if (!assistantStarted) {
            assistantStarted = true;
            return [...prev, { role: "assistant", content: assembled }];
          }
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assembled } : m,
          );
        });
      };

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) upsert(delta);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (buffer.trim()) {
        for (const raw of buffer.split("\n")) {
          if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
          const json = raw.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) upsert(delta);
          } catch {
            /* ignore */
          }
        }
      }

      if (!assistantStarted) {
        setMessages((p) => [
          ...p,
          { role: "assistant", content: "Sorry, I couldn't generate a reply. Please try again." },
        ]);
      }
    } catch (e) {
      if ((e as { name?: string })?.name !== "AbortError") {
        console.error("marian-ai stream error", e);
        toast.error("Network error reaching Marian AI.");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([GREETING]);
    setInput("");
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    toast.success("Conversation cleared");
  };

  const copyMsg = async (idx: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-5 z-40 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[80vh] flex flex-col rounded-2xl border border-border bg-card shadow-elevated animate-fade-in-up overflow-hidden">
          {/* Header */}
          <div className="bg-primary-deep text-primary-foreground p-4 flex items-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
            <div className="relative grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="relative flex-1 min-w-0">
              <p className="font-display text-base font-semibold leading-tight flex items-center gap-2">
                Marian AI
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-success/20 text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Online
                </span>
              </p>
              <p className="text-xs text-primary-foreground/75">
                School AI Assistant · English &amp; Kiswahili
              </p>
            </div>
            <button
              onClick={reset}
              aria-label="Reset chat"
              className="relative grid h-8 w-8 place-items-center rounded-full hover:bg-primary-foreground/10 transition-colors"
              title="Start over"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="relative grid h-8 w-8 place-items-center rounded-full hover:bg-primary-foreground/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-soft">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "group flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div className="max-w-[85%] flex flex-col gap-1">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-card",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card text-foreground border border-border rounded-tl-sm",
                    )}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-headings:font-display prose-a:text-primary">
                        <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    )}
                  </div>
                  {m.role === "assistant" && m.content && !(loading && i === messages.length - 1) && (
                    <button
                      onClick={() => copyMsg(i, m.content)}
                      className="self-start inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity px-1"
                      aria-label="Copy reply"
                    >
                      {copiedIdx === i ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-4 py-3 shadow-card">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="pt-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 px-1">
                  Try asking
                </p>
                <div className="grid gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs px-3 py-2 rounded-lg bg-card border border-border hover:border-accent hover:bg-secondary transition-colors text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <a
                  href="https://wa.me/254714749123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors text-primary font-medium"
                >
                  <Phone className="h-3.5 w-3.5" /> Prefer a human? WhatsApp 0714 749 123
                </a>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3 bg-card flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Marian AI anything…"
              disabled={loading}
              maxLength={500}
              className="flex-1 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
            />
            <Button type="submit" size="icon" variant="default" disabled={loading || !input.trim()}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <p className="text-[10px] text-center text-muted-foreground py-1.5 bg-card border-t border-border/50">
            Marian AI may make mistakes. For official information call <a href="tel:+254721771568" className="text-primary hover:underline">+254 721 771 568</a>.
          </p>
        </div>
      )}

      <Button
        onClick={() => setOpen((v) => !v)}
        size="icon"
        variant="default"
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 h-14 w-14 rounded-full shadow-elevated",
          !open && "animate-pulse-glow",
        )}
        aria-label={open ? "Close chat with Marian AI" : "Open chat with Marian AI"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>
    </>
  );
};
