import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "clinrag-frontend",
    checkedAt: new Date().toISOString()
  });
}
