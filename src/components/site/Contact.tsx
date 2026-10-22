import { profile } from "@/data/portfolio";
import { Check, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", message: "" };

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function validate(next: Fields): Errors {
    const out: Errors = {};
    if (next.name.trim().length < 2) out.name = "Name needs at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim())) out.email = "Enter a valid email.";
    if (next.message.trim().length < 12) out.message = "Add a short note (12+ characters).";
    return out;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 750));

    const subject = encodeURIComponent(`Portfolio note from ${fields.name.trim()}`);
    const body = encodeURIComponent(
      `${fields.message.trim()}\n\n— ${fields.name.trim()} <${fields.email.trim()}>`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setStatus("sent");
  }

  return (
    <section id="contact" className="border-t border-line px-4 py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed">
            Internships and junior AI, speech, or backend roles. The form opens your mail client with
            the note filled in — nothing is stored on a server.
          </p>
          <a
            href={`mailto:${profile.email}?subject=Call%20request%20with%20${encodeURIComponent(profile.short)}`}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg no-underline transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Book a call
          </a>
          <div className="mt-6 space-y-1">
            <p className="font-mono text-sm text-muted">{profile.email}</p>
            <p className="font-mono text-sm text-muted">{profile.phone}</p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="glass rounded-xl p-6 sm:p-7">
          <Field
            label="Name"
            value={fields.name}
            error={errors.name}
            onChange={(name) => setFields((f) => ({ ...f, name }))}
          />
          <Field
            label="Email"
            type="email"
            value={fields.email}
            error={errors.email}
            onChange={(email) => setFields((f) => ({ ...f, email }))}
          />
          <label className="mt-4 block text-sm font-medium">
            Message
            <textarea
              value={fields.message}
              onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
              rows={5}
              className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40 resize-none"
            />
          </label>
          {errors.message ? <p className="mt-1 text-xs text-accent">{errors.message}</p> : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className={`mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              status === "sent"
                ? "bg-good text-accent-fg"
                : status === "sending"
                ? "bg-accent/80 text-accent-fg cursor-wait"
                : "bg-fg text-bg hover:bg-fg/90 active:scale-[0.99]"
            }`}
          >
            {status === "idle" && (
              <>
                <span>Send note</span>
                <Send size={15} />
              </>
            )}
            {status === "sending" && (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Preparing note...</span>
              </>
            )}
            {status === "sent" && (
              <>
                <Check size={16} className="stroke-[3]" />
                <span>Mail draft prepared!</span>
              </>
            )}
          </button>

          {status === "sent" ? (
            <p className="mt-3 text-xs text-good" role="status">
              Mail draft opened. If nothing appeared, email {profile.email} directly.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  error,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="mt-4 block text-sm font-medium first:mt-0">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-fg outline-none focus:border-accent"
      />
      {error ? <span className="mt-1 block font-normal text-accent">{error}</span> : null}
    </label>
  );
}
