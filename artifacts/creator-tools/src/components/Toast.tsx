import { AnimatePresence, motion } from "framer-motion";
import { Check, X, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

const configs = {
  success: {
    icon: <Check className="w-4 h-4 text-white" />,
    iconBg: "bg-gradient-to-br from-primary to-accent",
    border: "border-primary/20",
    shadow: "shadow-primary/10",
  },
  error: {
    icon: <AlertCircle className="w-4 h-4 text-white" />,
    iconBg: "bg-gradient-to-br from-red-500 to-rose-500",
    border: "border-red-100",
    shadow: "shadow-red-100/50",
  },
  info: {
    icon: <Info className="w-4 h-4 text-white" />,
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
    border: "border-blue-100",
    shadow: "shadow-blue-100/50",
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const cfg = configs[toast.type ?? "success"];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border bg-white/95 backdrop-blur-md shadow-xl min-w-[220px] max-w-xs ${cfg.border} ${cfg.shadow}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
                {cfg.icon}
              </div>
              <span className="text-sm font-semibold text-foreground flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted-foreground hover:text-foreground transition-colors ml-1 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
