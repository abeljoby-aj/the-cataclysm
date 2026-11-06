import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Syne } from "next/font/google";
import { eventConfig } from "@/config/event";
import "./globals.css";

const display = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "THE CATACLYSM — OxCode × Multimedia Club",
  description:
    "THE CATACLYSM is an inter-college Capture the Flag competition by OxCode and Multimedia Club. 19–20 November 2026 at Navarang Auditorium, Naipunnya Institute of Management and Information Technology.",
  applicationName: eventConfig.name,
  openGraph: { title: "THE CATACLYSM", description: "A 16-hour inter-college CTF by OxCode × Multimedia Club.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#050706", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1681669726675187');
fbq('track', 'PageView');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <style>{`.letter{opacity:1!important;transform:none!important;filter:none!important}`}</style>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1681669726675187&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
