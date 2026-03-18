import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useParaphraseText } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function Paraphrase() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("formal");
  const [result, setResult] = useState("");
  
  const mutation = useParaphraseText();

  const handleGenerate = () => {
    if (!text.trim()) return;
    mutation.mutate(
      { data: { text, tone: tone as any } }, 
      { onSuccess: (data) => setResult(data.result) }
    );
  };

  return (
    <ToolPageLayout title="Paraphrase Text" description="Rewrite your sentences for better flow and impact." icon={RefreshCw}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Original Text</label>
            <SmartTextarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste the text you want to rewrite here..."
              className="h-40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">New Tone</label>
            <select 
              value={tone} 
              onChange={e => setTone(e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="formal">Formal & Academic</option>
              <option value="casual">Casual & Friendly</option>
              <option value="simple">Simple (Plain English)</option>
              <option value="creative">Creative & Expressive</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !text.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Rewriting..." : "Rewrite Text"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} result={result} />
      </div>
    </ToolPageLayout>
  );
}
