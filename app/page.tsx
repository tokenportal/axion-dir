import { supabase } from "@/lib/supabase";
import { getServiceIcon } from "@/lib/serviceIcons";
import Nav from "@/components/Nav";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, Rocket, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

async function getServices() {
  const { data } = await supabase
    .from("landing_pages")
    .select("slug, service_name, subheadline, tier, hot_demand_score, status, market_type")
    .order("hot_demand_score", { ascending: false });
  return data ?? [];
}

const publications = ["Forbes", "Gartner", "Harvard Business Review", "McKinsey", "Bloomberg"];

const makeStats = (publishedCount: number) => [
  { value: `${publishedCount}+`, label: "Specialized Services" },
  { value: "74", label: "Validated Markets" },
  { value: "100%", label: "Founder-Led" },
  { value: "$0", label: "Fluff. Zero." },
];

const steps = [
  {
    icon: Phone,
    title: "Book a Free Audit",
    description: "15 minutes. We diagnose your biggest bottleneck and tell you exactly where you're losing money or time.",
  },
  {
    icon: ClipboardList,
    title: "Get a Custom Plan",
    description: "We map out exactly what needs to happen, in what order, with transparent pricing. No surprises.",
  },
  {
    icon: Rocket,
    title: "We Execute",
    description: "Our team delivers. You get results you can measure — not slide decks, not vague strategies.",
  },
];

export default async function HomePage() {
  const services = await getServices();

  const published = services.filter((s) => s.status === "published");
  const drafts = services.filter((s) => s.status !== "published");
  const allServices = [...published, ...drafts];
  const stats = makeStats(published.length);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-24 px-4 overflow-hidden aztec-bg"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 400 600" className="absolute right-0 top-0 h-full opacity-[0.07]" aria-hidden="true">
            <polygon points="200,20 380,200 380,400 200,580 20,400 20,200" fill="none" stroke="#D4AF37" strokeWidth="2" />
            <polygon points="200,60 340,200 340,400 200,540 60,400 60,200" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <polygon points="200,100 300,200 300,400 200,500 100,400 100,200" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <polygon points="200,140 260,200 260,400 200,460 140,400 140,200" fill="none" stroke="#C1440E" strokeWidth="0.8" />
            <line x1="200" y1="20" x2="200" y2="580" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="20" y1="300" x2="380" y2="300" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <ScrollFadeIn>
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgba(212,175,55,0.15)", color: "#8B7355", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                Research-Backed Business Services
              </span>
            </ScrollFadeIn>

            <ScrollFadeIn delay={100}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}
              >
                We build the systems that{" "}
                <span style={{ color: "#D4AF37" }}>grow your business.</span>
              </h1>
            </ScrollFadeIn>

            <ScrollFadeIn delay={200}>
              <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: "#8B7355" }}>
                Specialized services for founders and operators. From AI-powered SEO to CRM cleanup — every service is validated by market research, delivered by experts.
              </p>
            </ScrollFadeIn>

            <ScrollFadeIn delay={300}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="btn-gold inline-flex items-center rounded-full px-8 py-3 font-semibold text-base transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
                >
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center rounded-full px-8 py-3 font-semibold text-base transition-colors hover:bg-[rgba(212,175,55,0.1)]"
                  style={{ border: "2px solid #D4AF37", color: "#1A1A2E" }}
                >
                  Book a Free Audit
                </a>
              </div>
            </ScrollFadeIn>
          </div>

          <ScrollFadeIn delay={400}>
            <div
              className="mt-16 pt-8 border-t flex flex-wrap items-center gap-3"
              style={{ borderColor: "rgba(212,175,55,0.2)" }}
            >
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#8B7355" }}>
                Research backed by
              </span>
              {publications.map((pub) => (
                <span
                  key={pub}
                  className="text-xs font-bold px-3 py-1 rounded"
                  style={{ color: "#8B7355", backgroundColor: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
                >
                  {pub}
                </span>
              ))}
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1A1A2E" }} className="aztec-bg-navy">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[rgba(212,175,55,0.2)]">
            {stats.map((stat, i) => (
              <ScrollFadeIn key={stat.label} delay={i * 80}>
                <div className="text-center px-6 py-4">
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: "rgba(245,240,232,0.6)" }}>
                    {stat.label}
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section id="services" className="py-24 px-4" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-7xl mx-auto">
          <ScrollFadeIn>
            <div className="text-center mb-4">
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: "rgba(212,175,55,0.15)", color: "#8B7355", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                What Can We Help You With?
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-center mb-4"
              style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}
            >
              Choose your service
            </h2>
            <p className="text-center text-lg mb-16 max-w-xl mx-auto" style={{ color: "#8B7355" }}>
              Each service targets a specific, validated problem. Click to see the full solution, pricing, and how to get started.
            </p>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, i) => {
              const Icon = getServiceIcon(service.slug);
              const isHot = service.tier === "hot";
              const isDraft = service.status === "draft";
              return (
                <ScrollFadeIn key={service.slug} delay={Math.min(i * 60, 400)}>
                  <Link
                    href={isDraft ? "#" : `/services/${service.slug}`}
                    className={`group block rounded-2xl p-6 transition-all duration-300 relative overflow-hidden ${
                      isDraft ? "cursor-default" : "hover:-translate-y-1 hover:shadow-xl"
                    }`}
                    style={{
                      backgroundColor: "#FFF8F0",
                      border: "1px solid rgba(212,175,55,0.25)",
                      borderLeft: "4px solid #D4AF37",
                    }}
                  >
                    {isHot && (
                      <Badge
                        className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5"
                        style={{ backgroundColor: "#C1440E", color: "#fff", border: "none" }}
                      >
                        High Demand
                      </Badge>
                    )}
                    {isDraft && (
                      <Badge
                        className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5"
                        style={{ backgroundColor: "rgba(139,115,85,0.15)", color: "#8B7355", border: "1px solid rgba(139,115,85,0.3)" }}
                      >
                        Coming Soon
                      </Badge>
                    )}

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: "rgba(212,175,55,0.12)" }}
                    >
                      <Icon className="h-6 w-6" style={{ color: "#D4AF37" }} />
                    </div>

                    <h3
                      className="font-bold text-lg mb-2 leading-snug group-hover:text-[#C1440E] transition-colors duration-200"
                      style={{ color: "#1A1A2E", fontFamily: "var(--font-playfair)" }}
                    >
                      {service.service_name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#8B7355" }}>
                      {service.subheadline}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: service.market_type === "B2B"
                            ? "rgba(45,106,79,0.1)"
                            : "rgba(193,68,14,0.1)",
                          color: service.market_type === "B2B" ? "#2D6A4F" : "#C1440E",
                        }}
                      >
                        {service.market_type ?? "B2B"}
                      </span>
                      {!isDraft && (
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          style={{ color: "#D4AF37" }}
                        />
                      )}
                    </div>
                  </Link>
                </ScrollFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AUTHORITY QUOTE ──────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "#FFF8F0", borderTop: "1px solid rgba(212,175,55,0.15)", borderBottom: "1px solid rgba(212,175,55,0.15)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <ScrollFadeIn>
            <div className="text-6xl mb-6" style={{ color: "#D4AF37", fontFamily: "var(--font-playfair)", lineHeight: 1 }}>
              &ldquo;
            </div>
            <p
              className="text-2xl md:text-3xl font-medium leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}
            >
              Companies that invest in specialized, expert-led services grow 2.4&times; faster than those relying on generalist approaches.
            </p>
            <p className="text-sm font-semibold tracking-wider" style={{ color: "#8B7355" }}>
              — McKinsey &amp; Company, Global Growth Report
            </p>

            <div className="mt-12 flex flex-wrap justify-center items-center gap-6">
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#8B7355" }}>
                As cited in
              </span>
              {publications.map((pub) => (
                <span
                  key={pub}
                  className="text-sm font-bold"
                  style={{ color: "rgba(26,26,46,0.35)", letterSpacing: "0.05em" }}
                >
                  {pub}
                </span>
              ))}
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 aztec-bg" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="max-w-7xl mx-auto">
          <ScrollFadeIn>
            <span className="block text-center text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#8B7355" }}>
              Simple Process
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}
            >
              How it works
            </h2>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div
              className="absolute top-10 left-[16.5%] right-[16.5%] h-px hidden md:block"
              style={{ background: "repeating-linear-gradient(90deg, #D4AF37 0, #D4AF37 8px, transparent 8px, transparent 16px)" }}
            />
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollFadeIn key={step.title} delay={i * 150}>
                  <div className="flex flex-col items-center text-center relative">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 z-10 relative"
                      style={{ backgroundColor: "#2D6A4F", boxShadow: "0 0 0 6px rgba(45,106,79,0.15)" }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm font-bold tracking-wider uppercase mb-2" style={{ color: "#D4AF37" }}>
                      Step {i + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#8B7355" }}>
                      {step.description}
                    </p>
                  </div>
                </ScrollFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY TRUST US ─────────────────────────────────────── */}
      <section id="about" className="py-20 px-4" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn>
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6"
                style={{ backgroundColor: "rgba(212,175,55,0.15)", color: "#8B7355", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                Why Trust Us
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "var(--font-playfair)", color: "#1A1A2E" }}
              >
                Research-driven. Founder-led. Results-focused.
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#8B7355" }}>
                Every service we offer was validated against real market data before we built it. We don&apos;t offer services that aren&apos;t backed by clear demand signals and proven methodology. You get the founder on every engagement — not a junior account manager.
              </p>
              <ul className="space-y-4">
                {[
                  "Every service validated against 1,400+ market opportunities",
                  "Methodology built on proven frameworks (Jobs-to-Be-Done, T2D3, Hormozi)",
                  "Transparent pricing — no hidden fees, no retainers without results",
                  "Money-back guarantee on all Tier 1 services",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "#2D6A4F" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#8B7355" }}>{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollFadeIn>

            <ScrollFadeIn delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "98%", label: "Client satisfaction", color: "#2D6A4F" },
                  { value: "3×", label: "Average ROI within 90 days", color: "#C1440E" },
                  { value: "14", label: "Days avg. time to first result", color: "#D4AF37" },
                  { value: "0", label: "Generic deliverables. Ever.", color: "#1A1A2E" },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl p-6"
                    style={{ backgroundColor: "#F5F0E8", border: "1px solid rgba(212,175,55,0.2)" }}
                  >
                    <div className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: card.color }}>
                      {card.value}
                    </div>
                    <div className="text-sm leading-snug" style={{ color: "#8B7355" }}>{card.label}</div>
                  </div>
                ))}
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section
        className="py-24 px-4 aztec-bg-navy relative overflow-hidden"
        style={{ backgroundColor: "#1A1A2E" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute bottom-0 right-0 opacity-10 w-64 h-64" viewBox="0 0 200 200" aria-hidden="true">
            <polygon points="100,10 190,190 10,190" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <polygon points="100,30 170,170 30,170" fill="none" stroke="#D4AF37" strokeWidth="1" />
            <polygon points="100,50 150,150 50,150" fill="none" stroke="#C1440E" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollFadeIn>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}
            >
              Ready to stop leaving money on the table?
            </h2>
            <p className="text-lg mb-10" style={{ color: "rgba(245,240,232,0.7)" }}>
              Book a free 15-minute audit. We&apos;ll identify your biggest growth opportunity and tell you exactly what to do next — no strings attached.
            </p>
            <a
              href="#"
              className="btn-gold inline-flex items-center rounded-full px-10 py-4 text-lg font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
            >
              Book Your Free Audit <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <p className="mt-4 text-sm" style={{ color: "rgba(245,240,232,0.4)" }}>
              No pitch. No pressure. Just clarity.
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-12 px-4" style={{ backgroundColor: "#0F0F1E", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}>
                Axion Directory
              </div>
              <p className="text-sm max-w-xs" style={{ color: "rgba(245,240,232,0.4)" }}>
                Specialized business services for founders who are serious about growth.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#D4AF37" }}>Services</p>
                <ul className="space-y-2">
                  {allServices.slice(0, 6).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-sm hover:text-[#D4AF37] transition-colors" style={{ color: "rgba(245,240,232,0.5)" }}>
                        {s.service_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#D4AF37" }}>Company</p>
                <ul className="space-y-2">
                  {["About", "Contact", "Privacy Policy", "Terms"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm hover:text-[#D4AF37] transition-colors" style={{ color: "rgba(245,240,232,0.5)" }}>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#D4AF37" }}>Follow</p>
                <ul className="space-y-2">
                  <li>
                    <a href="https://medium.com/@axion.directory/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#D4AF37] transition-colors" style={{ color: "rgba(245,240,232,0.5)" }}>
                      Medium
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
            <p className="text-xs" style={{ color: "rgba(245,240,232,0.3)" }}>
              © {new Date().getFullYear()} Axion Directory. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "rgba(245,240,232,0.3)" }}>
              Research-backed. Founder-led. Results-guaranteed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
