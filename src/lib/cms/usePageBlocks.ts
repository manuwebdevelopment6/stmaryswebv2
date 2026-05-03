import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BlockType } from "./types";

export interface PublishedBlock {
  id: string;
  block_type: BlockType;
  position: number;
  data: Record<string, unknown>;
}

export interface UsePageBlocksResult {
  loading: boolean;
  blocks: PublishedBlock[] | null; // null = no page found
}

/**
 * Fetches published blocks for a page slug.
 * Returns null blocks if the page doesn't exist OR has zero published+visible blocks
 * — callers should then fall back to hard-coded content.
 */
export function usePageBlocks(slug: string): UsePageBlocksResult {
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<PublishedBlock[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: page } = await supabase
        .from("pages")
        .select("id,status")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (!page) {
        if (!cancelled) { setBlocks(null); setLoading(false); }
        return;
      }
      const { data: rows } = await supabase
        .from("page_blocks")
        .select("id,block_type,position,published_data,is_visible")
        .eq("page_id", page.id)
        .eq("is_visible", true)
        .not("published_data", "is", null)
        .order("position", { ascending: true });
      if (cancelled) return;
      const list = (rows ?? []).map((r) => ({
        id: r.id,
        block_type: r.block_type as BlockType,
        position: r.position,
        data: (r.published_data as Record<string, unknown>) ?? {},
      }));
      setBlocks(list.length ? list : null);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [slug]);

  return { loading, blocks };
}
