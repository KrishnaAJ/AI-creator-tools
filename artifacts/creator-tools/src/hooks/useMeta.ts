import { useEffect } from "react";

const DEFAULT_TITLE = "ToolsAI — Free AI Tools for Content Creators | 20+ AI Generators";
const DEFAULT_DESC = "ToolsAI offers 20+ free AI-powered tools for content creators. Generate YouTube titles, Instagram bios, hashtags, captions, blog ideas, ad copy, SEO meta tags, and much more.";

export function useMeta(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Free Tool | ToolsAI` : DEFAULT_TITLE;
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description ?? DEFAULT_DESC);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description ?? DEFAULT_DESC);

    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute("content", DEFAULT_DESC);
    };
  }, [title, description]);
}
