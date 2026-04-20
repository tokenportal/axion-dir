import { supabase } from "@/lib/supabase";
import LandingPage from "@/components/LandingPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await supabase
    .from("landing_pages")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from("landing_pages")
    .select("page_title, meta_description, service_name, subheadline")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Service Not Found" };

  return {
    title: data.page_title ?? data.service_name,
    description: data.meta_description ?? data.subheadline,
    openGraph: {
      title: data.page_title ?? data.service_name,
      description: data.meta_description ?? data.subheadline,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const { data: page } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!page) notFound();

  return <LandingPage page={page} />;
}
