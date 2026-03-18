import { useState, useEffect } from "react";
import { Palette, Copy, Check, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export default function ColorPalette() {
  const [colors, setColors] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => 
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    );
    setColors(newColors);
  };

  useEffect(() => {
    generatePalette();
  }, []);

  const copyHex = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex.toUpperCase());
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolPageLayout title="Color Palette Generator" description="Discover beautiful random color palettes." icon={Palette}>
      <div className="lg:col-span-12 space-y-6">
        
        <div className="flex justify-end">
          <button 
            onClick={generatePalette}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-primary hover:border-primary px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Generate New Palette
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
          {colors.map((color, idx) => (
            <div 
              key={idx} 
              className="flex-1 group relative transition-all duration-300 hover:flex-[1.5] cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => copyHex(color, idx)}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                <div className="bg-white/90 text-slate-900 px-4 py-2 rounded-xl font-mono font-bold shadow-lg flex items-center gap-2">
                  {color.toUpperCase()}
                  {copiedIndex === idx ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </ToolPageLayout>
  );
}
