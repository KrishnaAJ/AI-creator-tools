import { useState } from "react";
import { AlignLeft } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useSummarizeText } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function Summarize() {
  const [text, setText] = useState("");
  const [length, setLength] = useState("medium");
  const [result, setResult] = useState("");
  
  const mutation = useSummarizeText();

  const handleGenerate = () => {
    if (!text.trim()) return;
    mutation.mutate(
      { data: { text, length: length as any } }, 
      { onSuccess: (data) => setResult(data.result) }
    );
  };

  return (
    <ToolPageLayout title="Text Summarizer" description="Condense long articles into key points." icon={AlignLeft}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Long Text / Article</label>
            <SmartTextarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste the long text you want to summarize..."
              className="h-48"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Summary Length</label>
            <select 
              value={length} 
              onChange={e => setLength(e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="short">Short (Bullet points)</option>
              <option value="medium">Medium (1-2 paragraphs)</option>
              <option value="long">Detailed (Comprehensive overview)</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !text.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Summarizing..." : "Summarize Text"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} result={result} />
      </div>
    </ToolPageLayout>
  );
}
