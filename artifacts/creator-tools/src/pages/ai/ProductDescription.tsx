import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateProductDescription } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function ProductDescription() {
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [result, setResult] = useState("");
  
  const mutation = useGenerateProductDescription();

  const handleGenerate = () => {
    if (!productName.trim() || !features.trim()) return;
    mutation.mutate(
      { data: { productName, features, targetAudience } }, 
      { onSuccess: (data) => setResult(data.result) }
    );
  };

  return (
    <ToolPageLayout title="Product Descriptions" description="Sell more with persuasive, SEO-friendly descriptions." icon={ShoppingBag}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Product Name</label>
            <input 
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="e.g. Ergonomic Office Chair V2"
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Key Features & Benefits</label>
            <SmartTextarea
              value={features}
              onChange={e => setFeatures(e.target.value)}
              placeholder="e.g. Lumbar support, breathable mesh, adjustable armrests..."
              className="h-24"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Target Audience (Optional)</label>
            <input 
              type="text"
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
              placeholder="e.g. Gamers, Remote Workers"
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !productName.trim() || !features.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Generating..." : "Generate Description"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} result={result} />
      </div>
    </ToolPageLayout>
  );
}
