import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { TOOL_CATEGORIES, ALL_TOOLS } from "@/lib/navigation";
import { Menu, X, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Footer } from "./Footer";
import { ToastContainer } from "./Toast";
import { useRecentTools } from "@/hooks/useRecentTools";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { recent, addRecent } = useRecentTools();

  useEffect(() => {
    const tool = ALL_TOOLS.find(t => t.path === location);
    if (tool) {
      addRecent({ id: tool.id, name: tool.name, path: tool.path });
    }
  }, [location]);

  const NavLinks = () => (
    <div className="space-y-8">
      {recent.length > 0 && (
        <div>
          <h4 className="px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Recently Used
          </h4>
          <ul className="space-y-1">
            {recent.map((tool) => {
              const fullTool = ALL_TOOLS.find(t => t.id === tool.id);
              const isActive = location === tool.path;
              return (
                <li key={tool.id}>
                  <Link
                    href={tool.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-xl mx-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    {fullTool && (
                      <fullTool.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-muted-foreground")} />
                    )}
                    <span className="truncate">{tool.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {TOOL_CATEGORIES.map((cat, idx) => (
        <div key={idx}>
          <h4 className="px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            {cat.name}
          </h4>
          <ul className="space-y-1">
            {cat.tools.map((tool) => {
              const isActive = location === tool.path;
              return (
                <li key={tool.id}>
                  <Link
                    href={tool.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl mx-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    <tool.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-muted-foreground")} />
                    {tool.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="mx-2 px-2">
        <h4 className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Company</h4>
        <ul className="space-y-1">
          {[
            { href: "/about", label: "About Us" },
            { href: "/contact", label: "Contact" },
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/terms-of-service", label: "Terms of Service" },
            { href: "/disclaimer", label: "Disclaimer" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  location === href
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header — fixed so it stays on scroll */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between h-[60px]">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          ToolsAI
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-foreground bg-muted rounded-lg"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile spacer to prevent content going under fixed header */}
      <div className="md:hidden h-[60px] shrink-0" />

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="md:hidden fixed inset-x-0 top-[60px] bottom-0 z-40 bg-background overflow-y-auto pb-24 pt-4"
          >
            <NavLinks />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white/50 backdrop-blur-xl border-r border-border h-screen sticky top-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 font-display text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <Sparkles className="w-5 h-5" />
            </div>
            ToolsAI
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <NavLinks />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 w-full p-4 md:p-8 lg:p-10 overflow-x-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
          {children}
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}
