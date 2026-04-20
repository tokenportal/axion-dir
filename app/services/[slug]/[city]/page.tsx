import { supabase } from "@/lib/supabase";
import LandingPage from "@/components/LandingPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CITIES, getCityDisplay } from "@/lib/cities";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string; city: string }>;
};

export async function generateStaticParams() {
  const { data } = await supabase
    .from("landing_pages")
    .select("slug")
    .eq("status", "published");

  const slugs = (data ?? []).map((row) => row.slug);
  return slugs.flatMap((slug) =>
    CITIES.map((city) => ({ slug, city: city.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city } = await params;
  const cityDisplay = getCityDisplay(city);
  if (!cityDisplay) return { title: "Not Found" };

  const { data } = await supabase
    .from("landing_pages")
    .select("service_name, subheadline, primary_keyword")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Service Not Found" };

  const title = `${data.service_name} in ${cityDisplay} | Axion Directory`;
  const description = `Looking for ${data.primary_keyword} in ${cityDisplay}? ${data.subheadline}`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function CityServicePage({ params }: Props) {
  const { slug, city } = await params;
  const cityDisplay = getCityDisplay(city);
  if (!cityDisplay) notFound();

  const { data: page } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) notFound();

  return <LandingPage page={page} city={cityDisplay} />;
}
