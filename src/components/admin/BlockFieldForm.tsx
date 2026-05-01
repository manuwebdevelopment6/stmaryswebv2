import { useRef, useState } from "react";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import type { FieldDef } from "@/lib/cms/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  fields: FieldDef[];
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}

export const BlockFieldForm = ({ fields, value, onChange }: Props) => {
  const setField = (name: string, v: unknown) => onChange({ ...value, [name]: v });

  return (
    <div className="space-y-5">
      {fields.map((f) => (
        <FieldInput
          key={f.name}
          field={f}
          value={value[f.name]}
          onChange={(v) => setField(f.name, v)}
        />
      ))}
    </div>
  );
};

const FieldInput = ({
  field, value, onChange,
}: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) => {
  if (field.type === "list") {
    const items = (Array.isArray(value) ? value : []) as Record<string, unknown>[];
    return (
      <div className="space-y-3">
        <Label className="text-sm font-semibold">{field.label}</Label>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {field.itemLabel ?? "Item"} #{i + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = items.slice();
                    next.splice(i, 1);
                    onChange(next);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </Button>
              </div>
              {field.itemFields?.map((sub) => (
                <FieldInput
                  key={sub.name}
                  field={sub}
                  value={item[sub.name]}
                  onChange={(v) => {
                    const next = items.slice();
                    next[i] = { ...next[i], [sub.name]: v };
                    onChange(next);
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const empty: Record<string, unknown> = {};
            field.itemFields?.forEach((sub) => { empty[sub.name] = ""; });
            onChange([...items, empty]);
          }}
        >
          <Plus className="h-4 w-4" /> Add {field.itemLabel ?? "item"}
        </Button>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="space-y-1.5">
        <Label className="text-sm">{field.label}</Label>
        <Select value={(value as string) ?? ""} onValueChange={onChange}>
          <SelectTrigger><SelectValue placeholder="Choose…" /></SelectTrigger>
          <SelectContent>
            {field.options?.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "image") {
    return <ImageField label={field.label} value={(value as string) ?? ""} onChange={onChange as (v: string) => void} help={field.help} />;
  }

  if (field.type === "textarea" || field.type === "richtext") {
    return (
      <div className="space-y-1.5">
        <Label className="text-sm">{field.label}</Label>
        <Textarea
          rows={field.type === "richtext" ? 8 : 4}
          placeholder={field.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{field.label}</Label>
      <Input
        type={field.type === "number" ? "number" : "text"}
        placeholder={field.placeholder}
        value={(value as string | number) ?? ""}
        onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
      />
      {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
    </div>
  );
};

const ImageField = ({ label, value, onChange, help }: {
  label: string; value: string; onChange: (v: string) => void; help?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const upload = async (file: File) => {
    setBusy(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `cms/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("page-media").upload(path, file, {
      cacheControl: "3600", upsert: false,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("page-media").getPublicUrl(path);
    onChange(data.publicUrl);
    toast.success("Image uploaded");
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      <div className="flex items-center gap-3">
        <Input
          placeholder="Paste image URL or upload below"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
      </div>
      {value && (
        <div className="mt-2 rounded-md border border-border overflow-hidden bg-muted max-w-xs">
          <img src={value} alt="" className="w-full h-32 object-cover" />
        </div>
      )}
      {help && <p className="text-xs text-muted-foreground">{help}</p>}
    </div>
  );
};


