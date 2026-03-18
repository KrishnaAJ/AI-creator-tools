import { cn } from "@/lib/utils";

type AdSize = "leaderboard" | "rectangle" | "inline";

interface AdBannerProps {
  className?: string;
  size?: AdSize;
}

const sizeConfig: Record<AdSize, { label: string; dims: string; minH: string }> = {
  leaderboard: { label: "728×90",  dims: "Leaderboard",      minH: "min-h-[100px]" },
  rectangle:   { label: "300×250", dims: "Medium Rectangle", minH: "min-h-[90px]"  },
  inline:      { label: "468×60",  dims: "Half Banner",      minH: "min-h-[72px]"  },
};

export function AdBanner({ className, size = "leaderboard" }: AdBannerProps) {
  const cfg = sizeConfig[size];
  return (
    <div
      className={cn(
        "w-full bg-gradient-to-r from-slate-50 to-slate-100/80 border border-slate-200/80 text-slate-400 rounded-2xl my-6 font-mono text-sm shadow-inner flex flex-col items-center justify-center gap-1 select-none",
        cfg.minH,
        className
      )}
      style={{ contain: "layout size" }}
    >
      <span className="tracking-widest uppercase text-[10px] font-bold text-slate-400">
        Advertisement
      </span>
      <span className="text-xs text-slate-300 font-sans">
        AdSense · {cfg.dims} ({cfg.label})
      </span>
    </div>
  );
}
