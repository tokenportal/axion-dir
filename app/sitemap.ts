import { supabase } from "@/lib/supabase";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://axion.directory";

  const { data } = await supabase
    .from("landing_pages")
    .select("slug, updated_at")
    .eq("status", "published");

  const servicePages = (data ?? []).map((page) => ({
    url: `${baseUrl}/services/${page.slug}`,
    lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...servicePages,
  ];
}
