import type { DataSource, RagCollection, RagSource, RagWorkspace } from "@/types/rag";

export const mockSources: RagSource[] = [
  {
    id: "src-1",
    title: "Chest Pain Triage Guideline v4",
    type: "Guideline",
    snippet: "Escalate when chest pain co-occurs with dyspnea, diaphoresis, or unstable vitals. Document rule-out criteria explicitly.",
    relevance: 0.94,
    updatedAt: "2026-03-28"
  },
  {
    id: "src-2",
    title: "Cardiology Intake - Patient 0041",
    type: "EHR",
    snippet: "Patient reports exertional tightness for five days, no prior MI, family history positive, normal oxygen saturation at intake.",
    relevance: 0.89,
    updatedAt: "2026-03-30"
  },
  {
    id: "src-3",
    title: "Medication Reconciliation Notes",
    type: "Note",
    snippet: "Current medications include atorvastatin and lisinopril. No anticoagulants reported in the latest review.",
    relevance: 0.77,
    updatedAt: "2026-03-27"
  }
];

export const mockCollections: RagCollection[] = [
  {
    id: "col-1",
    name: "Clinical Guidelines",
    description: "Versioned protocols, SOPs, and escalation pathways.",
    documents: 126,
    embeddingModel: "text-embedding-3-large",
    chunkStrategy: "Semantic 600 / overlap 80",
    lastUpdated: "2026-03-29"
  },
  {
    id: "col-2",
    name: "Encounter History",
    description: "Recent structured visits, discharge notes, and observations.",
    documents: 428,
    embeddingModel: "text-embedding-3-large",
    chunkStrategy: "Windowed 400 / overlap 40",
    lastUpdated: "2026-03-30"
  },
  {
    id: "col-3",
    name: "Operations Playbooks",
    description: "Internal checklists for review, audit, and compliance.",
    documents: 52,
    embeddingModel: "text-embedding-3-small",
    chunkStrategy: "Markdown heading split",
    lastUpdated: "2026-03-26"
  }
];

export const mockDataSources: DataSource[] = [];

export const mockWorkspace: RagWorkspace = {
  title: "ClinRAG Retrieval Workspace",
  subtitle: "Acute chest pain review and source-grounded response drafting",
  organization: "ClinRAG Berlin Pilot",
  owner: "Dr. Saif Clinical AI",
  status: "Active",
  riskLevel: "Moderate",
  description:
    "A clinician-facing retrieval workspace that blends guidelines, patient context, and operational notes into explainable responses with traceable citations.",
  createdAt: "2026-02-12",
  updatedAt: "2026-03-30",
  queryVolume: "1.4k / week",
  assistant: {
    lead: "Mila Hartmann",
    mlEngineer: "Jonah Weiss",
    domainExpert: "Dr. Elena Bauer"
  },
  metrics: [
    {
      label: "Retrieval Precision",
      value: "92.4%",
      detail: "Average across last 500 validated prompts"
    },
    {
      label: "Median Latency",
      value: "1.8s",
      detail: "Vector search + rerank + answer draft"
    },
    {
      label: "Citation Coverage",
      value: "96%",
      detail: "Assistant turns with at least one grounded citation"
    }
  ],
  dataSources: mockDataSources,
  collections: mockCollections,
  sources: mockSources,
  timeline: []
};
