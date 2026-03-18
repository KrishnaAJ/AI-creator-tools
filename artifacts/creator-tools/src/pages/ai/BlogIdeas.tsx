import { useState } from "react";
import { FileText } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateBlogIdeas } from "@workspace/api-client-react";

export default function BlogIdeas() {
  const [niche, setNiche] = useState("");
  const [count, setCount] = useState(5);
  const [results, setResults] = useState<string[]>([]);
  
  const mutation = useGenerateBlogIdeas();

  const handleGenerate = () => {
    if (!niche.trim()) return;
    mutation.mutate(
      { data: { niche, count } }, 
      { onSuccess: (data) => setResults(data.results) }
    );
  };

  return (
    <ToolPageLayout title="Blog Post Ideas" description="Never run out of content ideas for your blog." icon={FileText}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Your Niche / Industry</label>
            <input 
              type="text"
              value={niche}
              onChange={e => setNiche(e.target.value)}
              placeholder="e.g. Personal Finance for Millennials"
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="flex justify-between text-sm font-semibold text-foreground">
              <span>Number of Ideas</span>
              <span className="text-primary">{count}</span>
            </label>
            <input 
              type="range" min="3" max="10" 
              value={count} 
              onChange={e => setCount(parseInt(e.target.value))} 
              className="w-full accent-primary"
            />
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !niche.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Brainstorming..." : "Generate Ideas"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} results={results} />
      </div>
    </ToolPageLayout>
  );
}
