"use client";

import { useEffect } from "react";
import {
  Activity,
  CalendarDays,
  FileText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useChatMutation, useWorkspaceQuery } from "@/hooks/use-rag-data";
import { ragQuerySchema, type RagQueryFormValues } from "@/lib/validators";
import { useRagStore } from "@/store/rag-store";
import { DataSourcesPanel } from "@/components/rag/data-sources-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const tabItems = [
  { id: "overview", label: "Overview" },
  { id: "sessions", label: "Sessions" },
  { id: "documents", label: "Documents" }
] as const;

export function RagDashboard() {
  const workspaceQuery = useWorkspaceQuery();
  const chatMutation = useChatMutation();
  const { activeSection, activeTab, setActiveTab, queryDraft, setQueryDraft } = useRagStore();

  const workspace = workspaceQuery.data;

  const form = useForm<RagQueryFormValues>({
    resolver: zodResolver(ragQuerySchema),
    defaultValues: {
      question: queryDraft,
      collectionId: workspace?.collections[0]?.id ?? "",
      topK: 4,
      includeTimeline: true
    }
  });

  useEffect(() => {
    if (workspace?.collections[0]?.id && !form.getValues("collectionId")) {
      form.setValue("collectionId", workspace.collections[0].id);
    }
  }, [form, workspace]);

  const onSubmit = form.handleSubmit(async (values) => {
    setQueryDraft(values.question);
    await chatMutation.mutateAsync(values);
  });

  if (activeSection === "data-sources") {
    return <DataSourcesPanel />;
  }

  if (activeSection === "workflow" || activeSection === "assistant") {
    return (
      <Card className="rounded-[32px] border-white/70 bg-white/80">
        <CardContent className="p-10">
          <h1 className="font-serif text-5xl leading-none tracking-tight text-foreground">
            {activeSection === "workflow" ? "Workflow" : "Assistant"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            This section is ready for the next pass. The sidebar now switches views cleanly, so we can build this area
            out next without touching the home workspace again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-[32px] border-white/70 bg-white/80">
        <CardContent className="p-0">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.55fr_0.9fr] lg:p-8">
            <section className="space-y-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <h1 className="max-w-4xl font-serif text-5xl leading-none tracking-tight text-foreground sm:text-6xl">
                    {workspace?.title ?? "ClinRAG Retrieval Workspace"}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary">
                    <span className="inline-flex items-center gap-1.5">
                      <Stethoscope className="h-4 w-4" />
                      {workspace?.organization ?? "ClinRAG Berlin Pilot"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Activity className="h-4 w-4" />
                      {workspace?.subtitle ?? "Source-grounded clinical review"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <UsersRound className="h-4 w-4" />
                      Owner: {workspace?.owner ?? "Dr. Saif Clinical AI"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  <Badge variant="success">{workspace?.status ?? "Active"}</Badge>
                  <Badge variant="warning">{workspace?.riskLevel ?? "Moderate"}</Badge>
                  <Badge variant="secondary">Citations On</Badge>
                  <Button variant="outline" size="icon" aria-label="Schedule sync">
                    <CalendarDays className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as "overview" | "sessions" | "documents")}
                className="w-full"
              >
                <TabsList className="grid h-auto w-full max-w-[560px] grid-cols-3">
                  {tabItems.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {workspace?.metrics.map((metric) => (
                      <Card key={metric.label} className="rounded-[24px] border-border/60 bg-background/70 shadow-none">
                        <CardContent className="space-y-2 p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {metric.label}
                          </p>
                          <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
                          <p className="text-sm text-muted-foreground">{metric.detail}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                    <section className="space-y-8 border-t border-border/80 pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-foreground">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <h2 className="font-serif text-3xl font-semibold">Description</h2>
                        </div>
                        <p className="max-w-3xl text-lg leading-8 text-slate-600">{workspace?.description}</p>
                      </div>

                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-foreground">
                            <CalendarDays className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-serif text-2xl font-semibold">Details</h3>
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Created</p>
                          <p className="text-2xl text-slate-700">{workspace?.createdAt}</p>
                        </div>
                        <div className="space-y-2 self-end">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Updated</p>
                          <p className="text-2xl text-slate-700">{workspace?.updatedAt}</p>
                        </div>
                        <div className="space-y-2 self-end">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Query volume</p>
                          <p className="text-2xl text-slate-700">{workspace?.queryVolume}</p>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-6 border-t border-border/80 pt-6 xl:border-l xl:pl-6">
                      <div className="flex items-center gap-2 text-foreground">
                        <UsersRound className="h-5 w-5 text-muted-foreground" />
                        <h2 className="font-serif text-3xl font-semibold">Operators & Assignment</h2>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">RAG Lead</p>
                          <p className="mt-2 text-xl text-primary">{workspace?.assistant.lead}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">ML Engineer</p>
                          <p className="mt-2 text-xl text-primary">{workspace?.assistant.mlEngineer}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Clinical Expert</p>
                          <p className="mt-2 text-xl text-primary">{workspace?.assistant.domainExpert}</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </TabsContent>

                <TabsContent value="sessions">
                  <Card className="rounded-[28px] border-border/60 bg-background/70 shadow-none">
                    <CardContent className="p-6 text-sm text-muted-foreground">
                      Session analytics can live here next: per-prompt traces, reviewer notes, and latency breakdowns.
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <Card className="rounded-[28px] border-border/60 bg-background/70 shadow-none">
                    <CardContent className="p-6 text-sm text-muted-foreground">
                      Document management can live here next: uploads, ingestion state, and chunk previews.
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            <section className="space-y-5 rounded-[30px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(240,247,252,0.86))] p-5 surface-outline">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">RAG control room</p>
                  <h2 className="mt-1 font-serif text-3xl font-semibold">Query Composer</h2>
                </div>
                <Badge variant="outline" className="gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  PHI Safe
                </Badge>
              </div>

              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="question">
                    Clinical question
                  </label>
                  <Textarea
                    id="question"
                    placeholder="Ask a grounded question about the patient, guidelines, or operational workflow."
                    {...form.register("question")}
                  />
                  {form.formState.errors.question ? (
                    <p className="text-sm text-rose-500">{form.formState.errors.question.message}</p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="collectionId">
                      Collection
                    </label>
                    <Select id="collectionId" {...form.register("collectionId")}>
                      <option value="">Select a collection</option>
                      {(workspace?.collections ?? []).map((collection) => (
                        <option key={collection.id} value={collection.id}>
                          {collection.name}
                        </option>
                      ))}
                    </Select>
                    {form.formState.errors.collectionId ? (
                      <p className="text-sm text-rose-500">{form.formState.errors.collectionId.message}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="topK">
                      Top K
                    </label>
                    <Input id="topK" type="number" min={1} max={10} {...form.register("topK", { valueAsNumber: true })} />
                  </div>
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-slate-700">
                  <input className="h-4 w-4 accent-[hsl(var(--primary))]" type="checkbox" {...form.register("includeTimeline")} />
                  Blend the current session timeline into retrieval context
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <Button className="min-w-36" type="submit" disabled={chatMutation.isPending}>
                    <Sparkles className="h-4 w-4" />
                    {chatMutation.isPending ? "Retrieving..." : "Run Retrieval"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Reset
                  </Button>
                </div>
              </form>

              <Separator />

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Latest answer</p>
                <div className="rounded-[24px] border border-border/60 bg-white/80 p-4">
                  <p className="text-sm leading-7 text-slate-700">
                    {chatMutation.data?.answer.content ??
                      "Ask a question to preview a grounded answer with citations, collection metadata, and retrieved evidence."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
