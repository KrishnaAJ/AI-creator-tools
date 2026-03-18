import { useState } from "react";
import { Edit3 } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export default function CaseConverter() {
  const [text, setText] = useState("");

  const convertCase = (type: string) => {
    if (!text) return;
    switch(type) {
      case 'upper': setText(text.toUpperCase()); break;
      case 'lower': setText(text.toLowerCase()); break;
      case 'title': 
        setText(text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
        break;
      case 'sentence': 
        setText(text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()));
        break;
      case 'camel':
        setText(text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()));
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolPageLayout title="Case Converter" description="Easily convert text to uppercase, lowercase, title case, and more." icon={Edit3}>
      <div className="lg:col-span-12 space-y-6">
        
        <div className="flex flex-wrap gap-3">
          <button onClick={() => convertCase('upper')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-primary hover:text-primary transition-colors font-semibold text-sm">UPPERCASE</button>
          <button onClick={() => convertCase('lower')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-primary hover:text-primary transition-colors font-semibold text-sm">lowercase</button>
          <button onClick={() => convertCase('title')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-primary hover:text-primary transition-colors font-semibold text-sm">Title Case</button>
          <button onClick={() => convertCase('sentence')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-primary hover:text-primary transition-colors font-semibold text-sm">Sentence case</button>
          <button onClick={() => convertCase('camel')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-primary hover:text-primary transition-colors font-semibold text-sm">camelCase</button>
        </div>

        <div className="glass-panel rounded-2xl p-2 relative">
          <textarea 
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type or paste your text here to convert..."
            className="w-full p-4 rounded-xl border-none bg-transparent focus:ring-0 outline-none resize-none h-[400px] text-lg text-slate-800 placeholder:text-slate-400"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            {text && (
              <>
                <button onClick={() => setText("")} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Clear</button>
                <button onClick={copyToClipboard} className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md">Copy Text</button>
              </>
            )}
          </div>
        </div>

      </div>
    </ToolPageLayout>
  );
}
