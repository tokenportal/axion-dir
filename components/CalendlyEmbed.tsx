"use client";

import { useEffect } from "react";

export default function CalendlyEmbed({ url }: { url: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url={`${url}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=FFF8F0&text_color=1A1A2E&primary_color=D4AF37`}
      style={{ minWidth: 320, height: 700 }}
    />
  );
}
