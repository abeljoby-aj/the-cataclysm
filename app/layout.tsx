import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Syne } from "next/font/google";
import { eventConfig } from "@/config/event";
import "./globals.css";

const display = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "THE CATACLYSM — OxCode",
  description:
    "THE CATACLYSM is an inter-college Capture the Flag competition by OxCode. 19–20 November 2026 at Navarang Auditorium, Naipunnya Institute of Management and Information Technology.",
  applicationName: eventConfig.name,
  openGraph: { title: "THE CATACLYSM", description: "A 16-hour inter-college CTF by OxCode.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#050706", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`.letter{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
