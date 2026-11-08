
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "#destinations" },
      { label: "My Bookings", href: "#bookings" },
      { label: "My Profile", href: "#profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#help" },
      { label: "Terms Of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

const SOCIALS = [
  { label: "X (Twitter)", href: "https://x.com", icon: X },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        {/* Brand */}
        <div>
          <p className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">
            Wanderlast
          </p>

          <p className="mt-4 text-sm text-background/70">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Footer Columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div>
            <h3 className="font-mono text-xs tracking-widest text-background/80 uppercase">
              Newsletter
            </h3>

            <p className="mt-4 text-xs text-background/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form
              action="#"
              method="get"
              className="mt-4 flex max-w-xs items-center gap-2"
            >
              <Input
                type="email"
                name="email"
                required
                placeholder="Enter email"
                aria-label="Email address"
                className="border-background/20 bg-background/10 text-background placeholder:text-background/50"
              />

              <Button
                type="submit"
                size="icon"
                variant="ghost"
                aria-label="Subscribe"
                className="shrink-0 text-background hover:bg-background/10"
              >
                <ArrowUpRight />
              </Button>
            </form>
          </div>

          {/* Quick Links and Support */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-xs tracking-widest text-background/80 uppercase">
                {column.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-background"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Us */}
          <div>
            <h3 className="font-mono text-xs tracking-widest text-background/80 uppercase">
              Contact Us
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+17969011622"
                  className="text-sm text-background/70 transition-colors hover:text-background"
                >
                  796 901 1622
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@wanderland.com"
                  className="text-sm text-background/70 transition-colors hover:text-background"
                >
                  info@wanderland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-background/15 pt-6">
          <p className="text-xs text-background/60">
            © 2026 Wanderlast. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {SOCIALS.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon-sm"
                nativeButton={false}
                render={
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  />
                }
                className="text-background/70 hover:bg-background/10 hover:text-background"
              >
                <social.icon />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
