import { useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGrammarCheck } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function GrammarCheck() {
  const [text, setText] = useState("");
  const [corrected, setCorrected] = useState("");
  const [changes, setChanges] = useState<string[]>([]);
  
  const mutation = useGrammarCheck();

  const handleGenerate = () => {
    if (!text.trim()) return;
    mutation.mutate(
      { data: { text } }, 
      { onSuccess: (data) => {
          setCorrected(data.corrected);
          setChanges(data.changes);
        }
      }
    );
  };

  const renderChanges = () => {
    if (!corrected) return null;
    return (
      <div className="space-y-6">
        <div className="group relative bg-muted/50 border border-border p-4 rounded-xl hover:border-primary/30 transition-colors">
          <p className="text-foreground whitespace-pre-wrap">{corrected}</p>
        </div>
        {changes && changes.length > 0 && (
          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
            <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4" /> 
              Changes Made
            </h4>
            <ul className="space-y-2">
              {changes.map((change, i) => (
                <li key={i} className="text-sm text-amber-900 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <ToolPageLayout title="Grammar Check" description="Ensure your writing is perfectly polished and error-free." icon={CheckCircle}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Your Text</label>
            <SmartTextarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your text with errors here..."
              className="h-48"
            />
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !text.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Checking..." : "Fix Grammar"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} customRender={renderChanges()} />
      </div>
    </ToolPageLayout>
  );
}
