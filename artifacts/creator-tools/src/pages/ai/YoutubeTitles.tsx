import { useState } from "react";
import { Youtube } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateYoutubeTitles } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function YoutubeTitles() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("educational");
  const [results, setResults] = useState<string[]>([]);
  
  const mutation = useGenerateYoutubeTitles();

  const handleGenerate = () => {
    if (!topic.trim()) return;
    mutation.mutate(
      { data: { topic, style: style as any } }, 
      { onSuccess: (data) => setResults(data.results) }
    );
  };

  return (
    <ToolPageLayout 
      title="YouTube Title Generator" 
      description="Create catchy, click-worthy titles for your YouTube videos in seconds." 
      icon={Youtube}
    >
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Video Topic</label>
            <SmartTextarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. How to grow your channel in 2024"
              className="h-32"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Title Style</label>
            <select 
              value={style} 
              onChange={e => setStyle(e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="educational">Educational</option>
              <option value="entertaining">Entertaining</option>
              <option value="clickbait">Clickbait / Viral</option>
              <option value="listicle">Listicle (Top 10)</option>
              <option value="how-to">How-to / Tutorial</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !topic.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Generating..." : "Generate Titles"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} results={results} />
      </div>
    </ToolPageLayout>
  );
}
