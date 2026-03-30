import type { ReactNode } from "react";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { cn } from "@/lib/utils";

export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main className={cn("mx-auto min-h-screen w-full max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8", className)}>
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <SidebarNav />
        <div>{children}</div>
      </div>
    </main>
  );
}
