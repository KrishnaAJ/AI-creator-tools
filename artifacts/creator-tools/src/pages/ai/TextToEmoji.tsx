import { useState } from "react";
import { Smile } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useTextToEmoji } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function TextToEmoji() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  
  const mutation = useTextToEmoji();

  const handleGenerate = () => {
    if (!text.trim()) return;
    mutation.mutate(
      { data: { text } }, 
      { onSuccess: (data) => setResult(data.result) }
    );
  };

  return (
    <ToolPageLayout title="Text to Emoji" description="Translate your plain text into fun, expressive emojis!" icon={Smile}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Your Plain Text</label>
            <SmartTextarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="e.g. I am so happy to see you today!"
              className="h-40"
            />
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !text.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Translating..." : "Emojify Text ✨"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} result={result} />
      </div>
    </ToolPageLayout>
  );
}
