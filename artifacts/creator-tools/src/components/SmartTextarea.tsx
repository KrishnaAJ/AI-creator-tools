import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SmartTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

export function SmartTextarea({ value, className, ...props }: SmartTextareaProps) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const chars = value.length;

  return (
    <div>
      <textarea
        value={value}
        className={cn(
          "w-full p-3 rounded-xl border border-border bg-background focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none",
          className
        )}
        {...props}
      />
      <div className="flex gap-4 mt-1.5 px-0.5">
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{words}</span> words
        </span>
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{chars}</span> characters
        </span>
      </div>
    </div>
  );
}
