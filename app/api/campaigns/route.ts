import { NextResponse } from "next/server";
import { mockCampaigns } from "@/data/mockCampaigns";

export async function GET() {
  return NextResponse.json(mockCampaigns, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

