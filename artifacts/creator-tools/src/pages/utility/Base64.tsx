import { useState } from "react";
import { Code } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export default function Base64() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      setText(btoa(text));
      setError("");
    } catch(e) {
      setError("Text contains invalid characters for Base64 encoding.");
    }
  };

  const handleDecode = () => {
    try {
      setText(atob(text));
      setError("");
    } catch(e) {
      setError("Invalid Base64 string.");
    }
  };

  return (
    <ToolPageLayout title="Base64 Encoder / Decoder" description="Easily encode and decode Base64 strings." icon={Code}>
      <div className="lg:col-span-12 space-y-6">
        
        <div className="flex flex-wrap gap-3">
          <button onClick={handleEncode} className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-md hover:opacity-90 transition-opacity font-semibold">Encode to Base64</button>
          <button onClick={handleDecode} className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-colors font-semibold">Decode from Base64</button>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">{error}</div>}

        <div className="glass-panel rounded-2xl p-2 relative">
          <textarea 
            value={text}
            onChange={e => { setText(e.target.value); setError(""); }}
            placeholder="Type or paste your text / Base64 string here..."
            className="w-full p-4 rounded-xl border-none bg-transparent focus:ring-0 outline-none resize-none h-[400px] text-lg font-mono text-slate-800 placeholder:text-slate-400 placeholder:font-sans"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            {text && (
              <>
                <button onClick={() => setText("")} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Clear</button>
                <button onClick={() => navigator.clipboard.writeText(text)} className="bg-slate-800 text-white hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md">Copy Result</button>
              </>
            )}
          </div>
        </div>

      </div>
    </ToolPageLayout>
  );
}
