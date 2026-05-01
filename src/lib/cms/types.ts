// CMS shared types
export type BlockType =
  | "hero"
  | "richtext"
  | "stats"
  | "gallery"
  | "cta"
  | "testimonials"
  | "cards"
  | "faq"
  | "image"
  | "video"
  | "breaking_news";

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "image"
  | "url"
  | "number"
  | "select"
  | "list"; // list of sub-objects

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[]; // for select
  itemFields?: FieldDef[]; // for list
  itemLabel?: string;       // singular noun for list (e.g. "Stat", "Testimonial")
}

export interface BlockDef {
  type: BlockType;
  name: string;        // human label
  description: string; // shown in picker
  icon: string;        // lucide icon name
  fields: FieldDef[];
  defaults: Record<string, unknown>;
}

export interface PageRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageBlockRow {
  id: string;
  page_id: string;
  block_type: BlockType;
  position: number;
  draft_data: Record<string, unknown>;
  published_data: Record<string, unknown> | null;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}
