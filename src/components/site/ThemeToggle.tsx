import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "portfolio-theme";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const next = saved === "light";
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    localStorage.setItem(KEY, next ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="grid size-11 place-items-center rounded-full border border-line text-fg hover:border-accent"
    >
      {light ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
