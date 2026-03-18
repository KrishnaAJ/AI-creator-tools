import { useState } from "react";
import { Type } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { motion } from "framer-motion";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.length > 0).length : 0;

  const StatBox = ({ label, value }: { label: string, value: number }) => (
    <div className="bg-white border border-slate-100 shadow-sm p-4 rounded-2xl text-center">
      <div className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">{value}</div>
      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );

  return (
    <ToolPageLayout title="Word & Character Counter" description="Real-time text analytics for your content." icon={Type}>
      <div className="col-span-1 lg:col-span-12 space-y-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatBox label="Words" value={words} />
          <StatBox label="Characters" value={chars} />
          <StatBox label="No Spaces" value={charsNoSpaces} />
          <StatBox label="Sentences" value={sentences} />
          <StatBox label="Paragraphs" value={paragraphs} />
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass-panel rounded-2xl p-2 relative"
        >
          <textarea 
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type or paste your document here..."
            className="w-full p-4 rounded-xl border-none bg-transparent focus:ring-0 outline-none resize-none h-[400px] text-lg text-slate-800 placeholder:text-slate-400"
          />
          {text && (
            <button 
              onClick={() => setText("")}
              className="absolute bottom-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Clear Text
            </button>
          )}
        </motion.div>

      </div>
    </ToolPageLayout>
  );
}
