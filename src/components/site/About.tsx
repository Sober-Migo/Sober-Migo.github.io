import { milestones, profile } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="border-t border-line px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-4 text-muted">
            I study computers and artificial intelligence at Fayoum University and build systems that
            stay honest about their evidence: speech pipelines for Egyptian Arabic, retrieval-augmented
            generation, and APIs that fit the GPUs they run on.
          </p>
          <p className="mt-3 text-muted">
            Training path: machine learning and deep learning, then NLP, then IBM's generative AI
            specialization. The applied work —{" "}
            <a href={profile.github} className="text-fg underline">
              GitHub
            </a>{" "}
            and a live RAG space — is what I put in front of people.
          </p>
        </div>
        <ul className="grid gap-3.5 sm:grid-cols-2">
          {milestones.map((item) => (
            <li key={item.title} className="glass card-hover rounded-xl p-5 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-accent font-medium">{item.year}</p>
                <h3 className="mt-2 text-base font-semibold text-fg">{item.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
