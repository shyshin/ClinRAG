import { NextResponse } from "next/server";

import { mockWorkspace } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockWorkspace);
}
