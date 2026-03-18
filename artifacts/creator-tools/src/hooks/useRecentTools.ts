import { useState, useCallback } from "react";

const STORAGE_KEY = "toolsai_recent_v1";
const MAX_RECENT = 3;

export interface RecentTool {
  id: string;
  name: string;
  path: string;
}

function readStorage(): RecentTool[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useRecentTools() {
  const [recent, setRecent] = useState<RecentTool[]>(readStorage);

  const addRecent = useCallback((tool: RecentTool) => {
    setRecent(prev => {
      const filtered = prev.filter(t => t.id !== tool.id);
      const updated = [tool, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  return { recent, addRecent };
}
