import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
});

const instrumentSerifItalic = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument-italic",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Sahla Thasni — Full Stack Developer",
  description: "Sahla Thasni is a full stack developer in Dubai building thoughtful digital experiences with React, Next.js, Django REST Framework and PostgreSQL.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSerifItalic.variable} ${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="manual-scroll-restoration" strategy="beforeInteractive">
          {`if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";`}
        </Script>
        {children}
      </body>
    </html>
  );
}
