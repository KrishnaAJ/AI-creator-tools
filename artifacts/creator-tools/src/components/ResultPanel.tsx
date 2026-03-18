import { ReactNode } from "react";
import { Copy, Download, Loader2, AlertCircle, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/contexts/ToastContext";

interface ResultPanelProps {
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  result?: string;
  results?: string[];
  emptyMessage?: string;
  customRender?: ReactNode;
}

function ShareBar({ text }: { text: string }) {
  const pageUrl = encodeURIComponent(window.location.href);
  const encodedText = encodeURIComponent(text.slice(0, 200));
  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(text.slice(0, 200) + "\n\nGenerated at toolsai.app")}`,
      color: "hover:text-green-600",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.537 4.049 1.476 5.753L0 24l6.395-1.469C8.042 23.477 9.978 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.844 0-3.573-.487-5.07-1.339l-.362-.215-3.795.871.896-3.701-.236-.381A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      ),
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${pageUrl}`,
      color: "hover:text-black",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      color: "hover:text-blue-700",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-border flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        <Share2 className="w-3.5 h-3.5" />
        Share:
      </div>
      {links.map(({ label, href, color, svg }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${label}`}
          className={`p-2 rounded-lg bg-muted/60 text-muted-foreground transition-all hover:bg-muted ${color}`}
        >
          {svg}
        </a>
      ))}
    </div>
  );
}

export function ResultPanel({
  isLoading,
  isError,
  errorMessage,
  result,
  results,
  customRender,
  emptyMessage = "Your generated content will appear here...",
}: ResultPanelProps) {
  const { showToast } = useToast();

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!", "success");
    } catch {
      showToast("Failed to copy. Please try again.", "error");
    }
  };

  const handleDownload = (text: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "toolsai-result.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded!", "success");
  };

  const hasData = result || (results && results.length > 0) || customRender;
  const shareText = result || (results && results[0]) || "";

  const ActionButtons = ({ text }: { text: string }) => (
    <div className="absolute top-3 right-3 flex gap-1.5">
      <button
        onClick={() => handleDownload(text)}
        className="p-1.5 bg-white shadow-sm border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all"
        title="Download as .txt"
      >
        <Download className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleCopy(text)}
        className="p-1.5 bg-white shadow-sm border border-slate-100 rounded-lg text-slate-400 hover:text-primary transition-all"
        title="Copy to clipboard"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <div className="glass-panel rounded-2xl p-6 h-full min-h-[400px] flex flex-col relative overflow-hidden">
      <h3 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
        <span className="w-2 h-6 bg-accent rounded-full"></span>
        Output Results
      </h3>

      <div className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="space-y-3 mb-6">
                {[80, 60, 70].map((w, i) => (
                  <div
                    key={i}
                    className="animate-shimmer rounded-xl h-14 bg-gradient-to-r from-muted/70 via-white to-muted/70 bg-[length:200%_100%]"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm font-semibold">Generating magic...</p>
              </div>
            </motion.div>
          ) : isError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                <AlertCircle className="w-7 h-7 text-red-500" />
              </div>
              <p className="font-semibold text-red-600 mb-1">Something went wrong</p>
              <p className="text-sm text-muted-foreground">
                {errorMessage ?? "The AI could not generate a response. Please try again."}
              </p>
            </motion.div>
          ) : !hasData ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="text-muted-foreground font-medium text-center max-w-[250px]">
                {emptyMessage}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 overflow-y-auto pr-1 space-y-4"
            >
              {customRender}

              {result && !customRender && (
                <div className="relative bg-muted/50 border border-border p-4 pr-20 rounded-xl hover:border-primary/30 transition-colors">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">{result}</p>
                  <ActionButtons text={result} />
                </div>
              )}

              {results && !customRender &&
                results.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative bg-muted/50 border border-border p-4 pr-20 rounded-xl hover:border-primary/30 transition-colors"
                  >
                    <p className="text-foreground whitespace-pre-wrap">{item}</p>
                    <ActionButtons text={item} />
                  </div>
                ))}

              {shareText && <ShareBar text={shareText} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
