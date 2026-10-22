import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function updateScrollProgress() {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll =
        window.scrollY || document.documentElement.scrollTop;
      const progress = Math.min(
        100,
        Math.max(0, (currentScroll / scrollHeight) * 100)
      );
      setScrollProgress(progress);
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Scroll depth progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] sm:h-[3px] pointer-events-none select-none print:hidden bg-line/20"
    >
      <div
        className="h-full w-full transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: "0% 50%",
          background:
            "linear-gradient(90deg, #c47a3a 0%, #f59e0b 35%, #8ea58a 70%, #6366f1 100%)",
          boxShadow:
            scrollProgress > 0.5
              ? "0 0 10px rgba(245, 158, 11, 0.65), 0 0 4px rgba(196, 122, 58, 0.85)"
              : "none",
        }}
      />
    </div>
  );
}
