import { profile } from "@/data/portfolio";
import { Check, Loader2, Mail, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type SendStatus = "idle" | "sending" | "sent" | "error";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [fields, setFields] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SendStatus>("idle");
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Autofocus first input field on opening
      setTimeout(() => nameInputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset form status when modal re-opens
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function validate(data: FormState): Errors {
    const errs: Errors = {};
    if (data.name.trim().length < 2) {
      errs.name = "Please enter your name (at least 2 characters).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (data.message.trim().length < 10) {
      errs.message = "Please write a brief note (at least 10 characters).";
    }
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;

    const validationErrors = validate(fields);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");

    // Smooth send state animation
    await new Promise((resolve) => setTimeout(resolve, 850));

    // Construct mailto draft
    const subject = encodeURIComponent(`Portfolio inquiry from ${fields.name.trim()}`);
    const body = encodeURIComponent(
      `${fields.message.trim()}\n\nFrom: ${fields.name.trim()}\nEmail: ${fields.email.trim()}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setStatus("sent");

    // Auto-close modal after user sees the success checkmark
    setTimeout(() => {
      onClose();
      setFields({ name: "", email: "", message: "" });
      setStatus("idle");
    }, 1800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md anim-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        ref={modalRef}
        className="glass-modal relative w-full max-w-lg rounded-2xl p-6 sm:p-8 anim-scale-in text-fg"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 grid size-9 place-items-center rounded-full border border-line text-muted hover:text-fg hover:border-accent transition-colors"
          aria-label="Close contact dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/25">
            <Mail size={20} />
          </div>
          <div>
            <h2 id="contact-modal-title" className="text-xl font-semibold tracking-tight">
              Get in touch
            </h2>
            <p className="text-xs text-muted">
              Send a note directly to {profile.short}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
              Your Name
            </label>
            <input
              ref={nameInputRef}
              type="text"
              placeholder="e.g. Sarah Connor"
              value={fields.name}
              disabled={status === "sending" || status === "sent"}
              onChange={(e) => setFields((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40 disabled:opacity-60"
            />
            {errors.name ? (
              <span className="mt-1 block text-xs text-accent">{errors.name}</span>
            ) : null}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={fields.email}
              disabled={status === "sending" || status === "sent"}
              onChange={(e) => setFields((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40 disabled:opacity-60"
            />
            {errors.email ? (
              <span className="mt-1 block text-xs text-accent">{errors.email}</span>
            ) : null}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Project details, collaboration inquiries, or interview requests..."
              value={fields.message}
              disabled={status === "sending" || status === "sent"}
              onChange={(e) => setFields((prev) => ({ ...prev, message: e.target.value }))}
              className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40 disabled:opacity-60 resize-none"
            />
            {errors.message ? (
              <span className="mt-1 block text-xs text-accent">{errors.message}</span>
            ) : null}
          </div>

          {/* Animated Send Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`group relative flex w-full items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold transition-all duration-300 ${
                status === "sent"
                  ? "bg-good text-accent-fg shadow-lg shadow-good/20"
                  : status === "sending"
                  ? "bg-accent/80 text-accent-fg cursor-wait"
                  : "bg-accent text-accent-fg hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]"
              }`}
            >
              {status === "idle" && (
                <>
                  <span>Send note</span>
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </>
              )}

              {status === "sending" && (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Preparing note...</span>
                </>
              )}

              {status === "sent" && (
                <>
                  <Check size={18} className="stroke-[3]" />
                  <span>Note sent successfully!</span>
                </>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-muted pt-1">
            Reaches {profile.email} · Opens your email client with draft
          </p>
        </form>
      </div>
    </div>
  );
}
