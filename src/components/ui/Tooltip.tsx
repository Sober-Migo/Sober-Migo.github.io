import { useState, type ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom";
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className={`group/tooltip relative inline-flex ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <span
        role="tooltip"
        aria-hidden={!isVisible}
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-40 whitespace-nowrap transition-all duration-200 ease-out print:hidden ${
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        } ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : position === "top"
            ? "opacity-0 translate-y-1.5 scale-95"
            : "opacity-0 -translate-y-1.5 scale-95"
        }`}
      >
        <span className="glass relative block rounded-lg px-2.5 py-1 text-[11px] font-mono text-fg shadow-xl backdrop-blur-md border border-line/90">
          {content}
          {/* Subtle pointer tip */}
          <span
            className={`absolute left-1/2 -translate-x-1/2 size-1.5 rotate-45 border-line/90 bg-surface ${
              position === "top"
                ? "-bottom-1 border-b border-r"
                : "-top-1 border-t border-l"
            }`}
            aria-hidden="true"
          />
        </span>
      </span>
    </span>
  );
}
