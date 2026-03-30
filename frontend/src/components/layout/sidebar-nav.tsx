"use client";

import { Bot, Database, GitBranch, Home, PanelLeftClose } from "lucide-react";

import { useRagStore } from "@/store/rag-store";
import type { SidebarSection } from "@/types/rag";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "data-sources", label: "Data Sources", icon: Database },
  { id: "workflow", label: "Workflow", icon: GitBranch },
  { id: "assistant", label: "Assistant", icon: Bot }
] as const;

export function SidebarNav() {
  const { activeSection, setActiveSection } = useRagStore();

  return (
    <aside className="sticky top-6 h-[calc(100vh-3rem)] rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,248,252,0.96))] p-4 shadow-panel">
      <div className="flex h-full flex-col">
        <div className="mb-6 flex items-center justify-between px-2 pt-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">ClinRAG</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground">Console</h2>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-white/80 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveSection(item.id as SidebarSection)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[22px] px-4 py-3.5 text-left text-sm font-medium transition-all",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-transparent text-slate-600 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-[24px] border border-border/70 bg-white/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">System status</p>
          <p className="mt-3 text-lg font-semibold text-foreground">Clinical retrieval online</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            3 collections synced, citation coverage stable, and workflow monitoring active.
          </p>
        </div>
      </div>
    </aside>
  );
}
