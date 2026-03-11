import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AnimationObserver } from "@/components/ui/AnimationObserver";
import { ParticleBackground } from "@/components/canvas/ParticleBackground";
import { LogoWatermark } from "@/components/ui/LogoWatermark";
import { SearchModalRoot } from "@/components/search/SearchModalRoot";
import { LiveBanner } from "@/components/ctftime/LiveBanner";
import { currentLiveCtf } from "@/data/live";

export const metadata: Metadata = {
  title: "emsixploit — Cyber Security Club",
  description: "We secure. We hack. We grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ParticleBackground />
        <div className="fixed inset-0 z-0 flex items-center justify-center">
          <LogoWatermark />
        </div>
        <Navbar />
        {currentLiveCtf && (
          <div className="fixed top-16 left-0 right-0 z-[9] mx-auto max-w-[1200px] px-4 pt-2 sm:px-6 md:px-8">
            <LiveBanner />
          </div>
        )}
        <AnimationObserver />
        <main className="relative z-10 min-h-screen pt-24 pb-4">
          {children}
        </main>
        <Footer />
        <SearchModalRoot />
      </body>
    </html>
  );
}
