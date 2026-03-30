export type WorkspaceStatus = "Active" | "Syncing" | "Review";
export type SidebarSection = "home" | "data-sources" | "workflow" | "assistant";
export type DataSourceKind = "Vector Database" | "Graph Database";

export interface RagSource {
  id: string;
  title: string;
  type: "Guideline" | "EHR" | "PDF" | "Note";
  snippet: string;
  relevance: number;
  updatedAt: string;
}

export interface RagMessage {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
  createdAt: string;
  citations?: string[];
}

export interface RagCollection {
  id: string;
  name: string;
  description: string;
  documents: number;
  embeddingModel: string;
  chunkStrategy: string;
  lastUpdated: string;
}

export interface DataSource {
  id: string;
  name: string;
  kind: DataSourceKind;
  provider: string;
  status: "Connected" | "Syncing" | "Draft";
  documents: number;
  description: string;
  updatedAt: string;
}

export interface RagWorkspace {
  title: string;
  subtitle: string;
  organization: string;
  owner: string;
  status: WorkspaceStatus;
  riskLevel: "Moderate" | "Low" | "High";
  description: string;
  createdAt: string;
  updatedAt: string;
  queryVolume: string;
  assistant: {
    lead: string;
    mlEngineer: string;
    domainExpert: string;
  };
  metrics: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  dataSources: DataSource[];
  collections: RagCollection[];
  sources: RagSource[];
  timeline: RagMessage[];
}
