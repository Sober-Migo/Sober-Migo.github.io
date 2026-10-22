import { MessageSquare } from "lucide-react";

interface FloatingContactButtonProps {
  onClick: () => void;
}

export function FloatingContactButton({ onClick }: FloatingContactButtonProps) {
  return (
    <aside
      aria-label="Floating quick contact"
      className="fixed bottom-6 right-6 z-40 print:hidden"
    >
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        className="group relative flex items-center gap-2.5 rounded-full border border-accent/40 bg-surface/90 px-5 py-3 text-sm font-semibold text-fg shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-accent hover:bg-surface hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 active:scale-95"
      >
        <span
          className="anim-pulse-glow absolute inset-0 rounded-full pointer-events-none"
          aria-hidden="true"
        />
        <div className="grid size-7 place-items-center rounded-full bg-accent text-accent-fg transition-transform duration-300 group-hover:rotate-12">
          <MessageSquare size={14} className="stroke-[2.5]" />
        </div>
        <span className="tracking-wide text-xs sm:text-sm font-medium">Contact</span>
      </button>
    </aside>
  );
}
