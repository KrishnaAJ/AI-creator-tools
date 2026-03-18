import { useState } from "react";
import { FileCode } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ResultPanel } from "@/components/ResultPanel";

const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    const textArray = Array(paragraphs).fill(LOREM_TEXT);
    setResult(textArray.join("\n\n"));
  };

  return (
    <ToolPageLayout title="Lorem Ipsum Generator" description="Generate placeholder dummy text for your designs." icon={FileCode}>
      <div className="lg:col-span-5 glass-panel rounded-2xl p-6 h-fit">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="flex justify-between text-sm font-semibold text-foreground">
              <span>Number of Paragraphs</span>
              <span className="text-primary">{paragraphs}</span>
            </label>
            <input 
              type="range" min="1" max="20" 
              value={paragraphs} 
              onChange={e => setParagraphs(parseInt(e.target.value))} 
              className="w-full accent-primary"
            />
          </div>
          <button 
            onClick={handleGenerate} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 active:scale-[0.98]"
          >
            Generate Text
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ResultPanel isLoading={false} result={result} emptyMessage="Click generate to get lorem ipsum text..." />
      </div>
    </ToolPageLayout>
  );
}
