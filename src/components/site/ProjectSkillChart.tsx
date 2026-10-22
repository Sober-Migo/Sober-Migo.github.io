import type { SkillSegment } from "@/data/portfolio";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

interface ProjectSkillChartProps {
  data: SkillSegment[];
  projectId: string;
}

export function ProjectSkillChart({ data, projectId }: ProjectSkillChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeSkill, setActiveSkill] = useState<SkillSegment | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return;

    const width = 56;
    const height = 56;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.62;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3
      .pie<SkillSegment>()
      .value((d) => d.percentage)
      .sort(null)
      .padAngle(0.06);

    const arc = d3
      .arc<d3.PieArcDatum<SkillSegment>>()
      .innerRadius(innerRadius)
      .outerRadius(radius - 2)
      .cornerRadius(2);

    const arcHover = d3
      .arc<d3.PieArcDatum<SkillSegment>>()
      .innerRadius(innerRadius - 1)
      .outerRadius(radius)
      .cornerRadius(3);

    const defaultColors = ["#c47a3a", "#6366f1", "#38bdf8", "#8ea58a"];

    const paths = g
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("fill", (d, i) => d.data.color || defaultColors[i % defaultColors.length])
      .attr("stroke", "rgba(7, 9, 14, 0.5)")
      .attr("stroke-width", "1.5px")
      .style("cursor", "pointer")
      .on("mouseenter", function (_event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("d", arcHover as unknown as string)
          .attr("opacity", 1);
        setActiveSkill(d.data);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("d", arc as unknown as string);
        setActiveSkill(null);
      });

    // Check for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      paths.attr("d", arc as unknown as string);
    } else {
      // Smooth D3 animated arc entrance
      paths
        .transition()
        .duration(850)
        .ease(d3.easeCubicOut)
        .attrTween("d", function (d) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function (t) {
            return arc(interpolate(t)) || "";
          };
        });
    }
  }, [data, projectId]);

  const displaySkill = activeSkill || data[0];

  return (
    <div className="glass rounded-xl p-3 my-3.5 border border-line/75 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-medium">
          Technology Contribution
        </span>
        <span className="font-mono text-[11px] text-accent font-semibold tabular-nums">
          {displaySkill ? `${displaySkill.skill} · ${displaySkill.percentage}%` : ""}
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        {/* D3 SVG Donut Visualization */}
        <div className="relative shrink-0 size-14 grid place-items-center">
          <svg
            ref={svgRef}
            className="overflow-visible"
            aria-label={`Skill distribution chart for project ${projectId}`}
          />
          <div className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[10px] font-bold text-fg tabular-nums">
            {displaySkill ? `${displaySkill.percentage}%` : ""}
          </div>
        </div>

        {/* Legend & Proficiency Distribution */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          {data.map((item) => {
            const isHovered = activeSkill?.skill === item.skill;
            return (
              <div
                key={item.skill}
                onMouseEnter={() => setActiveSkill(item)}
                onMouseLeave={() => setActiveSkill(null)}
                className={`flex items-center justify-between gap-2 text-xs font-mono transition-all duration-150 cursor-pointer ${
                  activeSkill && !isHovered
                    ? "opacity-40"
                    : isHovered
                    ? "opacity-100 font-semibold"
                    : "opacity-85"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="size-2 rounded-full shrink-0 transition-transform duration-150"
                    style={{
                      backgroundColor: item.color || "#c47a3a",
                      transform: isHovered ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                  <span className="truncate text-fg/90 text-[11px]">
                    {item.skill}
                  </span>
                </div>
                <span className="tabular-nums text-muted text-[11px] shrink-0">
                  {item.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
