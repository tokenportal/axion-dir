"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm({ serviceName }: { serviceName: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
      subject: `New inquiry: ${serviceName}`,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      service: serviceName,
      botcheck: (form.elements.namedItem("botcheck") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(json.message ?? "Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl"
        style={{ backgroundColor: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)" }}>
        <CheckCircle2 className="mb-4" size={48} style={{ color: "#D4AF37" }} />
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}>
          We&apos;ll be in touch shortly
        </h3>
        <p className="text-sm" style={{ color: "rgba(245,240,232,0.65)" }}>
          Expect a reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-8 space-y-5"
      style={{ backgroundColor: "rgba(255,248,240,0.05)", border: "1px solid rgba(212,175,55,0.2)" }}>

      {/* Honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(245,240,232,0.5)" }}>
            Your name *
          </label>
          <input
            name="name"
            required
            placeholder="Jane Smith"
            className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "#F5F0E8",
              "--tw-ring-color": "#D4AF37",
            } as React.CSSProperties}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(245,240,232,0.5)" }}>
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(212,175,55,0.25)",
              color: "#F5F0E8",
              "--tw-ring-color": "#D4AF37",
            } as React.CSSProperties}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(245,240,232,0.5)" }}>
          Company
        </label>
        <input
          name="company"
          placeholder="Acme Inc."
          className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-2"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(212,175,55,0.25)",
            color: "#F5F0E8",
            "--tw-ring-color": "#D4AF37",
          } as React.CSSProperties}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(245,240,232,0.5)" }}>
          What do you need help with? *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Brief description of your situation and what you're looking to accomplish..."
          className="w-full rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 resize-none"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(212,175,55,0.25)",
            color: "#F5F0E8",
            "--tw-ring-color": "#D4AF37",
          } as React.CSSProperties}
        />
      </div>

      {status === "error" && (
        <p className="text-sm" style={{ color: "#C1440E" }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gold w-full flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-full transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        {status === "loading" ? "Sending…" : "Send my inquiry →"}
      </button>

      <p className="text-xs text-center" style={{ color: "rgba(245,240,232,0.35)" }}>
        No spam. We reply within one business day.
      </p>
    </form>
  );
}
