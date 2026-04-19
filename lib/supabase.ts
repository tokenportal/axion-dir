import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type LandingPage = {
  id: string;
  slug: string;
  tier: string;
  hot_demand_score: number;
  status: string;
  service_name: string;
  headline: string;
  subheadline: string;
  hero_cta_text: string;
  primary_keyword: string;
  secondary_keywords: string[];
  search_intent: string;
  market_type: string;
  target_audience: string;
  page_title: string;
  meta_description: string;
  problem_statement: string;
  pain_points: { icon: string; title: string; description: string }[];
  solution_statement: string;
  feature_bullets: { icon: string; title: string; description: string }[];
  authority_quotes: { quote: string; source_name: string; source_publication: string; source_url: string; source_date: string }[];
  authority_stats: { value: string; label: string; source_name: string; source_url: string; source_year: string }[];
  expert_videos: { video_id: string; title: string; expert_name: string; expert_credential: string; youtube_url: string }[];
  methodology_refs: { name: string; description: string; source_name: string; source_url: string }[];
  publication_logos: { name: string; logo_url: string }[];
  process_steps: { step_number: number; title: string; description: string }[];
  pricing_tiers: { name: string; price: string; features: string[]; cta: string }[];
  pricing_note: string;
  faq_items: { question: string; answer: string }[];
  lead_magnet_title: string;
  lead_magnet_desc: string;
  final_cta_headline: string;
  final_cta_subtext: string;
  source_url: string;
  view_count: number;
  lead_count: number;
};
