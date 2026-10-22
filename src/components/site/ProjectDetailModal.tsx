import { ProjectSkillChart } from "@/components/site/ProjectSkillChart";
import { ProjectTimeline } from "@/components/site/ProjectTimeline";
import { Tooltip } from "@/components/ui/Tooltip";
import { techStackTooltips, type Project } from "@/data/portfolio";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  ExternalLink,
  GitFork,
  Layers,
  Star,
  X,
} from "lucide-react";
import { useEffect } from "react";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md anim-fade-in print:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-modal anim-scale-in relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 text-fg shadow-2xl border border-line/90 flex flex-col justify-between">
        <div>
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-good px-2.5 py-0.5 rounded-md bg-good/15 border border-good/25">
                {project.category}
              </span>
              {project.featured && (
                <span className="font-mono text-[11px] text-accent tracking-wider uppercase font-bold px-2 py-0.5 rounded-md bg-accent/15 border border-accent/30">
                  Featured Project
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="grid size-8 place-items-center rounded-full border border-line text-muted hover:border-accent hover:text-accent hover:bg-surface/60 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Project Title & Quick Stats */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-line/60 pb-4">
            <h2
              id="project-modal-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-fg"
            >
              {project.title}
            </h2>

            {/* Metric Badges */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="inline-flex items-center gap-1">
                <Star size={12} className="text-accent fill-accent/40" />
                <span className="tabular-nums font-semibold text-fg">
                  {project.stats.stars}
                </span>
              </span>
              <span className="text-line" aria-hidden="true">
                ·
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork size={12} className="text-muted" />
                <span className="tabular-nums font-semibold text-fg">
                  {project.stats.forks}
                </span>
              </span>
              <span className="text-line" aria-hidden="true">
                ·
              </span>
              <span className="inline-flex items-center gap-1 text-[11px]">
                <Clock size={11} className="text-muted" />
                <span>{project.stats.updated}</span>
              </span>
            </div>
          </div>

          {/* Deep-Dive Project Overview */}
          <div className="mt-5 space-y-4">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1.5">
                <Layers size={13} className="text-accent" />
                <span>Project Overview & Architecture</span>
              </h3>
              <p className="mt-2 text-sm text-fg/90 leading-relaxed font-sans">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Architecture Pipeline Flow */}
            {project.architecture && (
              <div className="rounded-xl border border-line/80 bg-surface/80 p-3.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1.5">
                  Pipeline Architecture
                </span>
                <p className="font-mono text-xs text-fg/90 leading-normal break-words">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Key Engineering Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1.5 mb-2.5">
                  <Cpu size={13} className="text-accent" />
                  <span>Key Technical Contributions</span>
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs sm:text-sm text-fg/85 leading-relaxed"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-good shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Horizontal Development Milestones & Status Timeline */}
            {project.milestones && project.milestones.length > 0 && (
              <ProjectTimeline
                milestones={project.milestones}
                completionStatus={project.completionStatus}
              />
            )}

            {/* D3 Skill Contribution Visualization */}
            {project.skillDistribution && (
              <div>
                <ProjectSkillChart
                  data={project.skillDistribution}
                  projectId={project.id}
                />
              </div>
            )}

            {/* Technology Stack List */}
            <div>
              <span className="font-mono text-[11px] text-muted uppercase tracking-wider font-semibold block mb-2">
                Verified Technologies
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <Tooltip
                    key={tag}
                    content={techStackTooltips[tag] ?? `${tag} library`}
                    position="top"
                  >
                    <span className="glass rounded-lg px-2.5 py-1 font-mono text-xs text-fg/90 border border-line/80 cursor-help hover:border-accent hover:text-accent transition-colors">
                      {tag}
                    </span>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-line px-4 py-2 text-xs sm:text-sm font-medium text-muted hover:text-fg hover:bg-surface/60 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-3">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs sm:text-sm font-semibold text-accent-fg hover:bg-accent/90 transition-colors no-underline shadow-md shadow-accent/20"
              >
                <span>Live demo</span>
                <ExternalLink size={14} />
              </a>
            ) : null}

            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface/90 px-4 py-2 text-xs sm:text-sm font-semibold text-fg hover:border-accent hover:text-accent transition-colors no-underline"
            >
              <Code2 size={15} />
              <span>Repository</span>
              <ArrowUpRight size={13} className="text-muted" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
