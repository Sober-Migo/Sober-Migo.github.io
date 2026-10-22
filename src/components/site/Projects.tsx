import { ProjectDetailModal } from "@/components/site/ProjectDetailModal";
import { ProjectSkillChart } from "@/components/site/ProjectSkillChart";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  projectRoles,
  projects,
  techStackTooltips,
  type Project,
  type ProjectTab,
} from "@/data/portfolio";
import {
  ArrowUpRight,
  BookOpen,
  Brain,
  Clock,
  Code2,
  ExternalLink,
  Filter,
  GitFork,
  Layers,
  RotateCcw,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

const projectTabs = ["All", "AI/ML Projects", "Research", "Tools"] as const;
type TabType = (typeof projectTabs)[number];

const techFilterList = [
  "All Tech",
  "AI/ML",
  "Python",
  "Speech",
  "Web",
  "LLM/RAG",
] as const;
type TechFilter = (typeof techFilterList)[number];

const tabDescriptions: Record<TabType, string> = {
  All: "All public repositories, research tracks, and interactive demos.",
  "AI/ML Projects": "Speech analytics, neural pipelines, and applied machine learning models.",
  Research: "Empirical speech studies, LoRA alignment labs, and NLP specialization tracks.",
  Tools: "Interactive document retrieval spaces, OCR pipelines, and developer catalogs.",
};

const tabIcons: Record<TabType, typeof Sparkles> = {
  All: Sparkles,
  "AI/ML Projects": Brain,
  Research: BookOpen,
  Tools: Wrench,
};

export function Projects() {
  const [activeTab, setActiveTab] = useState<TabType>("AI/ML Projects");
  const [selectedTech, setSelectedTech] = useState<TechFilter>("All Tech");
  const [selectedDetailProject, setSelectedDetailProject] = useState<Project | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [isGridHovered, setIsGridHovered] = useState(false);

  const visible = useMemo(() => {
    if (activeTab === "All") return projects;
    return projects.filter((p) => p.tabs.includes(activeTab as ProjectTab));
  }, [activeTab]);

  const activeVisibleCount = useMemo(() => {
    return visible.filter(
      (p) => selectedTech === "All Tech" || p.technologies.includes(selectedTech)
    ).length;
  }, [visible, selectedTech]);

  const counts = useMemo(() => {
    const map: Record<TabType, number> = {
      All: projects.length,
      "AI/ML Projects": 0,
      Research: 0,
      Tools: 0,
    };
    for (const p of projects) {
      for (const t of p.tabs) {
        if (t in map) map[t as TabType] += 1;
      }
    }
    return map;
  }, []);

  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridContainerRef.current) return;
    const rect = gridContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gridContainerRef.current.style.setProperty("--grid-mouse-x", `${x}px`);
    gridContainerRef.current.style.setProperty("--grid-mouse-y", `${y}px`);
  };

  const handleGridMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsGridHovered(true);
    handleGridMouseMove(e);
  };

  const handleGridMouseLeave = () => {
    setIsGridHovered(false);
  };

  return (
    <section id="work" className="border-t border-line px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
              Featured work
            </h2>
            <p className="mt-2 text-muted text-sm sm:text-base leading-relaxed">
              Production systems, speech analytics, and research implementations.
            </p>
          </div>
          <span className="font-mono text-xs text-muted">
            Showing {activeVisibleCount} of {projects.length} repositories
          </span>
        </div>

        {/* Tabbed Filtering Interface with Glass-morphism Style */}
        <div className="mt-8 flex flex-col gap-3">
          <div
            className="flex flex-wrap gap-2.5 p-2 rounded-2xl glass w-fit max-w-full items-center shadow-md"
            role="tablist"
            aria-label="Project section tabs"
          >
            {projectTabs.map((tab) => {
              const active = activeTab === tab;
              const Icon = tabIcons[tab];
              const count = counts[tab] ?? 0;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab)}
                  className={`glass relative inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border-accent/70 bg-accent/20 text-accent shadow-lg shadow-accent/15 scale-[1.02]"
                      : "text-muted hover:text-fg hover:border-line hover:bg-surface/50"
                  }`}
                >
                  <Icon
                    size={15}
                    className={`transition-colors ${active ? "text-accent" : "text-muted"}`}
                  />
                  <span>{tab}</span>
                  <span
                    className={`font-mono text-[11px] tabular-nums px-2 py-0.5 rounded-md transition-colors ${
                      active
                        ? "bg-accent/25 text-accent font-bold"
                        : "bg-bg/60 text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted font-mono italic pl-1">
            {tabDescriptions[activeTab]}
          </p>
        </div>

        {/* Technology Filter System at Top of Project List */}
        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl glass px-4 py-2.5 border border-line/80 w-fit max-w-full">
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted mr-1.5">
            <Filter size={13} className="text-accent" />
            <span>Technology:</span>
          </div>
          {techFilterList.map((tech) => {
            const active = selectedTech === tech;
            return (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedTech(tech)}
                className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-mono transition-all duration-200 ${
                  active
                    ? "bg-accent text-accent-fg font-semibold shadow-sm shadow-accent/25"
                    : "text-muted hover:text-fg hover:bg-surface"
                }`}
              >
                <span>{tech}</span>
              </button>
            );
          })}
          {selectedTech !== "All Tech" && (
            <button
              type="button"
              onClick={() => setSelectedTech("All Tech")}
              className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:underline ml-2 transition-colors"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Project Grid Container with Mouse-Following Spotlight */}
        <div
          ref={gridContainerRef}
          onMouseMove={handleGridMouseMove}
          onMouseEnter={handleGridMouseEnter}
          onMouseLeave={handleGridMouseLeave}
          className="relative mt-8"
        >
          {/* Ambient Background Radial Glow following cursor across the grid */}
          <div
            className="grid-spotlight pointer-events-none absolute -inset-8 rounded-3xl transition-opacity duration-300 ease-out z-0 print:hidden"
            style={{
              opacity: isGridHovered ? 1 : 0,
            }}
            aria-hidden="true"
          />

          {/* Cards Grid with CSS class-based visibility toggling */}
          <div className="relative z-10 grid gap-5 md:grid-cols-2">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={Boolean(project.featured && index < 2)}
                selectedTech={selectedTech}
                onSelectDetails={(p) => setSelectedDetailProject(p)}
              />
            ))}

            {/* Zero State if filtered out */}
            {activeVisibleCount === 0 && (
              <div className="col-span-full py-12 text-center glass rounded-2xl p-8">
                <p className="text-sm text-muted">
                  No repositories in this category match the technology &ldquo;{selectedTech}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedTech("All Tech")}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-xs font-semibold text-accent-fg hover:bg-accent/90 transition-colors"
                >
                  <RotateCcw size={12} />
                  <span>Show all technologies</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Project Details Modal using glass-modal */}
      <ProjectDetailModal
        project={selectedDetailProject}
        onClose={() => setSelectedDetailProject(null)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  featured,
  selectedTech,
  onSelectDetails,
}: {
  project: Project;
  featured: boolean;
  selectedTech: TechFilter;
  onSelectDetails: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const updateCardMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    updateCardMouse(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setIsCardHovered(true);
    updateCardMouse(e);
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
  };

  // Toggle card visibility using CSS classes based on technology match
  const isMatch =
    selectedTech === "All Tech" || project.technologies.includes(selectedTech);

  const visibilityClass = isMatch
    ? "block opacity-100 scale-100 translate-y-0"
    : "hidden opacity-0 scale-95 pointer-events-none";

  return (
    <article
      ref={cardRef}
      data-technologies={project.technologies.join(" ")}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`project-card-tactile project-card-glow group relative flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface/90 p-6 transition-all duration-300 ${
        featured ? "md:min-h-72" : ""
      } ${visibilityClass}`}
    >
      {/* Dynamic Cursor Spotlight on Card Surface */}
      <div
        className="project-glow-surface pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 print:hidden"
        style={{
          opacity: isCardHovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Dynamic Cursor Spotlight on Card Border Contours */}
      <div
        className="project-glow-border pointer-events-none absolute -inset-px rounded-xl border transition-opacity duration-300 print:hidden"
        style={{
          opacity: isCardHovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Category with Role Tooltip */}
          <div className="flex items-center gap-2">
            <Tooltip
              content={projectRoles[project.id] ?? "Role: AI/ML Engineer"}
              position="bottom"
            >
              <span className="font-mono text-xs font-medium text-good cursor-help border-b border-dotted border-good/50">
                {project.category}
              </span>
            </Tooltip>

            {project.featured && (
              <span className="font-mono text-[10px] text-accent tracking-wider uppercase font-semibold">
                Featured
              </span>
            )}
          </div>

          {/* Mini-stat counters in glassmorphic badges */}
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Tooltip content={`${project.stats.stars} GitHub stars`} position="top">
              <div className="glass flex items-center gap-1 rounded-md px-2 py-0.5 text-fg/80 hover:text-accent hover:border-accent transition-colors cursor-help">
                <Star size={11} className="text-accent fill-accent/40" />
                <span className="tabular-nums font-semibold">{project.stats.stars}</span>
              </div>
            </Tooltip>

            <Tooltip content={`${project.stats.forks} repository forks`} position="top">
              <div className="glass flex items-center gap-1 rounded-md px-2 py-0.5 text-fg/80 hover:text-accent hover:border-accent transition-colors cursor-help">
                <GitFork size={11} className="text-muted" />
                <span className="tabular-nums font-semibold">{project.stats.forks}</span>
              </div>
            </Tooltip>

            <Tooltip content={`Last repository update: ${project.stats.updated}`} position="top">
              <div className="glass hidden sm:flex items-center gap-1 rounded-md px-2 py-0.5 text-muted hover:text-fg transition-colors cursor-help">
                <Clock size={11} className="text-muted" />
                <span className="tabular-nums text-[10px]">{project.stats.updated}</span>
              </div>
            </Tooltip>
          </div>
        </div>

        <h3 className="mt-3 text-xl font-semibold text-fg tracking-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-2.5 text-sm text-muted leading-relaxed">
          {project.description}
        </p>

        {/* D3 Animated Skill Proficiency Distribution Chart */}
        {project.skillDistribution && project.skillDistribution.length > 0 && (
          <ProjectSkillChart
            data={project.skillDistribution}
            projectId={project.id}
          />
        )}

        {/* Tech Tags with Interactive Tooltips */}
        <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-muted font-mono">
          {project.tags.map((tag, i) => (
            <span key={tag} className="inline-flex items-center gap-1.5">
              <Tooltip
                content={techStackTooltips[tag] ?? `${tag} technology`}
                position="top"
              >
                <span className="cursor-help text-fg/80 hover:text-accent transition-colors border-b border-dashed border-line/60 hover:border-accent">
                  {tag}
                </span>
              </Tooltip>
              {i < project.tags.length - 1 && (
                <span className="text-line ml-1" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links & View Details */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-4 text-sm font-semibold">
        <button
          type="button"
          onClick={() => onSelectDetails(project)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface/80 px-3 py-1.5 text-xs font-semibold text-fg/90 hover:border-accent hover:text-accent hover:bg-surface transition-colors cursor-pointer"
        >
          <Layers size={13} className="text-accent" />
          <span>View details</span>
        </button>

        <div className="flex items-center gap-3.5">
          {project.live ? (
            <Tooltip content="Launch interactive demo on Hugging Face" position="top">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-accent hover:underline no-underline"
              >
                <span>Live demo</span>
                <ExternalLink size={13} />
              </a>
            </Tooltip>
          ) : null}
          <Tooltip content="Inspect open-source repository on GitHub" position="top">
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-fg/90 hover:text-fg hover:underline no-underline"
            >
              <Code2 size={14} />
              <span>Code</span>
              <ArrowUpRight size={13} className="text-muted" />
            </a>
          </Tooltip>
        </div>
      </div>
    </article>
  );
}
