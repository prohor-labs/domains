import { NextResponse } from "next/server";
import { getTldPricingAction } from "@/lib/actions/domains";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tld = searchParams.get("tld") || undefined;
    const data = await getTldPricingAction(tld);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to retrieve TLD pricing" }, { status: 500 });
  }
}
