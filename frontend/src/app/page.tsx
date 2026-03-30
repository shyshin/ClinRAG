import { PageShell } from "@/components/layout/page-shell";
import { RagDashboard } from "@/components/rag/rag-dashboard";

export default function HomePage() {
  return (
    <PageShell>
      <RagDashboard />
    </PageShell>
  );
}
