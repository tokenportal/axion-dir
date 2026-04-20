"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const href = (hash: string) => (isHome ? hash : `/${hash}`);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: "#1A1A2E", borderBottom: "1px solid rgba(212,175,55,0.3)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#D4AF37" }}
            >
              Axion
            </span>
            <span className="text-sm font-medium" style={{ color: "#F5F0E8", opacity: 0.8 }}>
              Directory
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Directory", hash: "#services" },
              { label: "How It Works", hash: "#how-it-works" },
              { label: "About", hash: "#about" },
            ].map((item) => (
              <Link
                key={item.hash}
                href={href(item.hash)}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#D4AF37]"
                style={{ color: "rgba(245,240,232,0.8)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href={href("#how-it-works")}
              className="btn-gold inline-flex items-center font-semibold text-sm px-5 py-2 rounded-full transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
            >
              Book a Free Call
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#F5F0E8] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 space-y-3"
          style={{ backgroundColor: "#1A1A2E" }}
        >
          {[
            { label: "Directory", hash: "#services" },
            { label: "How It Works", hash: "#how-it-works" },
            { label: "About", hash: "#about" },
          ].map((item) => (
            <Link
              key={item.hash}
              href={href(item.hash)}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium py-2"
              style={{ color: "rgba(245,240,232,0.8)" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={href("#how-it-works")}
            onClick={() => setMenuOpen(false)}
            className="btn-gold w-full inline-flex justify-center items-center font-semibold text-sm rounded-full mt-2 py-2 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#D4AF37", color: "#1A1A2E" }}
          >
            Book a Free Call
          </a>
        </div>
      )}
    </header>
  );
}
