import type { BlockDef, BlockType } from "./types";

// Registry of all available block types and their editable fields.
// To add a new block type: add an entry here and a renderer in
// src/components/cms/BlockRenderer.tsx.
export const BLOCK_DEFS: Record<BlockType, BlockDef> = {
  hero: {
    type: "hero",
    name: "Hero Banner",
    description: "Large headline section with eyebrow, title, subtitle, image and call-to-action buttons.",
    icon: "Image",
    fields: [
      { name: "eyebrow",  label: "Eyebrow text",  type: "text",     placeholder: "— 35+ Years of Excellence" },
      { name: "title",    label: "Title (HTML allowed)", type: "textarea", placeholder: "Shaping Tomorrow's Leaders" },
      { name: "subtitle", label: "Subtitle",      type: "textarea", placeholder: "At St. Mary's, we deliver..." },
      { name: "image",    label: "Background image URL", type: "image" },
      { name: "primary_cta_label", label: "Primary button label", type: "text", placeholder: "Apply Now" },
      { name: "primary_cta_href",  label: "Primary button link",  type: "url",  placeholder: "/admissions" },
      { name: "secondary_cta_label", label: "Secondary button label", type: "text", placeholder: "Virtual Tour" },
      { name: "secondary_cta_href",  label: "Secondary button link",  type: "url",  placeholder: "/virtual-tour" },
    ],
    defaults: {
      eyebrow: "", title: "", subtitle: "", image: "",
      primary_cta_label: "", primary_cta_href: "",
      secondary_cta_label: "", secondary_cta_href: "",
    },
  },

  richtext: {
    type: "richtext",
    name: "Rich Text",
    description: "A heading + body of formatted text. Use for paragraphs, mission statements, history, etc.",
    icon: "Type",
    fields: [
      { name: "eyebrow", label: "Eyebrow",  type: "text" },
      { name: "title",   label: "Heading",  type: "text" },
      { name: "body",    label: "Body (Markdown / HTML)", type: "richtext" },
      { name: "align",   label: "Alignment", type: "select", options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Centered" },
      ]},
    ],
    defaults: { eyebrow: "", title: "", body: "", align: "left" },
  },

  stats: {
    type: "stats",
    name: "Stats Strip",
    description: "Row of key numbers with labels (e.g. 35+ Years, 1,500+ Students).",
    icon: "TrendingUp",
    fields: [
      { name: "title", label: "Section title (optional)", type: "text" },
      { name: "items", label: "Stats", type: "list", itemLabel: "Stat",
        itemFields: [
          { name: "value", label: "Value", type: "text", placeholder: "1,500+" },
          { name: "label", label: "Label", type: "text", placeholder: "Students enrolled" },
        ],
      },
    ],
    defaults: { title: "", items: [] },
  },

  cards: {
    type: "cards",
    name: "Feature Cards",
    description: "Grid of cards with title, body and optional icon/image. Great for academics, services, programs.",
    icon: "LayoutGrid",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title",   label: "Section heading", type: "text" },
      { name: "subtitle",label: "Section subtitle", type: "textarea" },
      { name: "items", label: "Cards", type: "list", itemLabel: "Card",
        itemFields: [
          { name: "title", label: "Card title", type: "text" },
          { name: "body",  label: "Card body", type: "textarea" },
          { name: "image", label: "Image URL (optional)", type: "image" },
          { name: "href",  label: "Link (optional)", type: "url" },
        ],
      },
    ],
    defaults: { eyebrow: "", title: "", subtitle: "", items: [] },
  },

  testimonials: {
    type: "testimonials",
    name: "Testimonials",
    description: "Quotes from parents, students or alumni.",
    icon: "Quote",
    fields: [
      { name: "title", label: "Section heading", type: "text" },
      { name: "items", label: "Testimonials", type: "list", itemLabel: "Quote",
        itemFields: [
          { name: "quote", label: "Quote", type: "textarea" },
          { name: "name",  label: "Person name", type: "text" },
          { name: "role",  label: "Role / relationship", type: "text" },
        ],
      },
    ],
    defaults: { title: "", items: [] },
  },

  gallery: {
    type: "gallery",
    name: "Gallery",
    description: "Photo grid with optional captions.",
    icon: "Images",
    fields: [
      { name: "title", label: "Heading", type: "text" },
      { name: "items", label: "Photos", type: "list", itemLabel: "Photo",
        itemFields: [
          { name: "image",   label: "Image URL", type: "image" },
          { name: "caption", label: "Caption (optional)", type: "text" },
        ],
      },
    ],
    defaults: { title: "", items: [] },
  },

  cta: {
    type: "cta",
    name: "Call-To-Action Band",
    description: "Promotional band with title, body and 1–2 buttons.",
    icon: "Megaphone",
    fields: [
      { name: "eyebrow",   label: "Eyebrow", type: "text" },
      { name: "title",     label: "Title",   type: "text" },
      { name: "body",      label: "Body",    type: "textarea" },
      { name: "primary_cta_label", label: "Primary button label", type: "text" },
      { name: "primary_cta_href",  label: "Primary button link",  type: "url" },
      { name: "secondary_cta_label", label: "Secondary button label", type: "text" },
      { name: "secondary_cta_href",  label: "Secondary button link",  type: "url" },
    ],
    defaults: {
      eyebrow: "", title: "", body: "",
      primary_cta_label: "", primary_cta_href: "",
      secondary_cta_label: "", secondary_cta_href: "",
    },
  },

  faq: {
    type: "faq",
    name: "FAQ",
    description: "Frequently asked questions in an accordion.",
    icon: "HelpCircle",
    fields: [
      { name: "title", label: "Heading", type: "text" },
      { name: "items", label: "Questions", type: "list", itemLabel: "Q&A",
        itemFields: [
          { name: "question", label: "Question", type: "text" },
          { name: "answer",   label: "Answer",   type: "textarea" },
        ],
      },
    ],
    defaults: { title: "", items: [] },
  },

  image: {
    type: "image",
    name: "Single Image",
    description: "One image with optional caption.",
    icon: "Image",
    fields: [
      { name: "image",   label: "Image URL", type: "image" },
      { name: "alt",     label: "Alt text (for accessibility)", type: "text" },
      { name: "caption", label: "Caption (optional)", type: "text" },
    ],
    defaults: { image: "", alt: "", caption: "" },
  },

  video: {
    type: "video",
    name: "Video Embed",
    description: "Embed a YouTube or Vimeo video.",
    icon: "Video",
    fields: [
      { name: "url",   label: "Video URL (YouTube / Vimeo)", type: "url" },
      { name: "title", label: "Title (optional)", type: "text" },
    ],
    defaults: { url: "", title: "" },
  },

  breaking_news: {
    type: "breaking_news",
    name: "Breaking News Ticker",
    description: "Scrolling marquee of short announcements.",
    icon: "Bell",
    fields: [
      { name: "label", label: "Pill label", type: "text", placeholder: "Breaking News" },
      { name: "items", label: "Announcements", type: "list", itemLabel: "Item",
        itemFields: [
          { name: "text", label: "Text", type: "text" },
          { name: "href", label: "Link (optional)", type: "url" },
        ],
      },
    ],
    defaults: { label: "Breaking News", items: [] },
  },
};

export const BLOCK_LIST = Object.values(BLOCK_DEFS);
