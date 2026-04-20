import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://axion.directory";

  const { data: services } = await supabase
    .from("landing_pages")
    .select("slug, service_name, headline, subheadline, problem_statement, solution_statement, target_audience, market_type, tier, primary_keyword, faq_items")
    .eq("status", "published")
    .order("hot_demand_score", { ascending: false });

  const sections = (services ?? []).map((s) => {
    const faqs = (s.faq_items ?? [])
      .slice(0, 5)
      .map((f: { question: string; answer: string }) => `  Q: ${f.question}\n  A: ${f.answer}`)
      .join("\n\n");

    return `---

## ${s.service_name}

URL: ${baseUrl}/services/${s.slug}
Market: ${s.market_type ?? "B2B"} | Audience: ${s.target_audience ?? "businesses"} | Demand: ${s.tier}
Primary keyword: ${s.primary_keyword}

**Headline:** ${s.headline}

**Value proposition:** ${s.subheadline}

**Problem:** ${s.problem_statement ?? ""}

**Solution:** ${s.solution_statement ?? ""}

${faqs ? `**FAQs:**\n${faqs}` : ""}`;
  }).join("\n\n");

  const text = `# Axion Directory — Full Content

> Axion Directory offers specialized, research-backed business services for founders and operators. Services range from AI SEO optimization to CRM data cleanup, QuickBooks migration, LinkedIn ghostwriting, and more. Every service is validated against real market demand before launch.

Base URL: ${baseUrl}
Services count: ${(services ?? []).length}

${sections}
`;

  return new NextResponse(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
