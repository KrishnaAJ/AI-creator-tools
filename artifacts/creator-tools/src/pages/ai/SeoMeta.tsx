import { useState } from "react";
import { Search, Copy, Check } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateSeoMeta } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function SeoMeta() {
  const [pageTitle, setPageTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [resultData, setResultData] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  
  const mutation = useGenerateSeoMeta();

  const handleGenerate = () => {
    if (!pageTitle.trim() || !description.trim()) return;
    mutation.mutate(
      { data: { pageTitle, description, keywords } }, 
      { onSuccess: (data) => setResultData(data) }
    );
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderSeoResults = () => {
    if (!resultData) return null;
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Meta Title</label>
          <div className="group relative bg-muted/50 border border-border p-4 rounded-xl hover:border-primary/30 transition-colors">
            <p className="text-foreground font-semibold pr-8">{resultData.metaTitle}</p>
            <button onClick={() => copyToClipboard(resultData.metaTitle, 'title')} className="absolute top-3 right-3 text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-all">
              {copiedIndex === 'title' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Meta Description</label>
          <div className="group relative bg-muted/50 border border-border p-4 rounded-xl hover:border-primary/30 transition-colors">
            <p className="text-foreground pr-8">{resultData.metaDescription}</p>
            <button onClick={() => copyToClipboard(resultData.metaDescription, 'desc')} className="absolute top-3 right-3 text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-all">
              {copiedIndex === 'desc' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {resultData.keywords && resultData.keywords.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Target Keywords</label>
            <div className="flex flex-wrap gap-2">
              {resultData.keywords.map((kw: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <ToolPageLayout title="SEO Meta Tags" description="Optimize your web pages for search engines perfectly." icon={Search}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Page Topic / Title</label>
            <input 
              type="text"
              value={pageTitle}
              onChange={e => setPageTitle(e.target.value)}
              placeholder="e.g. Best 10 Coffee Shops in NYC"
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Content Description</label>
            <SmartTextarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What is this page actually about? Include details."
              className="h-24"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Focus Keywords (Optional)</label>
            <input 
              type="text"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="e.g. coffee, nyc, best cafes"
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !pageTitle.trim() || !description.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Generating..." : "Generate SEO Tags"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} customRender={renderSeoResults()} />
      </div>
    </ToolPageLayout>
  );
}
