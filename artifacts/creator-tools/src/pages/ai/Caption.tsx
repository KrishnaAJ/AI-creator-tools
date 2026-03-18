import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateCaption } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function Caption() {
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("funny");
  const [result, setResult] = useState("");
  
  const mutation = useGenerateCaption();

  const handleGenerate = () => {
    if (!description.trim()) return;
    mutation.mutate(
      { data: { description, platform: platform as any, tone: tone as any } }, 
      { onSuccess: (data) => setResult(data.result) }
    );
  };

  return (
    <ToolPageLayout 
      title="Caption Generator" 
      description="Write highly engaging captions that stop the scroll." 
      icon={MessageSquare}
    >
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">What's the post about?</label>
            <SmartTextarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. A picture of me and my dog hiking in the mountains."
              className="h-32"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Platform</label>
              <select 
                value={platform} 
                onChange={e => setPlatform(e.target.value)} 
                className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Tone</label>
              <select 
                value={tone} 
                onChange={e => setTone(e.target.value)} 
                className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="funny">Funny</option>
                <option value="professional">Professional</option>
                <option value="inspirational">Inspirational</option>
                <option value="casual">Casual</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !description.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Writing..." : "Write Caption"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} result={result} />
      </div>
    </ToolPageLayout>
  );
}
