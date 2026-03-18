import { useState } from "react";
import { Mail } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";
import { useGenerateEmailSubject } from "@workspace/api-client-react";
import { SmartTextarea } from "@/components/SmartTextarea";

export default function EmailSubject() {
  const [emailTopic, setEmailTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [results, setResults] = useState<string[]>([]);
  
  const mutation = useGenerateEmailSubject();

  const handleGenerate = () => {
    if (!emailTopic.trim()) return;
    mutation.mutate(
      { data: { emailTopic, audience } }, 
      { onSuccess: (data) => setResults(data.results) }
    );
  };

  return (
    <ToolPageLayout title="Email Subject Lines" description="Write subject lines that guarantee high open rates." icon={Mail}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">What is the email about?</label>
            <SmartTextarea
              value={emailTopic}
              onChange={e => setEmailTopic(e.target.value)}
              placeholder="e.g. Announcing our Black Friday 50% off sale"
              className="h-32"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Target Audience (Optional)</label>
            <input 
              type="text"
              value={audience}
              onChange={e => setAudience(e.target.value)}
              placeholder="e.g. Existing customers, Newsletter subscribers"
              className="w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleGenerate} 
            disabled={mutation.isPending || !emailTopic.trim()} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Generating..." : "Generate Subjects"}
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={mutation.isPending} isError={mutation.isError} results={results} />
      </div>
    </ToolPageLayout>
  );
}
