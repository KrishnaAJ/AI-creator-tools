import { useState } from "react";
import { Megaphone } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateAdCopy } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function AdCopy() {
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("facebook");
  const [goal, setGoal] = useState("conversions");
  const [results, setResults] = useState<string[]>([]);
  
  const mutation = useGenerateAdCopy();

  const handleGenerate = () => {
    if (!product.trim()) return;
    mutation.mutate(
      { data: { product, platform: platform as any, goal: goal as any } }, 
      { onSuccess: (data) => setResults(data.results) }
    );
  };

  return (
    <ToolPageLayout title="Ad Copy Generator" description="High-converting copy for your marketing campaigns." icon={Megaphone}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">What are you advertising?</label>
            <SmartTextarea
              value={product}
              onChange={e => setProduct(e.target.value)}
              placeholder="Describe your product/service and special offers..."
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
                <option value="facebook">Facebook Ads</option>
                <option value="instagram">Instagram Ads</option>
                <option value="google">Google Ads</option>
                <option value="twitter">Twitter / X Ads</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Campaign Goal</label>
              <select 
                value={goal} 
                onChange={e => setGoal(e.target.value)} 
                className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="conversions">Conversions / Sales</option>
                <option value="clicks">Link Clicks</option>
                <option value="awareness">Brand Awareness</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !product.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Generating..." : "Generate Ad Copy"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} results={results} />
      </div>
    </ToolPageLayout>
  );
}
