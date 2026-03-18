import { useState } from "react";
import { Twitter } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateTweet } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function Tweet() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("informative");
  const [count, setCount] = useState(3);
  const [results, setResults] = useState<string[]>([]);
  
  const mutation = useGenerateTweet();

  const handleGenerate = () => {
    if (!topic.trim()) return;
    mutation.mutate(
      { data: { topic, tone: tone as any, count } }, 
      { onSuccess: (data) => setResults(data.results) }
    );
  };

  return (
    <ToolPageLayout title="Tweet Generator" description="Create viral tweets and threads instantly." icon={Twitter}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">What do you want to tweet about?</label>
            <SmartTextarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. My top 5 productivity tips for remote workers"
              className="h-32"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Tone</label>
            <select 
              value={tone} 
              onChange={e => setTone(e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="informative">Informative / Value</option>
              <option value="funny">Funny / Meme</option>
              <option value="controversial">Controversial / Hot Take</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex justify-between text-sm font-semibold text-foreground">
              <span>Number of variations</span>
              <span className="text-primary">{count}</span>
            </label>
            <input 
              type="range" min="1" max="5" 
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
            {mutation.isPending ? "Generating..." : "Generate Tweets"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} results={results} />
      </div>
    </ToolPageLayout>
  );
}
