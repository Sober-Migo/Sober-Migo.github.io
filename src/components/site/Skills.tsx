import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="border-t border-line px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight">Stack</h2>
        <p className="mt-2 max-w-xl text-muted">
          Tools that appear in the repositories — not a wishlist.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="card-hover rounded-xl border border-line bg-surface p-6">
              <h3 className="text-sm font-semibold tracking-wide text-accent">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line/80 bg-bg/60 px-3 py-1 font-mono text-xs text-fg/90 transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
