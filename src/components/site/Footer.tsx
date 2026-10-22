import { profile } from "@/data/portfolio";

const socials = [
  ["GitHub", profile.github],
  ["LinkedIn", profile.linkedin],
  ["X", profile.x],
  ["Email", `mailto:${profile.email}`],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">© 2026 {profile.name}</p>
        <ul className="flex flex-wrap gap-4 text-sm font-medium">
          {socials.map(([label, href]) => (
            <li key={label}>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
