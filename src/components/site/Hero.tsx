import { profile } from "@/data/portfolio";
import { ArrowUpRight, MessageSquare, PhoneCall } from "lucide-react";

interface HeroProps {
  onOpenContact?: () => void;
}

export function Hero({ onOpenContact }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-16 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.3fr_0.7fr]">
        <div className="anim-rise">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-good tracking-wider uppercase">
            <span>Fayoum University</span>
            <span aria-hidden="true">·</span>
            <span>FCAI</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">2022–2026</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl text-balance">
            {profile.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-accent">{profile.role}</p>
          <p className="mt-3 max-w-xl text-muted text-base leading-relaxed">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg no-underline transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View work</span>
              <ArrowUpRight size={16} />
            </a>
            {onOpenContact ? (
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface/50 px-5 text-sm font-semibold text-fg transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
              >
                <MessageSquare size={16} />
                <span>Quick note</span>
              </button>
            ) : null}
            <a
              href={`mailto:${profile.email}?subject=Call%20request%20with%20${encodeURIComponent(profile.short)}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-fg no-underline transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
            >
              <PhoneCall size={15} />
              <span>Book a call</span>
            </a>
          </div>
        </div>
        <Visual />
      </div>
    </section>
  );
}

function Visual() {
  return (
    <div className="anim-float relative mx-auto h-72 w-full max-w-sm" aria-hidden>
      {/* Concentric ambient technical rings */}
      <div className="absolute inset-4 rounded-full border border-line/60 transition-transform duration-700 hover:scale-105" />
      <div className="absolute inset-10 rounded-full border border-accent/30" />
      <div className="absolute inset-20 rounded-full border border-line/40 border-dashed" />

      {/* Floating System Badges */}
      <div className="glass card-hover absolute left-2 top-6 rounded-lg px-3.5 py-2 font-mono text-xs text-muted shadow-lg">
        retrieve(top_k=4)
      </div>

      <div className="glass card-hover absolute right-2 top-20 rounded-lg px-3.5 py-2 font-mono text-xs text-fg shadow-lg">
        groq · llama-3.1
      </div>

      <div className="glass card-hover absolute bottom-6 left-6 rounded-lg px-3.5 py-2 font-mono text-xs text-good shadow-lg flex items-center gap-2.5">
        <span className="flex items-center gap-0.5 h-4">
          <span className="w-1 bg-good rounded-full animate-pulse h-3" />
          <span className="w-1 bg-good rounded-full animate-pulse h-4 delay-100" />
          <span className="w-1 bg-good rounded-full animate-pulse h-2 delay-200" />
          <span className="w-1 bg-good rounded-full animate-pulse h-5 delay-300" />
        </span>
        <span>whisper · wav2vec2</span>
      </div>
    </div>
  );
}

