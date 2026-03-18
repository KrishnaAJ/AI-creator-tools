import { ReactNode } from "react";
import { AdBanner } from "./AdBanner";
import { ToolInfoSection } from "./ToolInfoSection";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useMeta } from "@/hooks/useMeta";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  howToUse?: string[];
  benefits?: string[];
  faqs?: { q: string; a: string }[];
}

export function ToolPageLayout({ title, description, icon: Icon, children, howToUse, benefits, faqs }: ToolPageLayoutProps) {
  useMeta(
    `Free ${title}`,
    `Use ToolsAI's free ${title.toLowerCase()} to ${description.replace(/\.$/, "").toLowerCase()}. No signup required — instant results powered by AI.`
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto w-full pb-12"
    >
      <div className="flex items-center gap-5 mb-6">
        <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/10 text-primary rounded-2xl shadow-inner border border-primary/10">
          <Icon className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{description}</p>
        </div>
      </div>
      
      <AdBanner size="leaderboard" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {children}
      </div>

      <AdBanner size="inline" className="mt-2" />
      
      <AdBanner size="leaderboard" />

      <ToolInfoSection 
        title={title} 
        description={description} 
        howToUse={howToUse}
        benefits={benefits}
        faqs={faqs}
      />
    </motion.div>
  );
}
