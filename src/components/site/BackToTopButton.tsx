import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 320) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <aside aria-label="Back to top navigation" className="print:hidden">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Scroll to top"
        className={`fixed bottom-22 right-6 z-40 grid size-11 place-items-center rounded-full glass border border-line/80 text-muted shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-accent hover:text-accent hover:bg-surface hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 active:scale-95 ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ArrowUp size={18} className="stroke-[2.5] transition-transform duration-200 hover:-translate-y-0.5" />
      </button>
    </aside>
  );
}
