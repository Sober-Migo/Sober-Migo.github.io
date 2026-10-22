import { About } from "@/components/site/About";
import { BackToTopButton } from "@/components/site/BackToTopButton";
import { Contact } from "@/components/site/Contact";
import { ContactModal } from "@/components/site/ContactModal";
import { CosmicBackground } from "@/components/site/CosmicBackground";
import { Experience } from "@/components/site/Experience";
import { FloatingContactButton } from "@/components/site/FloatingContactButton";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { ScrollProgressBar } from "@/components/site/ScrollProgressBar";
import { Skills } from "@/components/site/Skills";
import { SocialLinks } from "@/components/site/SocialLinks";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-fg overflow-x-clip">
      {/* Viewport Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Dynamic Cosmic Nebula Gradient Art Background */}
      <CosmicBackground />

      <div className="relative z-10">
        <Header onOpenContact={() => setIsContactOpen(true)} />
        <main>
          <Hero onOpenContact={() => setIsContactOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <SocialLinks />
      </main>
        <Footer />
      </div>

      {/* Floating Action Buttons */}
      <BackToTopButton />
      <FloatingContactButton onClick={() => setIsContactOpen(true)} />

      {/* Glassmorphism Contact Modal with animated send */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

