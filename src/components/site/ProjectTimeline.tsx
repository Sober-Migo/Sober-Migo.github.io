import type { ProjectMilestone } from "@/data/portfolio";
import { CheckCircle2, CircleDot, Milestone } from "lucide-react";

interface ProjectTimelineProps {
  milestones: ProjectMilestone[];
  completionStatus: string;
}

export function ProjectTimeline({
  milestones,
  completionStatus,
}: ProjectTimelineProps) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="glass rounded-xl p-4 sm:p-5 border border-line/80 my-3">
      {/* Header with Title and Current Completion Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Milestone size={14} className="text-accent" />
          <span className="font-mono text-xs uppercase tracking-wider text-fg font-semibold">
            Development Milestones
          </span>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-good/15 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-good border border-good/30">
          <span className="size-1.5 rounded-full bg-good animate-pulse" />
          <span>{completionStatus}</span>
        </div>
      </div>

      {/* Horizontal Timeline Track */}
      <div className="relative overflow-x-auto pb-2 pt-1 -mx-1 px-1">
        <div className="relative flex items-start justify-between min-w-[460px] sm:min-w-0">
          {/* Connecting Track Line */}
          <div
            className="absolute top-3.5 left-4 right-4 h-0.5 bg-line/80 z-0"
            aria-hidden="true"
          />
          <div
            className="absolute top-3.5 left-4 right-4 h-0.5 bg-gradient-to-r from-accent via-accent/70 to-good opacity-80 z-0"
            aria-hidden="true"
          />

          {milestones.map((m, index) => {
            const isLast = index === milestones.length - 1;
            const isCompleted = m.status === "completed";

            return (
              <div
                key={m.title}
                className="relative z-10 flex flex-col items-center text-center px-2 flex-1 min-w-[130px] group/node"
              >
                {/* Node Icon Indicator */}
                <div
                  className={`grid size-7 place-items-center rounded-full border bg-surface transition-transform duration-200 group-hover/node:scale-110 ${
                    isLast
                      ? "border-good text-good shadow-sm shadow-good/20"
                      : isCompleted
                      ? "border-accent text-accent shadow-sm shadow-accent/20"
                      : "border-line text-muted"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={15} className="stroke-[2.5]" />
                  ) : (
                    <CircleDot size={14} className="text-accent animate-pulse" />
                  )}
                </div>

                {/* Milestone Details */}
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-accent/90 mt-2.5">
                  {m.date}
                </span>

                <h4 className="text-xs font-semibold text-fg tracking-tight mt-1 line-clamp-1">
                  {m.title}
                </h4>

                <p className="text-[11px] text-muted leading-tight mt-1 max-w-[160px] line-clamp-2">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
