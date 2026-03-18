import { useState } from "react";
import { Hash } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateHashtags } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function Hashtags() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [count, setCount] = useState(15);
  const [result, setResult] = useState("");
  
  const mutation = useGenerateHashtags();

  const handleGenerate = () => {
    if (!topic.trim()) return;
    mutation.mutate(
      { data: { topic, platform: platform as any, count } }, 
      { onSuccess: (data) => setResult(data.results.join(" ")) }
    );
  };

  return (
    <ToolPageLayout 
      title="Trending Hashtags" 
      description="Find the best trending hashtags to maximize your reach." 
      icon={Hash}
    >
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Post Topic / Content</label>
            <SmartTextarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Healthy vegan breakfast bowl recipe"
              className="h-24"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Platform</label>
            <select 
              value={platform} 
              onChange={e => setPlatform(e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter / X</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex justify-between text-sm font-semibold text-foreground">
              <span>Number of Hashtags</span>
              <span className="text-primary">{count}</span>
            </label>
            <input 
              type="range" min="5" max="30" 
              value={count} 
              onChange={e => setCount(parseInt(e.target.value))} 
              className="w-full accent-primary"
            />
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !topic.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Generating..." : "Generate Hashtags"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} result={result} emptyMessage="Your hashtag block will appear here..." />
      </div>
    </ToolPageLayout>
  );
}
