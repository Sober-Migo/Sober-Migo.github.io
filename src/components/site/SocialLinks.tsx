import { Tooltip } from "@/components/ui/Tooltip";
import { profile } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export function SocialLinks() {
  const socials = [
    {
      name: "GitHub",
      handle: "@Sober-Migo",
      description: "Speech systems, RAG spaces & AI codebases",
      href: profile.github,
      tooltip: "Explore 20+ public repositories, speech systems & commits",
      icon: (
        <svg
          className="size-5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      handle: "/in/ahmed-magdy",
      description: "Professional background, milestones & credentials",
      href: profile.linkedin,
      tooltip: "Connect professionally and review university & lab milestones",
      icon: (
        <svg
          className="size-5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.96 0 1.74-.78 1.74-1.74a1.74 1.74 0 0 0-3.48 0c0 .96.78 1.74 1.74 1.74m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      handle: "@Sober_Migo",
      description: "AI engineering insights, ML models & updates",
      href: profile.x,
      tooltip: "Follow for technical notes, speech AI thoughts & paper summaries",
      icon: (
        <svg
          className="size-5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="connect"
      aria-label="Social connections"
      className="border-t border-line px-4 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
              Connect & Follow
            </h2>
            <p className="mt-2 text-muted text-sm sm:text-base leading-relaxed">
              Find my open-source code, research milestones, and technical posts.
            </p>
          </div>
          <span className="font-mono text-xs text-muted">
            Direct public profiles
          </span>
        </div>

        {/* Glass-Morphism Social Cards Grid with Tooltips */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="glass-modal group relative flex flex-col justify-between rounded-2xl p-6 text-fg no-underline transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/80 hover:shadow-2xl hover:shadow-accent/20 active:scale-[0.98]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/25 transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/25">
                    {social.icon}
                  </div>
                  <Tooltip content={social.tooltip} position="bottom">
                    <div className="grid size-8 place-items-center rounded-full border border-line text-muted transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </Tooltip>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-fg tracking-tight group-hover:text-accent transition-colors">
                  {social.name}
                </h3>
                <p className="font-mono text-xs font-medium text-accent/90 mt-1">
                  {social.handle}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                  {social.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 pt-3 border-t border-line/60 text-xs font-semibold text-fg/80 group-hover:text-accent transition-colors">
                <span>Visit profile</span>
                <ArrowUpRight size={13} className="text-muted group-hover:text-accent" />
              </div>
            </a>
          ))}
        </div>

        {/* Secondary Hubs (Hugging Face & Kaggle) with Tooltips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-mono text-muted">
          <span>Additional developer hubs:</span>
          <Tooltip content="Launch interactive RAG and speech model spaces" position="top">
            <a
              href={profile.huggingFace}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-fg hover:border-accent hover:text-accent transition-colors no-underline"
            >
              <span>Hugging Face</span>
              <ArrowUpRight size={12} />
            </a>
          </Tooltip>

          <Tooltip content="Explore ML notebooks and competition submissions" position="top">
            <a
              href={profile.kaggle}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-fg hover:border-accent hover:text-accent transition-colors no-underline"
            >
              <span>Kaggle</span>
              <ArrowUpRight size={12} />
            </a>
          </Tooltip>
        </div>
      </div>
    </section>
  );
}
