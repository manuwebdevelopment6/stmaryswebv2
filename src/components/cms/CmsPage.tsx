import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { usePageBlocks } from "@/lib/cms/usePageBlocks";
import { BlockList } from "./BlockRenderer";

interface CmsPageProps {
  slug: string;
  /** Hard-coded fallback shown when the page has no published blocks yet. */
  fallback: ReactNode;
}

/**
 * Renders published CMS blocks for a slug, falling back to legacy hard-coded
 * content while admins haven't authored blocks yet. Once any published block
 * exists for the slug, the CMS content takes over completely.
 */
export const CmsPage = ({ slug, fallback }: CmsPageProps) => {
  const { loading, blocks } = usePageBlocks(slug);
  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!blocks) return <>{fallback}</>;
  return <BlockList blocks={blocks} />;
};
