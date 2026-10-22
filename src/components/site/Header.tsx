import { profile } from "@/data/portfolio";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Work", "#work"],
  ["Path", "#path"],
  ["Contact", "#contact"],
] as const;

interface HeaderProps {
  onOpenContact?: () => void;
}

export function Header({ onOpenContact }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-wider text-fg no-underline hover:text-accent transition-colors"
        >
          {profile.short}
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                if (label === "Contact" && onOpenContact) {
                  e.preventDefault();
                  onOpenContact();
                }
              }}
              className="text-sm font-medium text-muted no-underline hover:text-fg transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {onOpenContact && (
            <button
              type="button"
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent hover:bg-accent hover:text-accent-fg transition-all duration-200"
            >
              <span>Say hello</span>
            </button>
          )}
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-fg md:hidden hover:border-accent transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="flex flex-col border-t border-line px-4 py-2 md:hidden bg-bg/95 backdrop-blur-xl">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="py-3 text-fg no-underline font-medium hover:text-accent transition-colors"
              onClick={(e) => {
                setOpen(false);
                if (label === "Contact" && onOpenContact) {
                  e.preventDefault();
                  onOpenContact();
                }
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

