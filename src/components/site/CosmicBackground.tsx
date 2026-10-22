import { CosmicParticles } from "./CosmicParticles";

export function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden print:hidden select-none bg-[#07090e]"
    >
      {/* Base Space Linear Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090e] via-[#0b0f17] to-[#06080c] opacity-95" />

      {/* Nebula Layer 1 — Rich Violet / Amethyst Drift Orb */}
      <div
        className="anim-orb-1 absolute -top-24 -right-24 md:-top-36 md:-right-36 size-[550px] md:size-[850px] rounded-full blur-[90px] md:blur-[140px] opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.32) 0%, rgba(147, 51, 234, 0.2) 35%, rgba(99, 102, 241, 0.1) 60%, transparent 75%)",
        }}
      />

      {/* Nebula Layer 2 — Electric Indigo & Cobalt Glow */}
      <div
        className="anim-orb-2 absolute top-1/3 -left-28 md:-left-44 size-[500px] md:size-[800px] rounded-full blur-[95px] md:blur-[140px] opacity-85"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.26) 0%, rgba(79, 70, 229, 0.18) 38%, rgba(14, 165, 233, 0.08) 60%, transparent 75%)",
        }}
      />

      {/* Nebula Layer 3 — Warm Radiant Gold & Amber Flare */}
      <div
        className="anim-orb-3 absolute -bottom-24 right-1/4 size-[450px] md:size-[720px] rounded-full blur-[85px] md:blur-[130px] opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(196, 122, 58, 0.16) 36%, rgba(217, 119, 6, 0.06) 60%, transparent 75%)",
        }}
      />

      {/* Nebula Center Highlight — Magenta & Cosmic Dust */}
      <div
        className="anim-orb-1 absolute top-2/3 right-10 size-[350px] md:size-[550px] rounded-full blur-[75px] md:blur-[110px] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 70%)",
        }}
      />

      {/* Animated Drifting Cosmic Particle Constellation */}
      <CosmicParticles />

      {/* Fine Geometric Stardust Grid & Texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(rgba(243, 239, 230, 0.8) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient Vignette Framing */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, rgba(7, 9, 14, 0.65) 100%)",
        }}
      />
    </div>
  );
}
