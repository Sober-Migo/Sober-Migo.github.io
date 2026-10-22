import { principles } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="path" className="border-t border-line px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight">How the work is built</h2>
        <p className="mt-2 max-w-2xl text-muted">
          No invented client quotes. These are the constraints I actually use.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {principles.map((item, idx) => (
            <article
              key={item.title}
              className="card-hover rounded-xl border border-line bg-surface p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-accent font-semibold">
                  0{idx + 1}.
                </span>
                <h3 className="mt-2 text-lg font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
