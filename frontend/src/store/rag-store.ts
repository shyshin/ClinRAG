"use client";

import { create } from "zustand";

import type { SidebarSection } from "@/types/rag";

interface RagStoreState {
  activeSection: SidebarSection;
  activeTab: "overview" | "sessions" | "documents";
  selectedSourceId: string | null;
  queryDraft: string;
  setActiveSection: (section: SidebarSection) => void;
  setActiveTab: (tab: RagStoreState["activeTab"]) => void;
  setSelectedSourceId: (sourceId: string | null) => void;
  setQueryDraft: (value: string) => void;
}

export const useRagStore = create<RagStoreState>((set) => ({
  activeSection: "home",
  activeTab: "overview",
  selectedSourceId: "src-1",
  queryDraft: "Summarize the escalation rationale for this patient and cite the strongest evidence.",
  setActiveSection: (activeSection) => set({ activeSection }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setSelectedSourceId: (selectedSourceId) => set({ selectedSourceId }),
  setQueryDraft: (queryDraft) => set({ queryDraft })
}));
