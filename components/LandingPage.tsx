import type { LandingPage as LandingPageType } from "@/lib/supabase";
import Nav from "@/components/Nav";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ExternalLink,
  Star,
} from "lucide-react";

type Props = {
  page: LandingPageType;
  calendlyUrl: string;
};

export default function LandingPage({ page, calendlyUrl }: Props) {
  const {
    service_name,
    headline,
    subheadline,
    tier,
    market_type,
    target_audience,
    problem_statement,
    pain_points,
    solution_statement,
    feature_bullets,
    authority_quotes,
    authority_stats,
    expert_videos,
    methodology_refs,
    publication_logos,
    process_steps,
    pricing_tiers,
    pricing_note,
    faq_items,
    lead_magnet_title,
    lead_magnet_desc,
    final_cta_headline,
    final_cta_subtext,
    source_url,
  } = page;

  const isHot = tier === "hot";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Nav />

      {/* ── HERO ────────────────���────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 px-4 overflow-hidden aztec-bg"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        {/* Aztec decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 300 500" className="absolute right-0 top-0 h-full opacity-[0.06]" aria-hidden="true">
            <polygon points="150,10 290,150 290,350 150,490 10,350 10,150" fill="none" stroke="#D4AF37" strokeWidth="2" />
            <polygon points="150,40 260,150 260,350 150,460 40,350 40,150" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <polygon points="150,70 230,150 230,350 150,430 70,350 70,150" fill="none" stroke="#C1440E" strokeWidth="1" />
            <line x1="150" y1="10" x2="150" y2="490" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="10" y1="250" x2="290" y2="250" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: "#8B7355" }}>
            <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <span>/</span>
            <a href="/#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
            <span>/</span>
            <span style={{ color: "#1A1A2E" }}>{service_name}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {isHot && (
              <Badge style={{ backgroundColor: "#C1440E", color: "#fff", border: "none" }}>
                High Demand
              </Badge>
            )}
            <Badge style={{ backgroundColor: "rgba(45,106,79,0.1)", color: "#2D6A4F", border: "1px solid rgba(45,106,79,0.3)" }}>
              {market_type ?? "B2B"}
            </Badge>
            {target_audience && (
              <Badge style={{ backgroundColor: "rgba(212,175,55,0.12)", color: "#8B7355", border: "1px solid rgba(212,175,55,0.3)" }}>
                {target_audience}
              </Badge>
            )}
          </div>

          <ScrollFadeIn>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}
            >
              {headline ?? service_name}
            </h1>
          </ScrollFadeIn>

          <ScrollFadeIn delay={100}>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl" style={{ color: "#8B7355" }}>
              {subheadline}
            </p>
          </ScrollFadeIn>

          <ScrollFadeIn delay={200}>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#booking"
                className="btn-gold inline-flex items-center rounded-full px-8 py-4 font-bold text-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
              >
                Book a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <div className="flex items-center gap-2 text-sm" style={{ color: "#8B7355" }}>
                <CheckCircle2 className="h-4 w-4" style={{ color: "#2D6A4F" }} />
                No commitment. 15 minutes.
              </div>
            </div>
          </ScrollFadeIn>

          {/* Trust signals under CTA */}
          <ScrollFadeIn delay={300}>
            <div className="mt-8 flex flex-wrap gap-5">
              {[
                "Money-back guarantee",
                "Founder-led delivery",
                "Transparent pricing",
              ].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm" style={{ color: "#8B7355" }}>
                  <Star className="h-3.5 w-3.5" style={{ color: "#D4AF37" }} fill="#D4AF37" />
                  {t}
                </div>
              ))}
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── AUTHORITY STATS BAR ───────────────────���──────────── */}
      {authority_stats?.length > 0 && (
        <section style={{ backgroundColor: "#1A1A2E" }} className="aztec-bg-navy">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className={`grid grid-cols-1 gap-0 divide-y md:divide-y-0 md:divide-x divide-[rgba(212,175,55,0.2)] md:grid-cols-${Math.min(authority_stats.length, 3)}`}>
              {authority_stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-center px-6 py-4">
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm mb-1" style={{ color: "rgba(245,240,232,0.7)" }}>
                    {stat.label}
                  </div>
                  {stat.source_name && (
                    <a
                      href={stat.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1"
                      style={{ color: "rgba(245,240,232,0.35)" }}
                    >
                      {stat.source_name} <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROBLEM SECTION ──────────────────────────────────── */}
      {(problem_statement || pain_points?.length > 0) && (
        <section className="py-20 px-4" style={{ backgroundColor: "#FFF8F0" }}>
          <div className="max-w-5xl mx-auto">
            <ScrollFadeIn>
              <span className="block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C1440E" }}>
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                Does this sound familiar?
              </h2>
              {problem_statement && (
                <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: "#8B7355" }}>
                  {problem_statement}
                </p>
              )}
            </ScrollFadeIn>

            {pain_points?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pain_points.map((point, i) => (
                  <ScrollFadeIn key={i} delay={i * 80}>
                    <div
                      className="rounded-2xl p-5 flex gap-4"
                      style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(193,68,14,0.15)", borderLeft: "3px solid #C1440E" }}
                    >
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#C1440E" }} />
                      <div>
                        <p className="font-semibold text-sm mb-1" style={{ color: "#1A1A2E" }}>{point.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#8B7355" }}>{point.description}</p>
                      </div>
                    </div>
                  </ScrollFadeIn>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── AUTHORITY QUOTE ──────────────────────────────────── */}
      {authority_quotes?.length > 0 && (
        <section className="py-16 px-4 aztec-bg" style={{ backgroundColor: "#F5F0E8" }}>
          <div className="max-w-3xl mx-auto text-center">
            <ScrollFadeIn>
              <div className="text-5xl mb-4" style={{ color: "#D4AF37", fontFamily: "var(--font-playfair)", lineHeight: 1 }}>&ldquo;</div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                {authority_quotes[0].quote}
              </p>
              <a
                href={authority_quotes[0].source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-wider hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1"
                style={{ color: "#8B7355" }}
              >
                — {authority_quotes[0].source_name}, {authority_quotes[0].source_publication}
                <ExternalLink className="h-3 w-3" />
              </a>
            </ScrollFadeIn>
          </div>
        </section>
      )}

      {/* ── SOLUTION SECTION ────────────────────────────────��── */}
      {(solution_statement || feature_bullets?.length > 0) && (
        <section className="py-20 px-4" style={{ backgroundColor: "#FFF8F0" }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              <ScrollFadeIn>
                <span className="block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#2D6A4F" }}>
                  The Solution
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                  {service_name}
                </h2>
                {solution_statement && (
                  <p className="text-lg leading-relaxed mb-8" style={{ color: "#8B7355" }}>
                    {solution_statement}
                  </p>
                )}
                <a
                  href="#booking"
                  className="btn-gold inline-flex items-center rounded-full px-7 py-3 font-semibold text-base transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </ScrollFadeIn>

              {feature_bullets?.length > 0 && (
                <ScrollFadeIn delay={120}>
                  <ul className="space-y-4">
                    {feature_bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex gap-4 p-4 rounded-xl"
                        style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(212,175,55,0.2)" }}
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#2D6A4F" }} />
                        <div>
                          <p className="font-semibold text-sm mb-0.5" style={{ color: "#1A1A2E" }}>{bullet.title}</p>
                          <p className="text-sm leading-relaxed" style={{ color: "#8B7355" }}>{bullet.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollFadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      {process_steps?.length > 0 && (
        <section className="py-20 px-4 aztec-bg" style={{ backgroundColor: "#F5F0E8" }}>
          <div className="max-w-5xl mx-auto">
            <ScrollFadeIn>
              <span className="block text-xs font-semibold tracking-widest uppercase mb-4 text-center" style={{ color: "#8B7355" }}>
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-14" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                How it works
              </h2>
            </ScrollFadeIn>

            <div className="space-y-6">
              {process_steps.map((step, i) => (
                <ScrollFadeIn key={i} delay={i * 100}>
                  <div
                    className="flex gap-6 p-6 rounded-2xl"
                    style={{ backgroundColor: "#FFF8F0", border: "1px solid rgba(212,175,55,0.2)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center font-bold text-lg"
                      style={{ backgroundColor: "#1A1A2E", color: "#D4AF37", fontFamily: "var(--font-playfair)" }}
                    >
                      {step.step_number ?? i + 1}
                    </div>
                    <div className="pt-1">
                      <h3 className="font-bold text-lg mb-1" style={{ color: "#1A1A2E", fontFamily: "var(--font-playfair)" }}>
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#8B7355" }}>{step.description}</p>
                    </div>
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXPERT VIDEO ─────────────────────────────────────── */}
      {expert_videos?.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: "#FFF8F0" }}>
          <div className="max-w-3xl mx-auto">
            <ScrollFadeIn>
              <span className="block text-xs font-semibold tracking-widest uppercase mb-3 text-center" style={{ color: "#8B7355" }}>
                Expert Perspective
              </span>
              <h3 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                Here&apos;s {expert_videos[0].expert_name} on why this matters:
              </h3>
              <p className="text-sm text-center mb-6" style={{ color: "#8B7355" }}>
                {expert_videos[0].expert_credential}
              </p>
              <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(212,175,55,0.3)" }}>
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${expert_videos[0].video_id}`}
                    title={expert_videos[0].title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </section>
      )}

      {/* ── METHODOLOGY ───────────────────────────────��──────── */}
      {methodology_refs?.length > 0 && (
        <section className="py-14 px-4" style={{ backgroundColor: "#F5F0E8", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
          <div className="max-w-5xl mx-auto">
            <ScrollFadeIn>
              <p className="text-xs font-semibold tracking-widest uppercase text-center mb-6" style={{ color: "#8B7355" }}>
                Our methodology is built on proven frameworks
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {methodology_refs.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full text-sm font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
                    style={{ border: "1px solid rgba(212,175,55,0.3)", color: "#8B7355" }}
                  >
                    {ref.name} <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </ScrollFadeIn>
          </div>
        </section>
      )}

      {/* ── PRICING ──────────────────────────────────────────── */}
      {pricing_tiers?.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: "#FFF8F0" }}>
          <div className="max-w-5xl mx-auto">
            <ScrollFadeIn>
              <span className="block text-xs font-semibold tracking-widest uppercase mb-4 text-center" style={{ color: "#8B7355" }}>
                Transparent Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                Simple, clear pricing
              </h2>
              {pricing_note && (
                <p className="text-center text-sm mb-12" style={{ color: "#8B7355" }}>{pricing_note}</p>
              )}
            </ScrollFadeIn>

            <div className={`grid grid-cols-1 gap-6 ${pricing_tiers.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {pricing_tiers.map((tier, i) => {
                const isMiddle = pricing_tiers.length === 3 && i === 1;
                return (
                  <ScrollFadeIn key={i} delay={i * 100}>
                    <div
                      className={`rounded-2xl p-8 flex flex-col h-full relative ${isMiddle ? "shadow-xl" : ""}`}
                      style={{
                        backgroundColor: isMiddle ? "#1A1A2E" : "#F5F0E8",
                        border: isMiddle ? "2px solid #D4AF37" : "1px solid rgba(212,175,55,0.25)",
                      }}
                    >
                      {isMiddle && (
                        <div
                          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                          style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
                        >
                          Most Popular
                        </div>
                      )}
                      <div className="mb-6">
                        <p className="font-bold text-lg mb-1" style={{ color: isMiddle ? "#D4AF37" : "#1A1A2E", fontFamily: "var(--font-playfair)" }}>
                          {tier.name}
                        </p>
                        <p className="text-3xl font-bold" style={{ color: isMiddle ? "#F5F0E8" : "#1A1A2E", fontFamily: "var(--font-playfair)" }}>
                          {tier.price}
                        </p>
                      </div>
                      <ul className="space-y-3 flex-1 mb-8">
                        {tier.features?.map((f: string, j: number) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: isMiddle ? "#D4AF37" : "#2D6A4F" }} />
                            <span style={{ color: isMiddle ? "rgba(245,240,232,0.8)" : "#8B7355" }}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#booking"
                        className={`w-full text-center rounded-full py-3 font-semibold text-sm transition-opacity hover:opacity-90 ${isMiddle ? "btn-gold" : ""}`}
                        style={
                          isMiddle
                            ? { backgroundColor: "#D4AF37", color: "#1A1A2E", display: "block" }
                            : { display: "block", border: "2px solid #D4AF37", color: "#1A1A2E" }
                        }
                      >
                        {tier.cta ?? "Get Started"}
                      </a>
                    </div>
                  </ScrollFadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── BOOKING SECTION ──────────────────────────────────── */}
      <section id="booking" className="py-20 px-4 aztec-bg-navy" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-5xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: "rgba(212,175,55,0.15)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)" }}>
                Zero Risk. Zero Pressure.
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}>
                Book your free consultation
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.7)" }}>
                15 minutes. We&apos;ll diagnose exactly what&apos;s holding you back and tell you whether we can help — no pitch, no pressure.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                {["Pick a time that works for you", "No credit card required", "Cancel or reschedule anytime"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>
                    <CheckCircle2 className="h-4 w-4" style={{ color: "#D4AF37" }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn delay={100}>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
              <CalendlyEmbed url={calendlyUrl} />
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      {faq_items?.length > 0 && (
        <section className="py-20 px-4" style={{ backgroundColor: "#F5F0E8" }}>
          <div className="max-w-3xl mx-auto">
            <ScrollFadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                Frequently asked questions
              </h2>
            </ScrollFadeIn>
            <div className="space-y-3">
              {faq_items.map((item, i) => (
                <ScrollFadeIn key={i} delay={i * 50}>
                  <details
                    className="group rounded-xl overflow-hidden"
                    style={{ border: "1px solid rgba(212,175,55,0.25)", backgroundColor: "#FFF8F0" }}
                  >
                    <summary
                      className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-sm list-none"
                      style={{ color: "#1A1A2E" }}
                    >
                      {item.question}
                      <ChevronDown
                        className="h-4 w-4 shrink-0 ml-4 transition-transform duration-200 group-open:rotate-180"
                        style={{ color: "#D4AF37" }}
                      />
                    </summary>
                    <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#8B7355", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
                      <div className="pt-4">{item.answer}</div>
                    </div>
                  </details>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LEAD MAGNET ──────────────────────────────────────── */}
      {lead_magnet_title && (
        <section className="py-14 px-4" style={{ backgroundColor: "#FFF8F0", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
          <div className="max-w-3xl mx-auto">
            <ScrollFadeIn>
              <div
                className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6"
                style={{ backgroundColor: "#F5F0E8", border: "2px dashed rgba(212,175,55,0.4)" }}
              >
                <div className="flex-1">
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#D4AF37" }}>
                    Free Resource
                  </p>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                    {lead_magnet_title}
                  </h3>
                  {lead_magnet_desc && (
                    <p className="text-sm leading-relaxed" style={{ color: "#8B7355" }}>{lead_magnet_desc}</p>
                  )}
                </div>
                <a
                  href="#booking"
                  className="shrink-0 inline-flex items-center rounded-full px-6 py-3 font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
                >
                  Get it free <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </ScrollFadeIn>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}>
              {final_cta_headline ?? `Ready to get started with ${service_name}?`}
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(245,240,232,0.7)" }}>
              {final_cta_subtext ?? "Book a free 15-minute consultation. No pressure, no pitch — just clarity."}
            </p>
            <a
              href="#booking"
              className="btn-gold inline-flex items-center rounded-full px-10 py-4 text-lg font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
            >
              Book Your Free Call <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <p className="mt-4 text-sm" style={{ color: "rgba(245,240,232,0.35)" }}>
              Free consultation · No commitment · Cancel anytime
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── FOOTER ──────────────────���────────────────────────── */}
      <footer className="py-10 px-4" style={{ backgroundColor: "#0F0F1E", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}>
            Axion Directory
          </div>
          <div className="flex gap-6 text-sm" style={{ color: "rgba(245,240,232,0.4)" }}>
            <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
            <a href="/#services" className="hover:text-[#D4AF37] transition-colors">All Services</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy</a>
          </div>
          {source_url && (
            <a
              href={source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1"
              style={{ color: "rgba(245,240,232,0.2)" }}
            >
              Market research source <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </footer>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service_name,
            description: subheadline,
            provider: {
              "@type": "Organization",
              name: "Axion Directory",
            },
            areaServed: "US",
            audience: { "@type": "Audience", audienceType: target_audience },
          }),
        }}
      />
    </div>
  );
}
