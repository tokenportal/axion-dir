import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://axion.directory";

  const { data: services } = await supabase
    .from("landing_pages")
    .select("slug, service_name, subheadline, tier, market_type")
    .eq("status", "published")
    .order("hot_demand_score", { ascending: false });

  const hot = (services ?? []).filter((s) => s.tier === "hot");
  const warm = (services ?? []).filter((s) => s.tier !== "hot");

  const text = `# Axion Directory

> Axion Directory is a specialized business services platform offering research-backed, founder-led services for growth-stage companies and entrepreneurs. Every service is validated against real market demand data before we offer it.

## Services

${(services ?? []).map((s) => `- [${s.service_name}](${baseUrl}/services/${s.slug}): ${s.subheadline}`).join("\n")}

## High Demand Services

${hot.map((s) => `- [${s.service_name}](${baseUrl}/services/${s.slug})`).join("\n")}

## Additional Services

${warm.map((s) => `- [${s.service_name}](${baseUrl}/services/${s.slug})`).join("\n")}

## Optional

- [Full content](${baseUrl}/llms-full.txt)
- [Sitemap](${baseUrl}/sitemap.xml)
`;

  return new NextResponse(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
