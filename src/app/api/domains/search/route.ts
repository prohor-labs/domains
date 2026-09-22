import { NextResponse } from "next/server";
import { searchDomainsAction } from "@/lib/actions/domains";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = typeof body.query === "string" ? body.query : "";
    const tlds = Array.isArray(body.tlds) ? body.tlds : undefined;

    if (!query) {
      return NextResponse.json({ query: "", results: [] });
    }

    const data = await searchDomainsAction(query, tlds);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to process domain search" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const tldsParam = searchParams.get("tlds");
    const tlds = tldsParam ? tldsParam.split(",") : undefined;

    if (!query) {
      return NextResponse.json({ query: "", results: [] });
    }

    const data = await searchDomainsAction(query, tlds);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to process domain search" }, { status: 500 });
  }
}
