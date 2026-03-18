import { useState } from "react";
import { Instagram } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateInstagramBio } from "@workspace/api-client-react";

export default function InstagramBio() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");
  
  const mutation = useGenerateInstagramBio();

  const handleGenerate = () => {
    if (!name.trim() || !niche.trim()) return;
    mutation.mutate(
      { data: { name, niche, tone: tone as any } }, 
      { onSuccess: (data) => setResult(data.result) }
    );
  };

  return (
    <ToolPageLayout 
      title="Instagram Bio Generator" 
      description="Craft the perfect, engaging Instagram bio tailored to your niche." 
      icon={Instagram}
    >
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Your Name / Brand</label>
            <input 
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Niche / Industry</label>
            <input 
              type="text"
              value={niche}
              onChange={e => setNiche(e.target.value)}
              placeholder="e.g. Fitness Coach, Travel Blogger"
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Tone of Voice</label>
            <select 
              value={tone} 
              onChange={e => setTone(e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="professional">Professional</option>
              <option value="funny">Funny & Quirky</option>
              <option value="inspiring">Inspiring</option>
              <option value="casual">Casual & Friendly</option>
            </select>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !name.trim() || !niche.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Generating..." : "Generate Bio"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} result={result} />
      </div>
    </ToolPageLayout>
  );
}
