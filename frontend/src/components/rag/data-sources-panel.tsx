"use client";

import { CirclePlus, Database } from "lucide-react";

import { useWorkspaceQuery } from "@/hooks/use-rag-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DataSourcesPanel() {
  const workspaceQuery = useWorkspaceQuery();
  const dataSources = workspaceQuery.data?.dataSources ?? [];

  return (
    <Card className="rounded-[32px] border-white/70 bg-white/80">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-4xl">
            <Database className="h-7 w-7 text-muted-foreground" />
            Data Sources
          </CardTitle>
          <CardDescription>
            Manage the databases feeding retrieval. Sources can be either vector databases or graph databases.
          </CardDescription>
        </div>
        <Button className="min-w-32">
          <CirclePlus className="h-4 w-4" />
          Add Source
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {dataSources.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-border bg-background/60 px-6 py-16 text-center">
            <p className="font-serif text-3xl font-semibold text-foreground">No data sources present</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Add a source to connect either a vector database or a graph database to this workspace.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
