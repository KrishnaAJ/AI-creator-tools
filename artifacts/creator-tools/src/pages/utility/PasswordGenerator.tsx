import { useState, useEffect } from "react";
import { Key, Copy, Check, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!charset) {
      setPassword("Please select at least one option!");
      return;
    }

    let result = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      result += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(result);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout title="Password Generator" description="Create strong, secure passwords instantly." icon={Key}>
      <div className="lg:col-span-8 lg:col-start-3 space-y-8">
        
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 mb-8">
            <span className="text-2xl md:text-4xl font-mono tracking-wider font-bold text-slate-800 break-all">{password}</span>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button 
                onClick={generatePassword}
                className="p-3 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                title="Regenerate"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
              <button 
                onClick={copyToClipboard}
                className="p-3 bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                title="Copy"
              >
                {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>Password Length</span>
                <span className="text-primary text-lg">{length}</span>
              </div>
              <input 
                type="range" min="8" max="64" 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="w-5 h-5 accent-primary rounded cursor-pointer" />
                <span className="font-medium text-slate-700">Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" checked={lowercase} onChange={e => setLowercase(e.target.checked)} className="w-5 h-5 accent-primary rounded cursor-pointer" />
                <span className="font-medium text-slate-700">Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" checked={numbers} onChange={e => setNumbers(e.target.checked)} className="w-5 h-5 accent-primary rounded cursor-pointer" />
                <span className="font-medium text-slate-700">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" checked={symbols} onChange={e => setSymbols(e.target.checked)} className="w-5 h-5 accent-primary rounded cursor-pointer" />
                <span className="font-medium text-slate-700">Symbols (!@#$)</span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </ToolPageLayout>
  );
}
